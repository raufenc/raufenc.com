#!/usr/bin/env python3
"""Çevrimdışı harita karosu sunucusu.

Konteynerden harici karo sağlayıcılarına (OSM, CARTO, ArcGIS) erişilemediği için
Natural Earth 10m ülke sınırlarından (world-atlas paketi) PIL ile karo üretir.
URL: /<stil>/<z>/<x>/<y>.png   stiller: osm, dark, light, labels, topo, imagery, physical
"""
import io
import json
import math
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
TOPO = os.path.join(ROOT, 'node_modules', 'world-atlas', 'countries-10m.json')
CACHE = os.path.join(ROOT, '.cache', 'tiles')

STYLES = {
    'osm':      dict(water=(170, 211, 223), land=(242, 239, 233), border=(176, 160, 190), bw=1.3),
    'dark':     dict(water=(14, 15, 19), land=(36, 38, 45), border=(72, 74, 86), bw=1.1),
    'light':    dict(water=(212, 218, 222), land=(250, 250, 247), border=(196, 196, 200), bw=1.1),
    'topo':     dict(water=(151, 210, 227), land=(236, 233, 210), border=(150, 138, 118), bw=1.2),
    'imagery':  dict(water=(10, 28, 52), land=None, border=(120, 120, 96), bw=0.8),
    'physical': dict(water=(169, 199, 222), land=None, border=(150, 140, 120), bw=0.9),
}


def decode_topojson(path):
    topo = json.load(open(path))
    sx, sy = topo['transform']['scale']
    tx, ty = topo['transform']['translate']
    arcs = []
    for arc in topo['arcs']:
        x = y = 0
        pts = []
        for dx, dy in arc:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)

    def ring(idx_list):
        out = []
        for i in idx_list:
            pts = arcs[i] if i >= 0 else arcs[~i][::-1]
            out.extend(pts if not out else pts[1:])
        return out

    polys = []  # [(bbox, [outer, hole...])]
    for geom in topo['objects']['countries']['geometries']:
        t = geom.get('type')
        if t == 'Polygon':
            groups = [geom['arcs']]
        elif t == 'MultiPolygon':
            groups = geom['arcs']
        else:
            continue
        for g in groups:
            rings = [ring(r) for r in g]
            xs = [p[0] for p in rings[0]]
            ys = [p[1] for p in rings[0]]
            polys.append(((min(xs), min(ys), max(xs), max(ys)), rings))
    return polys


POLYS = decode_topojson(TOPO)
LOCK = threading.Lock()


def lonlat_to_px(lon, lat, z):
    lat = max(min(lat, 85.05112878), -85.05112878)
    n = 256 * (2 ** z)
    x = (lon + 180.0) / 360.0 * n
    s = math.sin(math.radians(lat))
    y = (0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)) * n
    return x, y


def tile_bounds(z, x, y):
    n = 2 ** z

    def lon(px):
        return px / n * 360.0 - 180.0

    def lat(py):
        return math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * py / n))))
    return lon(x), lat(y + 1), lon(x + 1), lat(y)


def land_color(style, lat):
    a = abs(lat)
    if style == 'imagery':
        if a > 66:
            return (210, 214, 220)
        if 15 < a < 35:
            return (122, 104, 74)
        if a < 15:
            return (44, 70, 40)
        return (64, 78, 50)
    # physical
    if a > 66:
        return (236, 238, 240)
    if 15 < a < 35:
        return (226, 206, 160)
    if a < 15:
        return (178, 200, 140)
    return (204, 210, 166)


def render(style, z, x, y):
    if style == 'labels':
        img = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
        buf = io.BytesIO()
        img.save(buf, 'PNG')
        return buf.getvalue()
    st = STYLES.get(style, STYLES['osm'])
    SS = 3
    W = 256 * SS
    img = Image.new('RGB', (W, W), st['water'])
    d = ImageDraw.Draw(img)
    w, s, e, n = tile_bounds(z, x, y)
    pad = 360.0 / (2 ** z) * 0.05
    ox, oy = x * 256, y * 256
    hits = [p for p in POLYS if not (p[0][2] < w - pad or p[0][0] > e + pad or p[0][3] < s - pad or p[0][1] > n + pad)]

    def proj(r):
        out = []
        for lo, la in r:
            px, py = lonlat_to_px(lo, la, z)
            out.append(((px - ox) * SS, (py - oy) * SS))
        return out

    for bbox, rings in hits:
        lat_c = (bbox[1] + bbox[3]) / 2
        fill = st['land'] if st['land'] else land_color(style, lat_c)
        outer = proj(rings[0])
        if len(outer) >= 3:
            d.polygon(outer, fill=fill)
        for h in rings[1:]:
            hp = proj(h)
            if len(hp) >= 3:
                d.polygon(hp, fill=st['water'])
    bw = max(1, int(round(st['bw'] * SS * (1.0 if z >= 4 else 0.7))))
    for bbox, rings in hits:
        for r in rings:
            pr = proj(r)
            if len(pr) >= 2:
                d.line(pr + [pr[0]], fill=st['border'], width=bw, joint='curve')
    img = img.resize((256, 256), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, 'PNG', optimize=False)
    return buf.getvalue()


class H(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        parts = self.path.split('?')[0].strip('/').split('/')
        try:
            style, z, x, y = parts[0], int(parts[1]), int(parts[2]), int(parts[3].split('.')[0].split('@')[0])
        except Exception:
            self.send_response(400)
            self.end_headers()
            return
        n = 2 ** z
        x %= n
        if y < 0 or y >= n or z > 19:
            self.send_response(404)
            self.end_headers()
            return
        fp = os.path.join(CACHE, style, str(z), str(x), f'{y}.png')
        if os.path.exists(fp):
            data = open(fp, 'rb').read()
        else:
            data = render(style, z, x, y)
            os.makedirs(os.path.dirname(fp), exist_ok=True)
            with open(fp + '.tmp', 'wb') as f:
                f.write(data)
            os.replace(fp + '.tmp', fp)
        self.send_response(200)
        self.send_header('content-type', 'image/png')
        self.send_header('access-control-allow-origin', '*')
        self.send_header('content-length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
    srv = ThreadingHTTPServer(('127.0.0.1', port), H)
    print(f'tiles: http://127.0.0.1:{port}', flush=True)
    srv.serve_forever()
