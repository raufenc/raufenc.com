#!/usr/bin/env python3
"""
Hikmetler — Statik HTML shim'leri üret.
Her kategori ve kart için OG meta dolu + noscript fallback sayfası yazar.
SPA app yüklenince aynı route'u dinamik render eder.
"""
import html
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data.js"
SITEMAP_FILE = ROOT / "sitemap.xml"
SITE = "https://raufenc.com"
RESERVED_SLUGS = {"assets", "scripts", "og", "k", "h"}

HEAD_COMMON = """<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0a0a0f">
<meta property="og:type" content="article">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Rauf Enç">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap">
<link rel="stylesheet" href="/lib/design-system/tokens.css">
<link rel="stylesheet" href="/hikmetler/style.css">
<script src="/lib/design-system/theme.js"></script>"""

FOOTER = """<footer class="hk-footer">
<div class="hk-footer-inner">
<div><strong>Hikmetler</strong> · 337 kart · 20 tema</div>
<div class="hk-footer-links"><a href="/">Rauf Enç</a><a href="/ilmihal/">İlmihal</a><a href="/hikmetler/kaynaklar/">Kaynaklar</a></div>
</div>
</footer>
<script src="/nav.js"></script>
<script src="/hikmetler/data.js"></script>
<script src="/hikmetler/app.js"></script>"""


def load_data():
    text = DATA_FILE.read_text(encoding="utf-8")
    m = re.search(r"window\.HIKMETLER_DATA\s*=\s*(\{.*\});?\s*$", text, re.DOTALL)
    if not m:
        raise RuntimeError("data.js parse edilemedi")
    return json.loads(m.group(1))


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def card_url(cat_slug: str, n: int, card_slug: str) -> str:
    return f"/hikmetler/{cat_slug}/{n:02d}-{card_slug}/"


def cat_url(cat_slug: str) -> str:
    return f"/hikmetler/{cat_slug}/"


def gen_category_html(cat, cards_for_cat):
    title = f"{cat['title']} — Hikmetler"
    desc = f"{cat.get('lead', cat['title'])} — {cat['count']} hikmet kartı."
    url = f"{SITE}{cat_url(cat['slug'])}"
    first = cards_for_cat[0]
    og_image = f"{SITE}/hikmetler/assets/{cat['id']}/{first['n']}-full.webp"

    # Noscript grid
    grid_items = []
    for k in cards_for_cat:
        url_k = card_url(cat["slug"], k["n"], k["slug"])
        thumb = f"/hikmetler/assets/{cat['id']}/{k['n']}-medium.webp"
        grid_items.append(
            f'<a class="hk-card" href="{url_k}">'
            f'<img src="{thumb}" alt="{esc(k["title"])}" loading="lazy" decoding="async" width="{k["w"]}" height="{k["h"]}" onload="this.classList.add(\'loaded\')">'
            f'<span class="num">{k["n"]:02d}</span>'
            f'<span class="title">{esc(k["title"])}</span>'
            f"</a>"
        )

    body = f"""<body data-view="category">
<main id="app">
<div class="hk-cat-header">
<div class="hk-breadcrumb"><a href="/hikmetler/">Hikmetler</a> · Tema {cat['id']:02d}</div>
<h1>{esc(cat['title'])}</h1>
<p class="lead">{esc(cat.get('lead', ''))}</p>
<span class="meta">{cat['count']} kart</span>
</div>
<div class="hk-card-grid">
{''.join(grid_items)}
</div>
</main>
{FOOTER}
</body>"""

    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
{HEAD_COMMON}
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{esc(cat['title'])}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og_image}">
<meta name="twitter:title" content="{esc(cat['title'])}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og_image}">
</head>
{body}
</html>
"""


def gen_card_html(card, cat, prev_card, next_card):
    title_full = f"{card['title']} — Hikmetler"
    desc = f"{cat['title']} · Kart {card['n']:02d}/{cat['count']}"
    url = f"{SITE}{card_url(cat['slug'], card['n'], card['slug'])}"
    og_image = f"{SITE}/hikmetler/assets/{cat['id']}/{card['n']}-full.webp"

    # JSON-LD
    ld = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "headline": card["title"],
        "url": url,
        "image": og_image,
        "inLanguage": "tr",
        "isPartOf": {
            "@type": "CreativeWorkSeries",
            "name": cat["title"],
            "url": f"{SITE}{cat_url(cat['slug'])}"
        },
        "creator": {"@type": "Person", "name": "Rauf Enç", "url": SITE}
    }

    prev_html = (
        f'<a class="hk-nav-btn" href="{card_url(cat["slug"], prev_card["n"], prev_card["slug"])}">'
        f'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
        f'<div><div class="dir">Önceki</div><span class="ttl">{esc(prev_card["title"])}</span></div></a>'
    ) if prev_card else '<a class="hk-nav-btn disabled" href="#"><div><div class="dir">Önceki</div><span class="ttl">—</span></div></a>'

    next_html = (
        f'<a class="hk-nav-btn next" href="{card_url(cat["slug"], next_card["n"], next_card["slug"])}">'
        f'<div><div class="dir">Sonraki</div><span class="ttl">{esc(next_card["title"])}</span></div>'
        f'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
        f"</a>"
    ) if next_card else '<a class="hk-nav-btn next disabled" href="#"><div><div class="dir">Sonraki</div><span class="ttl">—</span></div></a>'

    blur = f'<div class="blur" style="background-image:url({card["blur"]})"></div>' if card.get("blur") else ''

    body = f"""<body data-view="detail">
<main id="app">
<div class="hk-detail">
<div class="hk-detail-header">
<a class="hk-back" href="{cat_url(cat['slug'])}">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
{esc(cat['title'])}</a>
<span class="hk-progress">Kart {card['n']:02d} / {cat['count']}</span>
</div>
<div class="hk-detail-image">
{blur}
<img src="/hikmetler/assets/{cat['id']}/{card['n']}-full.webp" alt="{esc(card['title'])}" width="{card['w']}" height="{card['h']}" decoding="async" onload="this.classList.add('loaded')">
</div>
<h1 class="hk-detail-title">{esc(card['title'])}</h1>
<div class="hk-detail-nav">
{prev_html}
{next_html}
</div>
</div>
</main>
{FOOTER}
</body>"""

    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
{HEAD_COMMON}
<title>{esc(title_full)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{esc(card['title'])}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og_image}">
<meta property="og:image:width" content="{card['w']}">
<meta property="og:image:height" content="{card['h']}">
<meta name="twitter:title" content="{esc(card['title'])}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og_image}">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
{body}
</html>
"""


def write_sitemap(data):
    entries = [f'<url><loc>{SITE}/hikmetler/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>']
    for cat in data["categories"]:
        entries.append(f'<url><loc>{SITE}{cat_url(cat["slug"])}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>')
    for k in data["cards"]:
        cat = next(c for c in data["categories"] if c["id"] == k["cat"])
        url = f'{SITE}{card_url(cat["slug"], k["n"], k["slug"])}'
        entries.append(f'<url><loc>{url}</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>')

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml += "\n".join(entries)
    xml += "\n</urlset>\n"
    SITEMAP_FILE.write_text(xml, encoding="utf-8")


def main():
    data = load_data()

    # Eski k/ ve h/ klasörlerini temizle (önceki yanlış yapı)
    for legacy in ["k", "h"]:
        p = ROOT / legacy
        if p.exists():
            shutil.rmtree(p)

    cards_by_cat = {}
    for k in data["cards"]:
        cards_by_cat.setdefault(k["cat"], []).append(k)
    for cat_id in cards_by_cat:
        cards_by_cat[cat_id].sort(key=lambda x: x["n"])

    cat_count = 0
    card_count = 0

    for cat in data["categories"]:
        cat_slug = cat["slug"]
        if cat_slug in RESERVED_SLUGS:
            raise RuntimeError(f"Slug çakışması: {cat_slug} reserved klasörle çakışıyor!")
        cards_for_cat = cards_by_cat.get(cat["id"], [])

        # Kategori shim: /hikmetler/{slug}/index.html
        cat_dir = ROOT / cat_slug
        if cat_dir.exists():
            shutil.rmtree(cat_dir)
        cat_dir.mkdir()
        (cat_dir / "index.html").write_text(gen_category_html(cat, cards_for_cat), encoding="utf-8")
        cat_count += 1

        # Kart shim: /hikmetler/{slug}/{nn}-{card-slug}/index.html
        for idx, card in enumerate(cards_for_cat):
            prev_card = cards_for_cat[idx - 1] if idx > 0 else None
            next_card = cards_for_cat[idx + 1] if idx < len(cards_for_cat) - 1 else None
            card_path = f"{card['n']:02d}-{card['slug']}"
            card_dir = cat_dir / card_path
            card_dir.mkdir()
            (card_dir / "index.html").write_text(gen_card_html(card, cat, prev_card, next_card), encoding="utf-8")
            card_count += 1

    write_sitemap(data)

    print(f"✓ Kategori sayfaları:  {cat_count} × /hikmetler/{{slug}}/")
    print(f"✓ Kart sayfaları:      {card_count} × /hikmetler/{{slug}}/{{nn-slug}}/")
    print(f"✓ sitemap.xml yazıldı: {SITEMAP_FILE}")
    print()
    print("Vercel rewrite GEREKSİZ — Vercel static HTML'leri doğrudan serve eder.")


if __name__ == "__main__":
    main()
