#!/usr/bin/env python3
"""Ses tasarımı: motorun zaman çizelgesindeki işaretlerden (cue) çalgısız bir
efekt izi üretir — geçiş hışırtıları, dokunma tıkları, sayaç tikleri, kapanış çanı.

Kullanım: audio.py cues.json süre çıktı.wav [vo.json]
vo.json: [{"t": saniye, "file": "/site/kökünden/yol.mp3"}] — seslendirme cümleleri; efektler
seslendirme sürerken kısılır (ducking).
"""
import json
import os
import subprocess
import sys
import wave

import numpy as np

SR = 48000
RNG = np.random.default_rng(7)


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def band(x, lo, hi):
    """FFT ile bant geçiren süzgeç (yumuşak kenarlı)."""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    m = np.clip((f - lo * 0.7) / (lo * 0.3 + 1e-9), 0, 1) * np.clip((hi * 1.3 - f) / (hi * 0.3 + 1e-9), 0, 1)
    return np.fft.irfft(X * m, n)


def norm(x):
    p = np.max(np.abs(x)) + 1e-9
    return x / p


def pan(x, p):
    """p: -1 sol .. 1 sağ (skaler ya da dizi)."""
    a = (np.asarray(p) + 1) * np.pi / 4
    return np.stack([x * np.cos(a), x * np.sin(a)], axis=1)


def whoosh(dur=0.6, bright=1.0, seed=0):
    rng = np.random.default_rng(100 + seed)
    t = t_axis(dur)
    n = len(t)
    noise = rng.standard_normal(n)
    lo = norm(band(noise, 150, 700))
    mid = norm(band(noise, 700, 2600))
    hi = norm(band(noise, 2600, 8000 * bright))
    k = t / dur
    peak = 0.72
    env = np.where(k < peak, (k / peak) ** 2.2, np.exp(-(k - peak) * 14))
    xf = np.clip(k / peak, 0, 1)
    sig = lo * (1 - xf) * 0.9 + mid * np.sin(xf * np.pi) * 0.7 + hi * xf ** 1.5 * 0.45
    sig = sig * env
    return pan(norm(sig) * 0.55, np.linspace(-0.6, 0.6, n)), peak * dur


def impact(dur=1.3):
    t = t_axis(dur)
    f = 42 + 70 * np.exp(-t * 18)
    ph = 2 * np.pi * np.cumsum(f) / SR
    sub = np.sin(ph) * np.exp(-t * 3.2)
    thump = band(RNG.standard_normal(len(t)), 40, 400) * np.exp(-t * 28)
    air = band(RNG.standard_normal(len(t)), 3000, 9000) * np.exp(-t * 9) * 0.25
    sig = sub * 0.9 + norm(thump) * 0.5 + norm(air) * 0.12
    return pan(norm(sig) * 0.6, 0), 0.0


def tap(seed=0):
    rng = np.random.default_rng(300 + seed)
    t = t_axis(0.09)
    click = band(rng.standard_normal(len(t)), 2500, 9000) * np.exp(-t * 900)
    f = 1500 - 500 * t / 0.09
    blip = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 60)
    sig = norm(click) * 0.5 + blip * 0.6
    return pan(norm(sig) * 0.42, 0.15), 0.0


def type_click(seed=0):
    rng = np.random.default_rng(500 + seed)
    t = t_axis(0.03)
    sig = band(rng.standard_normal(len(t)), 1800 + 300 * (seed % 4), 7000) * np.exp(-t * 400)
    return pan(norm(sig) * 0.16, -0.1 + 0.05 * (seed % 5)), 0.0


def count(dur=1.1):
    out = np.zeros((int((dur + 0.1) * SR), 2))
    n = 16
    for i in range(n):
        # sayaç: üstel yavaşlama → tik aralıkları açılır
        u = i / (n - 1)
        tt = -np.log2(1 - u * 0.999) / 10 * dur
        s = int(tt * SR)
        t = t_axis(0.012)
        tick = np.sin(2 * np.pi * (2300 + 40 * (i % 3)) * t) * np.exp(-t * 500)
        st = pan(tick * 0.11, -0.2 + 0.4 * u)
        e = min(len(out), s + len(st))
        out[s:e] += st[: e - s]
    return out, 0.0


def bell(freqs, dur=1.6, amp=0.32, decay=3.2):
    t = t_axis(dur)
    sig = np.zeros_like(t)
    for f0 in freqs:
        for ratio, a, dk in ((1, 1, 1), (2.76, 0.38, 1.7), (5.4, 0.16, 2.6), (8.93, 0.07, 3.6)):
            sig += a * np.sin(2 * np.pi * f0 * ratio * t) * np.exp(-t * decay * dk)
    att = np.clip(t / 0.004, 0, 1)
    return pan(norm(sig * att) * amp, 0.05), 0.0


def chime():
    a, _ = bell([1318.5], 1.8, 0.24, 2.6)
    b, _ = bell([1975.5], 1.6, 0.18, 3.0)
    off = int(0.09 * SR)
    out = np.zeros((len(a) + off, 2))
    out[: len(a)] += a
    out[off: off + len(b)] += b
    sparkle = band(RNG.standard_normal(len(out)), 5000, 11000)
    env = np.exp(-np.arange(len(out)) / SR * 6)
    out += pan(norm(sparkle) * env * 0.05, 0.3)
    return out, 0.0


def reverb(x, secs=1.4, wet=0.2):
    n = int(secs * SR)
    t = np.arange(n) / SR
    ir = np.stack([band(RNG.standard_normal(n), 200, 7000) * np.exp(-t * 4.2) for _ in range(2)], axis=1)
    ir[: int(0.012 * SR)] = 0
    ir /= np.sqrt(np.sum(ir ** 2, axis=0, keepdims=True)) + 1e-9
    L = len(x) + n
    nfft = 1 << (L - 1).bit_length()
    y = np.zeros((L, 2))
    for c in range(2):
        y[:, c] = np.fft.irfft(np.fft.rfft(x[:, c], nfft) * np.fft.rfft(ir[:, c], nfft), nfft)[:L]
    out = np.zeros((L, 2))
    out[: len(x)] = x
    return out + y * wet


SITE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def decode(path):
    """ffmpeg ile mono float32 48 kHz."""
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                       capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype='<f4').astype(np.float64)


def voice_track(vo, N):
    """Seslendirme izi (mono) ve 0..1 zarf (ducking için)."""
    v = np.zeros(N)
    for item in vo:
        fp = item['file']
        if fp.startswith('/'):
            fp = os.path.join(SITE, fp.lstrip('/'))
        x = decode(fp)
        x = band(x, 80, 12000)
        # cümle başına RMS eşitleme (yaklaşık -17 dBFS)
        act = np.abs(x) > 0.02
        rms = np.sqrt(np.mean(x[act] ** 2)) if act.any() else 1e-3
        x = x * (10 ** (-17 / 20) / (rms + 1e-9))
        # kenar yumuşatma
        f = min(len(x) // 4, int(0.012 * SR))
        if f > 0:
            x[:f] *= np.linspace(0, 1, f)
            x[-f:] *= np.linspace(1, 0, f)
        s = int(item['t'] * SR)
        e = min(N, s + len(x))
        if s < N:
            v[s:e] += x[: e - s]
    # zarf: 40 ms RMS, hızlı atak / yavaş bırakış
    w = int(0.04 * SR)
    env = np.sqrt(np.convolve(v ** 2, np.ones(w) / w, mode='same'))
    env = np.clip(env / (env.max() + 1e-9) * 2.2, 0, 1)
    out = np.zeros_like(env)
    a, r = np.exp(-1 / (0.015 * SR)), np.exp(-1 / (0.28 * SR))
    acc = 0.0
    # seyreltilmiş döngü (her 48 örnekte bir) + doğrusal ara değer
    step = 48
    idx = np.arange(0, N, step)
    vals = np.empty(len(idx))
    for k, i in enumerate(idx):
        x = env[i]
        c = a ** step if x > acc else r ** step
        acc = c * acc + (1 - c) * x
        vals[k] = acc
    out = np.interp(np.arange(N), idx, vals)
    return v, out


def render(cues, duration, vo=None):
    N = int(duration * SR) + SR
    mix = np.zeros((N, 2))
    seed = 0
    for c in cues:
        typ = c['type']
        seed += 1
        if typ == 'whoosh':
            snd, pk = whoosh(0.62, 1.0, seed)
        elif typ == 'swish':
            snd, pk = whoosh(0.34, 1.3, seed)
            snd *= 0.55
        elif typ == 'impact':
            snd, pk = impact()
        elif typ == 'tap':
            snd, pk = tap(seed)
        elif typ == 'type':
            snd, pk = type_click(seed)
        elif typ == 'count':
            snd, pk = count(c.get('dur', 1.1))
        elif typ == 'ding':
            snd, pk = bell([1046.5], 1.5, 0.2, 3.4)
        elif typ == 'chime':
            snd, pk = chime()
        else:
            continue
        s = int((c['t'] - pk) * SR)
        if s < 0:
            snd = snd[-s:]
            s = 0
        e = min(N, s + len(snd))
        mix[s:e] += snd[: e - s]
    mix = reverb(mix, 1.3, 0.22)[:N]
    if vo:
        voice, env = voice_track(vo, N)
        # efekt izini normalle, seslendirme sırasında ~9 dB kıs
        mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.42
        mix *= (1 - 0.65 * env)[:, None]
        vroom = reverb(np.stack([voice, voice], axis=1), 0.6, 0.05)[:N]
        mix = mix + vroom * 0.95
    # kenarlarda yumuşak giriş/çıkış (döngü için)
    n = int(duration * SR)
    mix = mix[:n]
    fade = int(0.35 * SR)
    mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
    mix[: int(0.004 * SR)] *= np.linspace(0, 1, int(0.004 * SR))[:, None]
    peak = np.max(np.abs(mix)) + 1e-9
    drive = 1.6 if vo else 1.3
    mix = np.tanh(mix / peak * drive) / np.tanh(drive) * (0.89 if vo else 0.84)
    return mix


def write_wav(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == '__main__':
    cues = json.load(open(sys.argv[1]))
    dur = float(sys.argv[2])
    vo = json.load(open(sys.argv[4])) if len(sys.argv) > 4 and os.path.exists(sys.argv[4]) else None
    write_wav(sys.argv[3], render(cues, dur, vo or None))
