"""
BIA Haber API — Vercel Serverless Function
Kullanım: GET /api/bia-news?password=xxx → haber listesi
          POST /api/bia-news { password, news, sha, message } → kaydet
"""

import json
import os
import urllib.request
import base64
from http.server import BaseHTTPRequestHandler

ADMIN_PASSWORD = os.environ.get('BIA_ADMIN_PASSWORD', 'birlikte2026')
GITHUB_TOKEN = os.environ.get('BIA_GITHUB_TOKEN', '')
REPO = 'raufenc/raufenc.com'
NEWS_FILE = 'birlikteiyilik-site/content/news.json'
API = 'https://api.github.com'


def gh(path, method='GET', data=None):
    req = urllib.request.Request(
        f'{API}{path}',
        headers={
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'BIA-Admin/1.0',
        },
        method=method,
    )
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))


class handler(BaseHTTPRequestHandler):

    def _send(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        from urllib.parse import urlparse, parse_qs
        params = parse_qs(urlparse(self.path).query)
        pw = params.get('password', [''])[0]
        if pw != ADMIN_PASSWORD:
            self._send({'error': 'Yanlış şifre'}, 401)
            return
        try:
            data = gh(f'/repos/{REPO}/contents/{NEWS_FILE}')
            news = json.loads(base64.b64decode(data['content'].replace('\n', '')).decode('utf-8'))
            self._send({'news': news, 'sha': data['sha']})
        except Exception as e:
            self._send({'error': str(e)}, 500)

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length).decode('utf-8'))
        if body.get('password') != ADMIN_PASSWORD:
            self._send({'error': 'Yanlış şifre'}, 401)
            return
        try:
            news = body.get('news', [])
            news.sort(key=lambda x: x.get('date', ''), reverse=True)
            content = base64.b64encode(
                json.dumps(news, ensure_ascii=False, indent=2).encode('utf-8')
            ).decode()
            result = gh(
                f'/repos/{REPO}/contents/{NEWS_FILE}',
                method='PUT',
                data={
                    'message': body.get('message', 'BIA: Haber güncellendi'),
                    'content': content,
                    'sha': body.get('sha', ''),
                },
            )
            self._send({'ok': True, 'sha': result['content']['sha']})
        except Exception as e:
            self._send({'error': str(e)}, 500)
