#!/usr/bin/env python3
"""Kalbinin Haritası - SosyalFest 2026 Tanıtım PDF'i"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Register Turkish-capable font
pdfmetrics.registerFont(TTFont('Arial', '/Library/Fonts/Arial Unicode.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))

out_dir = '/Users/raufenc/Library/Mobile Documents/com~apple~CloudDocs/Muhtelif/Claude/raufenc.com/kalbinin-haritasi'
pdf_path = os.path.join(out_dir, 'KalbininHaritasi_Tanitim.pdf')

GOLD_DARK = HexColor('#8B6914')
EMERALD = HexColor('#059669')
DARK = HexColor('#1a1a2e')
GRAY = HexColor('#4a4a5e')
BG_WARM = HexColor('#f5f0e6')
BG_LIGHT = HexColor('#faf7f0')
BG_GREEN = HexColor('#f0faf5')

# Styles
title_style = ParagraphStyle('T', fontName='ArialBold', fontSize=26, textColor=DARK, alignment=TA_CENTER, leading=32, spaceAfter=8)
subtitle_style = ParagraphStyle('ST', fontName='Arial', fontSize=14, textColor=GRAY, alignment=TA_CENTER, leading=18, spaceAfter=20)
h1 = ParagraphStyle('H1', fontName='ArialBold', fontSize=16, textColor=GOLD_DARK, spaceBefore=20, spaceAfter=10, leading=20)
body = ParagraphStyle('B', fontName='Arial', fontSize=10, textColor=DARK, alignment=TA_JUSTIFY, leading=14, spaceAfter=8)
body_c = ParagraphStyle('BC', fontName='Arial', fontSize=11, textColor=DARK, alignment=TA_CENTER, leading=15, spaceAfter=6)
bullet = ParagraphStyle('BL', fontName='Arial', fontSize=10, textColor=DARK, alignment=TA_JUSTIFY, leading=14, leftIndent=15, bulletIndent=5, spaceAfter=4)
small = ParagraphStyle('SM', fontName='Arial', fontSize=8, textColor=GRAY, alignment=TA_CENTER, spaceAfter=4)

doc = SimpleDocTemplate(pdf_path, pagesize=A4, topMargin=2*cm, bottomMargin=2*cm, leftMargin=2.5*cm, rightMargin=2.5*cm)

story = []

# === SAYFA 1: KAPAK ===
story.append(Spacer(1, 4*cm))
story.append(Paragraph('Kalbinin Haritası', title_style))
story.append(Paragraph('Ahlâk Pusulası', subtitle_style))
story.append(Spacer(1, 1*cm))
story.append(Paragraph('İslâmî Erdemleri Ölçülebilir Kılan<br/>Dijital Nefis Muhasebesi Modeli', body_c))
story.append(Spacer(1, 2*cm))
story.append(Paragraph('SosyalFest 2026 — İslâmî Tebliğ Kategorisi', body_c))
story.append(Spacer(1, 1*cm))
story.append(Paragraph('Canlı Uygulama: https://raufenc.com/kalbinin-haritasi/', body_c))
story.append(Paragraph('İletişim: raufenc@gmail.com', body_c))
story.append(PageBreak())

# === SAYFA 2: PROBLEM + ÇÖZÜM ===
story.append(Paragraph('1. Problem Tanımı', h1))
story.append(Paragraph(
    'İslâm ahlâk geleneğinde her erdem, iki uç arasındaki denge noktası (fazilet) olarak tanımlanır. '
    'Cesaretin eksikliği korkaklık, aşırısı saldırganlıktır. Bu zengin çerçeve yüzyıllardır bilinmesine rağmen, '
    'günümüzde dört temel sorun yaşanmaktadır:',
    body
))

problems = [
    ('Ölçüm Eksikliği', 'Geleneksel ahlâk eğitimi tek yönlü anlatıma dayanır. Kişi hangi erdemde eksik, hangisinde aşırıya kaçtığını nesnel olarak göremiyor.'),
    ('Kültürel Uyumsuzluk', 'Batılı kişilik testleri (MBTI, Big Five) İslâmî erdem çerçevesiyle uyuşmuyor. Kibir-tevazu, hased-gıpta gibi kavramlar bu testlerde karşılık bulmuyor.'),
    ('Dijital Araç Yokluğu', 'Gençler dijital araçlarla öğrenmeye yatkın, ancak Türkçe ve İslâmî perspektifli interaktif bir ahlâk ölçüm aracı fiilen bulunmuyor.'),
    ('İlerleme Takibi Yok', 'Ahlâkî gelişim soyut kaldıkça motivasyon düşer. "Geçen ayki halimle bugünkü halim arasında ne fark var?" sorusuna cevap verilemiyor.'),
]
for title, desc in problems:
    story.append(Paragraph(f'<b>{title}:</b> {desc}', bullet))

story.append(Spacer(1, 12))
story.append(Paragraph('2. Çözüm Modeli', h1))
story.append(Paragraph(
    'Kalbinin Haritası, finansal risk analizinden ilham alarak İslâmî ahlâk felsefesindeki Tefrit-Fazilet-İfrat '
    '(eksiklik-denge-aşırılık) çerçevesini dijital bir ölçüm aracına dönüştürüyor. '
    '17 farklı İslâmî erdem, senaryo bazlı sorularla test ediliyor ve deterministik skorlama ile yüzdelik dağılım hesaplanıyor.',
    body
))

story.append(Spacer(1, 12))
story.append(Paragraph('3. 17 İslâmî Erdem', h1))

virtues = [
    ['Tevazu', 'Cesaret', 'Cömertlik', 'Hüsnü Zan', 'Çalışkanlık', 'Tedbir'],
    ['Adalet', 'Hikmet', 'İffet', 'İhlâs', 'Gıpta', 'Sabır'],
    ['Hilm', 'Kanaat', 'Şükür', 'Tevekkül', 'Haya', ''],
]

t = Table(virtues, colWidths=[2.5*cm]*6)
t.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('FONTNAME', (0,0), (-1,-1), 'Arial'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TEXTCOLOR', (0,0), (-1,-1), DARK),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#cccccc')),
    ('BACKGROUND', (0,0), (-1,0), BG_WARM),
    ('BACKGROUND', (0,1), (-1,1), BG_LIGHT),
    ('BACKGROUND', (0,2), (-1,2), BG_WARM),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story.append(t)
story.append(PageBreak())

# === SAYFA 3: NASIL ÇALIŞIYOR + TEKNİK ===
story.append(Paragraph('4. Nasıl Çalışıyor?', h1))

steps = [
    ('Senaryo Bazlı Sorular', 'Her erdem testi 9-11 günlük hayat senaryosu içerir. İş toplantısı, aile ilişkisi, sosyal medya gibi somut durumlar sunulur.'),
    ('Deterministik Puanlama', 'Cevaplar 1-5 arası puan alır. 1-2 → Tefrit (eksiklik), 3 → Fazilet (denge), 4-5 → İfrat (aşırılık). Yüzdelik dağılım hesaplanır.'),
    ('Görsel Sonuçlar', 'Her erdem için LED çubuk grafikleriyle Tefrit-Fazilet-İfrat dağılımı anlık gösterilir.'),
    ('Zaman Serisi Takibi', 'Aynı testi farklı zamanlarda tekrar çözerek önceki sonuçlarla karşılaştırma yapılır.'),
    ('AI Değerlendirme (Opsiyonel)', 'İsteğe bağlı yapay zekâ destekli yorum. İslâmî hikmet geleneği perspektifinden tamamlayıcı katman.'),
]
for i, (title, desc) in enumerate(steps, 1):
    story.append(Paragraph(f'<b>Adım {i} — {title}:</b> {desc}', bullet))

story.append(Spacer(1, 16))
story.append(Paragraph('5. Teknik Altyapı', h1))

tech = [
    ['Bileşen', 'Teknoloji'],
    ['Frontend', 'HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript'],
    ['Veri Saklama', 'localStorage (gizlilik öncelikli, sunucusuz)'],
    ['PDF Oluşturma', 'PDFMake kütüphanesi'],
    ['AI Katmanı', 'Google Gemini API (opsiyonel)'],
    ['Hosting', 'Vercel (ücretsiz, otomatik deploy)'],
    ['Eğitimci Paneli', 'Firebase Auth + Firestore (beta)'],
    ['Tasarım', 'Responsive — mobil, tablet, masaüstü uyumlu'],
]

t2 = Table(tech, colWidths=[4*cm, 11*cm])
t2.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ('FONTNAME', (0,0), (-1,-1), 'Arial'),
    ('FONTNAME', (0,0), (-1,0), 'ArialBold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TEXTCOLOR', (0,0), (-1,-1), DARK),
    ('BACKGROUND', (0,0), (-1,0), GOLD_DARK),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#cccccc')),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [BG_LIGHT, white]),
]))
story.append(t2)
story.append(PageBreak())

# === SAYFA 4: HEDEF KİTLE + ÖZGÜNLÜK + MALİYET ===
story.append(Paragraph('6. Hedef Kitle', h1))

audience = [
    ['Segment', 'Kullanım Senaryosu'],
    ['Lise öğrencileri', 'Kişilik gelişim çağında öz farkındalık aracı'],
    ['Üniversite öğrencileri', 'Nefis terbiyesi ve karakter analizi'],
    ['Aileler', 'Çocuklarla birlikte ahlâkî gelişimi takip'],
    ['Din eğitimcileri', 'Ders içi tamamlayıcı dijital araç'],
    ["Cami ve STK'lar", 'Gençlik programlarında nefis terbiyesi atölyeleri'],
    ['Bireysel kullanıcılar', 'Kişisel gelişim ve öz değerlendirme'],
]

t3 = Table(audience, colWidths=[4*cm, 11*cm])
t3.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ('FONTNAME', (0,0), (-1,-1), 'Arial'),
    ('FONTNAME', (0,0), (-1,0), 'ArialBold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TEXTCOLOR', (0,0), (-1,-1), DARK),
    ('BACKGROUND', (0,0), (-1,0), EMERALD),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#cccccc')),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [BG_GREEN, white]),
]))
story.append(t3)

story.append(Spacer(1, 16))
story.append(Paragraph('7. Özgünlük', h1))
uniq = [
    'İslâm ahlâk felsefesini dijital ölçüm aracına taşıyan ilk Türkçe uygulama',
    'Finansal risk analizi metaforuyla ahlâk alanına nicel yaklaşım',
    '17 boyutlu kapsamlı karakter haritası',
    'Tamamen deterministik puanlama — sübjektif yorum yok',
    'Gizlilik öncelikli: tüm veriler kullanıcının kendi cihazında',
    'Ücretsiz, reklamsız, KVKK uyumlu',
]
for u in uniq:
    story.append(Paragraph(f'• {u}', bullet))

story.append(Spacer(1, 16))
story.append(Paragraph('8. Fayda/Maliyet Karşılaştırması', h1))

cost = [
    ['Kalem', 'Geleneksel Yöntem', 'Kalbinin Haritası'],
    ['Sunucu maliyeti', 'Aylık 500-2.000 TL', '0 TL (Vercel ücretsiz)'],
    ['Kâğıt/baskı', 'Öğrenci başına 5-10 TL', '0 TL'],
    ['Değerlendirme süresi', '1 ders saati+', 'Anlık (otomatik)'],
    ['Ölçeklenebilirlik', 'Sınıf bazlı', 'Sınırsız eş zamanlı kullanıcı'],
    ['İlerleme takibi', 'Pratik olarak imkânsız', 'Otomatik zaman serisi'],
]

t4 = Table(cost, colWidths=[3.5*cm, 5.5*cm, 6*cm])
t4.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ('FONTNAME', (0,0), (-1,-1), 'Arial'),
    ('FONTNAME', (0,0), (-1,0), 'ArialBold'),
    ('FONTSIZE', (0,0), (-1,-1), 8),
    ('TEXTCOLOR', (0,0), (-1,-1), DARK),
    ('BACKGROUND', (0,0), (-1,0), GOLD_DARK),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#cccccc')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [BG_LIGHT, white]),
]))
story.append(t4)
story.append(PageBreak())

# === SAYFA 5: ETKİ + İLETİŞİM ===
story.append(Paragraph('9. Yaygın Etki', h1))

impact = [
    ('Yerel', 'Okullar ve camiler. QR kod ile sınıfa anında uygulama. Bütçe veya izin süreci gerektirmez.'),
    ('Bölgesel', 'İl millî eğitim müdürlükleri ve müftülükler aracılığıyla imam hatip liselerinde toplu etkinlik.'),
    ('Ulusal', 'Diyanet İşleri Başkanlığı gençlik programları ve MEB değerler eğitimi müfredatına entegrasyon.'),
    ('Uluslararası', 'Türk Dünyası ülkeleri (Azerbaycan, Kazakistan) ve Arapça/İngilizce çeviri ile küresel erişim.'),
]
for level, desc in impact:
    story.append(Paragraph(f'<b>{level}:</b> {desc}', bullet))

story.append(Spacer(1, 16))
story.append(Paragraph('10. Sürdürülebilirlik', h1))

sust = [
    'Sıfır işletme maliyeti — Vercel ücretsiz plan aylık 100 GB bant genişliği',
    'Modüler mimari — her erdem testi bağımsız dosyada, yeni ekleme kolay',
    "Topluluk katkısına açık — ilahiyat fakülteleri ve STK'lar soru seti ekleyebilir",
    'Proje tek bir geliştiriciye bağımlı değil, açık kaynak yapıya uygun',
]
for s in sust:
    story.append(Paragraph(f'• {s}', bullet))

story.append(Spacer(1, 2*cm))
story.append(Paragraph('İletişim ve Erişim', h1))
story.append(Paragraph('<b>Canlı Uygulama:</b> https://raufenc.com/kalbinin-haritasi/', body))
story.append(Paragraph('<b>E-posta:</b> raufenc@gmail.com', body))
story.append(Paragraph('<b>Web:</b> https://raufenc.com', body))

story.append(Spacer(1, 1.5*cm))
story.append(Paragraph('* Ekran görüntüleri için lütfen canlı uygulamayı ziyaret ediniz.<br/>'
                        'Uygulama mobil ve masaüstünde sorunsuz çalışmaktadır.', small))

doc.build(story)
print(f'PDF oluşturuldu: {pdf_path}')
print(f'Boyut: {os.path.getsize(pdf_path) / 1024:.0f} KB')
