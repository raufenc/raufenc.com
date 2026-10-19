#!/usr/bin/env node
/**
 * Yayına giden dizin sayfalarına (…/index.html) eksik canonical ve Open Graph
 * etiketlerini ekler. Var olan etiketlere dokunmaz; yeniden çalıştırmak güvenlidir.
 *
 *   node scripts/seo-etiket.mjs            → ekler
 *   node scripts/seo-etiket.mjs --kontrol  → eksik sayfa varsa listeler, 1 ile çıkar
 *
 * Atlananlar: noindex ve meta-refresh sayfaları, şablonlar, iç araçlar ve
 * vitrin/ (o sayfaları scripts/vitrin-meta.mjs üretir).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://raufenc.com';
const VARSAYILAN_GORSEL = `${SITE}/images/og-image.jpg`;
const GIT = process.env.GIT || 'git';

// .vercelignore ile yayına girmeyen ya da dizine eklenmemesi gereken yollar
const ATLA = [
  /^(scripts|tests|sinav|sinav 2|_video-studio|_alim-sablonu)\//,
  /^7sinif\/scorm\//,
  /^vitrin\//,
  /^muallimo\/review\//,
];

// Açıklaması olmayan sayfalar için elle yazılmış açıklamalar
const ACIKLAMA = {
  '7sinif/3/hastaneye-yolculuk/': 'İHO 7. sınıf Arapça 3. ünite oyunu: Ahmed\'in hastaneye ulaşmasına yardım et. Tek ya da iki oyunculu.',
  '7sinif/oyunlar/eba-etkilesim/': 'İHO 7. sınıf Arapça etkileşimli etkinlikler: izle, cevapla, dinle.',
  '7sinif/oyunlar/eba-yaris/': 'İHO 7. sınıf Arapça: izle ve yarış. Tek başına çalış ya da arkadaşınla yarış.',
  'arapca/unite2/': 'Arapça 2. ünite: Alışveriş (التسوق) konusunda etkileşimli çalışmalar.',
  'bak-bak/ogretmen/': 'Bak Bak öğretmen paneli: görsel dikkat ve kavram–görsel eşleştirme oyununun amaçları, kazanımları ve modları.',
  'hilal-scorm/': 'Hilali Gördüm mü? — videolu, beş soruluk etkileşimli ders.',
  'kasif-motoru/ogretmen/': 'Çarşı Diyarı (İHO 7 Arapça, 3. ünite) öğretmen paneli: bölüm ilerlemesi, skorlar ve en çok zorlanılan kazanımlar.',
};

// config.js'teki adın üslup gereği hürmet ifadesiyle yazılması gereken sayfalar (CLAUDE.md)
const BASLIK = {
  'imam-buhari/': 'İmâm-ı Buhârî hazretleri — Hadîs İlminin Güneşi',
};

function projeler() {
  const kod = readFileSync(join(KOK, 'data/projeler.js'), 'utf8');
  const ctx = {};
  vm.runInNewContext(kod + ';this.PROJELER = PROJELER;', ctx);
  const harita = {};
  for (const p of ctx.PROJELER) {
    if (p.external) continue;
    const yol = p.href.replace(/[#?].*$/, '').replace(/^\//, '');
    harita[yol] = p;
  }
  return harita;
}

function sayfalar() {
  const cikti = execFileSync(GIT, ['-C', KOK, 'ls-files', '--', '*index.html'], { encoding: 'utf8' });
  return cikti.split('\n').filter(f => f.endsWith('index.html') && f !== 'index.html' && !ATLA.some(r => r.test(f)));
}

const nitelik = s => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const metinCoz = s => String(s).replace(/\s+/g, ' ').trim();

function bul(bas, re) { const m = bas.match(re); return m ? m[1] : null; }

function isle(dosya, proje) {
  const yol = join(KOK, dosya);
  const html = readFileSync(yol, 'utf8');
  const kapanis = html.search(/<\/head>/i);
  if (kapanis === -1) return null;
  const bas = html.slice(0, kapanis);
  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(bas)) return null;
  if (/http-equiv=["']refresh/i.test(bas)) return null;

  const dizin = dosya.replace(/index\.html$/, '');
  const url = `${SITE}/${dizin}`;
  const varMi = re => re.test(bas);
  const canonicalVar = varMi(/<link[^>]+rel=["']canonical["']/i);
  const ogBaslikVar = varMi(/property=["']og:title["']/i);
  const yukleniyor = /<title[^>]*>\s*Yükleniyor/i.test(bas);
  if (canonicalVar && ogBaslikVar && !yukleniyor) return null;

  // Başlık ve açıklama: config.js ile JS'ten dolan biyografi sayfalarında oradan okunur
  let baslik = metinCoz(bul(bas, /<title[^>]*>([\s\S]*?)<\/title>/i) || '');
  let aciklama = bul(bas, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || '';
  const aciklamaEtiketiVar = varMi(/<meta[^>]+name=["']description["']/i);
  if (/^Yükleniyor/i.test(baslik)) {
    try {
      const cfg = readFileSync(join(KOK, dizin, 'config.js'), 'utf8');
      const ctx = {};
      vm.runInNewContext(cfg.replace(/^const SCHOLAR/m, 'this.SCHOLAR') , ctx);
      baslik = BASLIK[dizin] || `${ctx.SCHOLAR.name} — ${ctx.SCHOLAR.subtitle}`;
      aciklama = aciklama || ctx.SCHOLAR.description;
    } catch (_) { /* config yoksa başlık olduğu gibi kalır */ }
  }
  if (!aciklama) aciklama = ACIKLAMA[dizin] || (proje && proje.desc) || '';

  const ogUrl = bul(bas, /property=["']og:url["'][^>]+content=["']([^"']+)["']/i);
  const kanonik = ogUrl && ogUrl.startsWith(SITE + '/') ? ogUrl : url;
  const gorsel = bul(bas, /name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
    || (proje && proje.video ? `${SITE}/videolar/${proje.video}/yatay.jpg` : VARSAYILAN_GORSEL);

  const ekler = [];
  if (!canonicalVar) ekler.push(`<link rel="canonical" href="${nitelik(kanonik)}" />`);
  if (aciklama && !aciklamaEtiketiVar) ekler.push(`<meta name="description" content="${nitelik(aciklama)}" />`);
  if (!ogBaslikVar) {
    if (!varMi(/property=["']og:type["']/i)) ekler.push('<meta property="og:type" content="website" />');
    if (!ogUrl) ekler.push(`<meta property="og:url" content="${nitelik(kanonik)}" />`);
    ekler.push(`<meta property="og:title" content="${nitelik(baslik)}" />`);
    if (aciklama && !varMi(/property=["']og:description["']/i)) ekler.push(`<meta property="og:description" content="${nitelik(aciklama)}" />`);
    if (!varMi(/property=["']og:image["']/i)) ekler.push(`<meta property="og:image" content="${nitelik(gorsel)}" />`);
    if (!varMi(/property=["']og:locale["']/i)) ekler.push('<meta property="og:locale" content="tr_TR" />');
    if (!varMi(/property=["']og:site_name["']/i)) ekler.push('<meta property="og:site_name" content="Rauf Enç" />');
    if (!varMi(/name=["']twitter:card["']/i)) ekler.push('<meta name="twitter:card" content="summary_large_image" />');
  } else if (!ogUrl) {
    ekler.push(`<meta property="og:url" content="${nitelik(kanonik)}" />`);
  }
  // JS'in sonradan doldurduğu boş başlık/açıklama statik olarak da yazılır
  let govde = html;
  if (yukleniyor && !/^Yükleniyor/i.test(baslik)) govde = govde.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${baslik}</title>`);
  if (aciklama) govde = govde.replace(/(<meta[^>]+name=["']description["'][^>]+content=)["']["']/i, `$1"${nitelik(aciklama)}"`);
  if (!ekler.length) return govde === html ? null : { html: govde, ekler };

  // </title>'dan sonra, aynı girintiyle ekle (başlık yoksa charset'ten sonra)
  const govdeBas = govde.slice(0, govde.search(/<\/head>/i));
  const titleSonu = govdeBas.search(/<\/title>/i);
  let yer;
  if (titleSonu !== -1) yer = titleSonu + '</title>'.length;
  else {
    const m = govdeBas.match(/<meta[^>]+charset[^>]*>/i);
    const h = govdeBas.match(/<head[^>]*>/i);
    yer = m ? m.index + m[0].length : h.index + h[0].length;
  }
  const satirBasi = govde.lastIndexOf('\n', yer - 1) + 1;
  const girinti = (govde.slice(satirBasi, yer).match(/^[ \t]*/) || [''])[0];
  const blok = ekler.map(e => '\n' + girinti + e).join('');
  return { html: govde.slice(0, yer) + blok + govde.slice(yer), ekler };
}

const kontrol = process.argv.includes('--kontrol');
const harita = projeler();
let sayi = 0;
for (const dosya of sayfalar()) {
  const dizin = dosya.replace(/index\.html$/, '');
  const sonuc = isle(dosya, harita[dizin]);
  if (!sonuc) continue;
  sayi++;
  if (kontrol) { console.log('eksik:', dosya); continue; }
  writeFileSync(join(KOK, dosya), sonuc.html);
  console.log(`${dosya}  +${sonuc.ekler.length}`);
}
console.log(kontrol ? `${sayi} sayfada eksik var` : `${sayi} sayfa güncellendi`);
if (kontrol && sayi) process.exit(1);
