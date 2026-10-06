#!/usr/bin/env node
// Instagram / sosyal medya paylaşım metinleri: storyboard'lardan proje başına açıklama + hashtag.
//   node paylasim.mjs  → INSTAGRAM.md (deploy edilmez)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const meta = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(HERE, 'projeler.json'), 'utf8')).map((p) => [p.slug, p]));
const TAG = {
  noroterbiye: '#nöroterbiye #nefsterbiyesi #dopamin #kişiselgelişim',
  dil: '#dilöğrenme #kelimeöğren #eğitim #çocukeğitimi',
  peygamberim: '#siyer #peygamberimiz #ahlak #değereğitimi',
  tarih: '#tarih #osmanlı #islamtarihi #medeniyet',
  dusunce: '#düşünce #felsefe #kişilik #kendinitanı',
  ai: '#yapayzeka #ai #teknoloji #eğitimteknolojisi',
  sinif: '#öğretmen #sınıf #eğitimoyunları #imamhatip',
  'cihan-serisi': '#kutuoyunu #tarihoyunu #osmanlı #strateji',
};
const plain = (s) => String(s || '').replace(/\*\*?/g, '').replace(/\s+/g, ' ').trim();
const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v.v || v.h : v);

let md = '# Instagram paylaşım metinleri\n\nHer video için hazır açıklama. Dikey sürümü (`videolar/<slug>/dikey.mp4`) yükleyin; kapak için `dikey.jpg`.\nReels\'te bağlantı tıklanmadığı için "link profilde" notu var.\n';
for (const slug of fs.readdirSync(path.join(HERE, 'projects')).sort()) {
  const f = path.join(HERE, 'projects', slug, 'storyboard.json');
  if (!fs.existsSync(f)) continue;
  const sb = JSON.parse(fs.readFileSync(f, 'utf8'));
  const m = meta[slug] || {};
  const hook = (pick(sb.hook && sb.hook.lines) || []).map(plain).join(' ');
  const tagline = plain(pick(sb.intro && sb.intro.tagline));
  const feats = (sb.features || []).map((x) => '▸ ' + plain(pick(x.title)) + (x.text ? ' — ' + plain(pick(x.text)) : ''));
  const chips = (pick(sb.cta && sb.cta.chips) || []).map(plain);
  const url = (sb.url || 'raufenc.com').replace(/^https?:\/\//, '');
  md += `\n---\n\n## ${plain(sb.title || m.title)}\n\n\`\`\`\n${hook}\n\n${plain(sb.title || m.title)}: ${tagline}\n\n${feats.join('\n')}\n\n${chips.length ? '✓ ' + chips.join(' · ') + '\n\n' : ''}🔗 ${url} (link profilde)\n\n#raufenc #eğitim ${TAG[m.kategori] || ''}\n\`\`\`\n`;
}
fs.writeFileSync(path.join(HERE, 'INSTAGRAM.md'), md);
console.log('INSTAGRAM.md yazıldı');
