#!/usr/bin/env python3
"""Build ten optional, narrated siyer recap films from the approved lesson assets.

Usage: python scripts/ders-odasi/siyer-video.py
Requires: Python 3.10+, CairoSVG, ffmpeg, ffprobe and a Turkish-capable sans font.
No network calls, new narration, historical-person depictions or generated dialogue.
The existing four SVGs and four MP3s are the only visual/audio source material.
Captions are an accessible transcript; cue timing is estimated by word count.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import shutil
import struct
import subprocess
import sys
import tempfile
import textwrap
import wave
from pathlib import Path
from typing import Any

import cairosvg

ROOT = Path(__file__).resolve().parents[2]
AREA = ROOT / "ders-odasi" / "siyer"
CONTENT = AREA / "content-v2.json"
MANIFEST = AREA / "assets" / "video-manifest.json"
WIDTH, HEIGHT, FPS, AUDIO_RATE = 1280, 720, 24, 24000
MAX_BYTES = 99_000_000
PIPELINE_VERSION = "siyer-recap-v1"
TARGET_IDS = tuple(range(6, 61, 6))
QA_TARGETS = ((1, 1), (20, 2), (31, 4), (54, 4))


def run(args: list[str], *, timeout: int = 240) -> str:
    result = subprocess.run(args, check=True, capture_output=True, text=True, timeout=timeout)
    return result.stdout


def probe(path: Path) -> dict[str, Any]:
    return json.loads(run([
        "ffprobe", "-v", "error", "-show_format", "-show_streams",
        "-of", "json", str(path),
    ], timeout=30))


def duration(info: dict[str, Any]) -> float:
    raw = info.get("format", {}).get("duration")
    if raw is None:
        raw = next((s.get("duration") for s in info.get("streams", [])
                    if s.get("duration") is not None), None)
    value = float(raw or 0)
    if not math.isfinite(value) or value <= 0:
        raise ValueError("Media has no finite, positive duration")
    return value


def file_sha(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def web_path(path: Path) -> str:
    return "/" + path.relative_to(ROOT).as_posix()


def atomic_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(text, encoding="utf-8")
    temporary.replace(path)


def write_json(path: Path, data: Any) -> None:
    atomic_text(path, json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def require_file(path: Path) -> None:
    if not path.is_file() or path.stat().st_size == 0:
        raise FileNotFoundError("Missing or empty required asset: " + str(path.relative_to(ROOT)))


def render_svg(source: Path, target: Path) -> None:
    require_file(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    # The locally generated lesson SVGs contain no external resources.
    cairosvg.svg2png(
        bytestring=source.read_bytes(),
        write_to=str(target),
        output_width=WIDTH,
        output_height=HEIGHT,
        unsafe=False,
    )
    with target.open("rb") as handle:
        header = handle.read(24)
    if (len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n"
            or struct.unpack(">II", header[16:24]) != (WIDTH, HEIGHT)):
        raise ValueError("Invalid rendered PNG: " + str(target))


def caption_parts(text: str) -> list[str]:
    text = " ".join(text.split())
    # Keep the full respectful name together when choosing cue boundaries.
    tokens = re.findall(
        r"Peygamber Efendimiz \(sallallahü aleyhi ve sellem\)|\S+", text
    )
    parts: list[str] = []
    current: list[str] = []
    for token in tokens:
        candidate = " ".join(current + [token])
        if current and (len(candidate) > 110 or len(candidate.split()) > 18):
            parts.append(" ".join(current))
            current = [token]
        else:
            current.append(token)
    if current:
        parts.append(" ".join(current))
    if not parts:
        raise ValueError("Empty frame narration cannot produce subtitles")
    return parts


def make_cues(text: str, start: float, length: float) -> list[dict[str, Any]]:
    parts = caption_parts(text)
    weights = [max(1, len(part.split())) for part in parts]
    total = sum(weights)
    elapsed_weight = 0
    result = []
    for part, weight in zip(parts, weights):
        cue_start = start + length * elapsed_weight / total
        elapsed_weight += weight
        cue_end = start + length * elapsed_weight / total
        result.append({
            "bas": round(cue_start, 3),
            "son": round(cue_end, 3),
            "metin": part,
        })
    return result


def stamp(seconds: float) -> str:
    milliseconds = round(seconds * 1000)
    hours, milliseconds = divmod(milliseconds, 3_600_000)
    minutes, milliseconds = divmod(milliseconds, 60_000)
    seconds_int, milliseconds = divmod(milliseconds, 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds_int:02d}.{milliseconds:03d}"


def write_vtt(path: Path, cues: list[dict[str, Any]]) -> None:
    chunks = ["WEBVTT\n"]
    for index, cue in enumerate(cues, start=1):
        transcript = cue["metin"].replace("-->", "→")
        wrapped = "\n".join(textwrap.wrap(
            transcript, width=58, break_long_words=False, break_on_hyphens=False
        ))
        chunks.append(
            f"{index}\n{stamp(cue['bas'])} --> {stamp(cue['son'])}\n{wrapped}\n"
        )
    atomic_text(path, "\n".join(chunks))


def content_hash(lesson: dict[str, Any], svgs: list[Path], audios: list[Path]) -> str:
    digest = hashlib.sha256()
    digest.update(PIPELINE_VERSION.encode())
    digest.update(Path(__file__).read_bytes())
    digest.update(json.dumps({
        "id": lesson["id"],
        "title": lesson["title"],
        "frames": lesson["frames"],
        "width": WIDTH, "height": HEIGHT, "fps": FPS, "audioRate": AUDIO_RATE,
    }, ensure_ascii=False, sort_keys=True).encode("utf-8"))
    for path in svgs + audios:
        require_file(path)
        digest.update(path.relative_to(ROOT).as_posix().encode())
        digest.update(bytes.fromhex(file_sha(path)))
    return digest.hexdigest()


def verify_video(path: Path, expected_duration: float) -> dict[str, Any]:
    require_file(path)
    if path.stat().st_size >= MAX_BYTES:
        raise ValueError(f"Video exceeds the 99 MB publishing limit: {path}")
    info = probe(path)
    videos = [s for s in info["streams"] if s.get("codec_type") == "video"]
    audios = [s for s in info["streams"] if s.get("codec_type") == "audio"]
    if len(videos) != 1 or len(audios) != 1:
        raise ValueError("Expected one video stream and one audio stream")
    video = videos[0]
    if (video.get("codec_name") != "h264" or video.get("width") != WIDTH
            or video.get("height") != HEIGHT or video.get("pix_fmt") != "yuv420p"
            or audios[0].get("codec_name") != "aac"):
        raise ValueError("Unexpected output codecs, dimensions or pixel format")
    actual = duration(info)
    if abs(actual - expected_duration) > 0.25:
        raise ValueError(
            f"Output duration mismatch: expected {expected_duration:.3f}, got {actual:.3f}"
        )
    return {"duration": round(actual, 3), "bytes": path.stat().st_size}


def cached_ok(entry: dict[str, Any] | None, fingerprint: str, video: Path,
              subtitles: Path, vtt: Path) -> bool:
    if not entry or entry.get("inputHash") != fingerprint:
        return False
    if not all(path.is_file() and path.stat().st_size > 0 for path in (video, subtitles, vtt)):
        return False
    if file_sha(video) != entry.get("outputSha256"):
        return False
    if file_sha(subtitles) != entry.get("subtitlesSha256") or file_sha(vtt) != entry.get("vttSha256"):
        return False
    verify_video(video, float(entry["sourceDuration"]))
    return True


def build_video(lesson: dict[str, Any], old: dict[str, Any] | None,
                *, force: bool) -> dict[str, Any]:
    lesson_id = int(lesson["id"])
    slug = f"siyer-{lesson_id:02d}"
    folder = ROOT / "ders-odasi" / "dersler" / slug
    svgs = [folder / "slayt" / f"{i:02d}.svg" for i in range(1, 5)]
    audios = [folder / "ses" / f"s{i:02d}.mp3" for i in range(1, 5)]
    frames = lesson.get("frames", [])
    if len(frames) != 4 or any(not f.get("narration") for f in frames):
        raise ValueError(f"{slug} must have four narrated frames")
    output_dir = folder / "video"
    video = output_dir / "ozet.mp4"
    subtitles = output_dir / "ozet.altyazi.json"
    vtt = output_dir / "ozet.vtt"
    fingerprint = content_hash(lesson, svgs, audios)
    if not force and cached_ok(old, fingerprint, video, subtitles, vtt):
        print(f"UNCHANGED {slug}: {old['duration']:.3f}s", flush=True)
        return old
    output_dir.mkdir(parents=True, exist_ok=True)
    cues: list[dict[str, Any]] = []
    frame_meta: list[dict[str, Any]] = []
    source_duration = 0.0

    with tempfile.TemporaryDirectory(prefix=f"siyer-video-{lesson_id}-") as temporary:
        work = Path(temporary)
        wave_paths = []
        image_lines = ["ffconcat version 1.0"]
        for index, (svg, mp3, frame) in enumerate(zip(svgs, audios, frames), start=1):
            mp3_info = probe(mp3)
            if not any(s.get("codec_type") == "audio" for s in mp3_info["streams"]):
                raise ValueError("MP3 asset contains no audio stream")
            reported_mp3_duration = duration(mp3_info)
            png = work / f"frame-{index:02d}.png"
            pcm = work / f"narration-{index:02d}.wav"
            render_svg(svg, png)
            run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(mp3),
                "-vn", "-ar", str(AUDIO_RATE), "-ac", "1", "-c:a", "pcm_s16le", str(pcm),
            ])
            with wave.open(str(pcm), "rb") as handle:
                if handle.getnchannels() != 1 or handle.getsampwidth() != 2:
                    raise ValueError("Narration was not normalized to mono PCM16")
                frame_duration = handle.getnframes() / handle.getframerate()
            if not math.isfinite(frame_duration) or not 0 < frame_duration < 180:
                raise ValueError(f"Unexpected narration duration in {slug}, frame {index}")
            wave_paths.append(pcm)
            # Paths are generated internally under tempfile: never interpolate curriculum text here.
            image_lines.extend([
                f"file '{png.as_posix()}'",
                f"duration {frame_duration:.9f}",
            ])
            end = source_duration + frame_duration
            frame_meta.append({
                "index": index,
                "title": frame.get("title", f"Bölüm {index}"),
                "bas": round(source_duration, 3),
                "son": round(end, 3),
                "duration": round(frame_duration, 3),
                "sourceMp3Duration": round(reported_mp3_duration, 3),
                "image": web_path(svg),
                "audio": web_path(mp3),
            })
            cues.extend(make_cues(frame["narration"], source_duration, frame_duration))
            source_duration = end

        # concat needs the last image repeated to retain its complete specified duration.
        image_lines.append(f"file '{(work / 'frame-04.png').as_posix()}'")
        image_list = work / "images.ffconcat"
        image_list.write_text("\n".join(image_lines) + "\n", encoding="utf-8")
        combined_audio = work / "narration.wav"
        with wave.open(str(combined_audio), "wb") as destination:
            destination.setnchannels(1)
            destination.setsampwidth(2)
            destination.setframerate(AUDIO_RATE)
            for pcm in wave_paths:
                with wave.open(str(pcm), "rb") as source:
                    if source.getframerate() != AUDIO_RATE:
                        raise ValueError("Inconsistent audio sample rate")
                    while samples := source.readframes(AUDIO_RATE):
                        destination.writeframesraw(samples)

        pending_video = output_dir / "ozet.pending.mp4"
        try:
            run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-f", "concat", "-safe", "0", "-i", str(image_list),
                "-i", str(combined_audio), "-map", "0:v:0", "-map", "1:a:0",
                "-vf", f"fps={FPS},format=yuv420p",
                "-t", f"{source_duration:.9f}",
                "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage",
                "-crf", "24", "-c:a", "aac", "-b:a", "96k", "-ac", "1",
                "-movflags", "+faststart", str(pending_video),
            ], timeout=600)
            verified = verify_video(pending_video, source_duration)
            pending_video.replace(video)
        finally:
            pending_video.unlink(missing_ok=True)

    if not cues or any(c["son"] <= c["bas"] for c in cues):
        raise ValueError("Invalid subtitle intervals")
    for previous, current in zip(cues, cues[1:]):
        if current["bas"] < previous["son"] - 0.002:
            raise ValueError("Overlapping subtitle intervals")
    write_json(subtitles, cues)
    write_vtt(vtt, cues)
    entry = {
        "id": slug,
        "lessonId": lesson_id,
        "title": lesson["title"] + " — Anlatımlı tekrar",
        "src": web_path(video),
        "subtitles": web_path(subtitles),
        "vtt": web_path(vtt),
        "poster": web_path(svgs[0]),
        "duration": verified["duration"],
        "sourceDuration": round(source_duration, 6),
        "bytes": verified["bytes"],
        "width": WIDTH, "height": HEIGHT, "fps": FPS,
        "frames": frame_meta,
        "cues": cues,
        "duraklar": [],
        "optional": True,
        "captionTiming": "estimated-by-word-count",
        "inputHash": fingerprint,
        "outputSha256": file_sha(video),
        "subtitlesSha256": file_sha(subtitles),
        "vttSha256": file_sha(vtt),
    }
    print(f"BUILT {slug}: {entry['duration']:.3f}s, {entry['bytes']} bytes", flush=True)
    return entry


def build_qa() -> list[dict[str, Any]]:
    directory = AREA / "qa"
    directory.mkdir(parents=True, exist_ok=True)
    result = []
    for lesson_id, frame in QA_TARGETS:
        svg = ROOT / "ders-odasi" / "dersler" / f"siyer-{lesson_id:02d}" / "slayt" / f"{frame:02d}.svg"
        require_file(svg)
        png = directory / f"siyer-{lesson_id:02d}-{frame:02d}.png"
        sidecar = png.with_suffix(".sha256")
        fingerprint = hashlib.sha256(
            svg.read_bytes() + Path(__file__).read_bytes()
            + f"{WIDTH}x{HEIGHT}".encode()
        ).hexdigest()
        unchanged = (png.is_file() and png.stat().st_size > 24 and sidecar.is_file()
                     and sidecar.read_text(encoding="utf-8").split()
                     == [fingerprint, file_sha(png)])
        if not unchanged:
            render_svg(svg, png)
            atomic_text(sidecar, fingerprint + " " + file_sha(png) + "\n")
        result.append({
            "lessonId": lesson_id, "frame": frame,
            "src": web_path(png), "source": web_path(svg),
            "width": WIDTH, "height": HEIGHT,
            "sha256": file_sha(png),
        })
        print(f"{'UNCHANGED' if unchanged else 'RENDERED'} QA {png.name}", flush=True)
    write_json(directory / "manifest.json", {"version": 1, "images": result})
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Regenerate videos even when source hashes match")
    parser.add_argument("--qa-only", action="store_true", help="Render only the four QA PNG examples")
    args = parser.parse_args()
    if not args.qa_only:
        for executable in ("ffmpeg", "ffprobe"):
            if shutil.which(executable) is None:
                raise RuntimeError(f"Required executable is unavailable: {executable}")
    require_file(CONTENT)
    document = json.loads(CONTENT.read_text(encoding="utf-8"))
    lessons = document.get("lessons", [])
    by_id = {int(lesson["id"]): lesson for lesson in lessons}
    if len(by_id) != len(lessons):
        raise ValueError("Duplicate lesson IDs in content-v2.json")
    missing = [lesson_id for lesson_id in TARGET_IDS if lesson_id not in by_id]
    if missing and not args.qa_only:
        raise ValueError(f"Missing recap lessons: {missing}")
    qa = build_qa()
    if args.qa_only:
        print(f"PASS: {len(qa)} QA images rendered.", flush=True)
        return 0
    previous = {}
    if MANIFEST.is_file():
        existing = json.loads(MANIFEST.read_text(encoding="utf-8"))
        previous = {int(v["lessonId"]): v for v in existing.get("videos", [])}
    videos = [
        build_video(by_id[lesson_id], previous.get(lesson_id), force=args.force)
        for lesson_id in TARGET_IDS
    ]
    write_json(MANIFEST, {
        "version": 1,
        "pipeline": PIPELINE_VERSION,
        "width": WIDTH, "height": HEIGHT, "fps": FPS,
        "captionTiming": "estimated-by-word-count",
        "videos": videos,
        "qa": qa,
    })
    print(
        f"PASS: {len(videos)} narrated recap films; "
        f"{sum(v['duration'] for v in videos):.1f}s total; "
        f"{len(qa)} QA images; no file reaches 99 MB.",
        flush=True,
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, RuntimeError, subprocess.SubprocessError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        if isinstance(error, subprocess.CalledProcessError) and error.stderr:
            print(error.stderr[-4000:], file=sys.stderr)
        raise SystemExit(1)
