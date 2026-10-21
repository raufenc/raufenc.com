// BU SALONDA 28 GİRİŞİM VAR — Giriş ücreti düştü, kalite ücreti duruyor · Rauf Enç · 7 dakika
// Üç sunumun birleşimi: 3. sunumun omurgası ve 3B çarşı dili (28 konu, DERT·DENEY·DEĞER, kartlar, filmler),
// 2. sunumun tezi ve kanıtı (giriş ücreti / kalite ücreti, tek masa, canlı girişim deneyi),
// 1. sunumun etkileşim ve "kendini tanı" katmanı (üç tuzak, 1-2-3 parmak, motor/direksiyon, NöroTerbiye).
// Slayt: tur, bolum (0 giriş/kapanış, 1 DERT, 2 DENEY, 3 DEĞER), sure (hedef sn), olcut, not, fon, html.
// Adım: class="adim" data-a="N" (N. tıklamada gelir) data-son="M" (M. tıklamada gider). data-sinif="sinif:N" → N. tıklamada sınıf eklenir.

const IK = n => `img/ikon/${window.FIKIRLER[n].ikon}.png`;
const fon = (ad, a = null, son = null, kb = true) =>
  `<div class="fon ${kb ? "kb" : ""} ${a !== null ? "adim" : ""}" ${a !== null ? `data-a="${a}"` : ""} ${son ? `data-son="${son}"` : ""} style="background-image:url('img/${ad}.jpg')"></div>`;
const selam = (n, metin, a = null, son = null, x = 110, y = 176) =>
  `<div class="ab ${a !== null ? "adim" : ""}" ${a !== null ? `data-a="${a}"` : ""} ${son ? `data-son="${son}"` : ""} style="left:${x}px;top:${y}px"><span class="selam"><img src="${IK(n)}">${metin}</span></div>`;
const etiket = (t, y = 120) => `<div class="ab" style="left:114px;top:${y}px"><span class="etiket"><i></i>${t}</span></div>`;
const blok = (a, son, baslik, govde, y = 300, w = 800, bb = 150) => `<div class="ab adim" data-a="${a}" ${son ? `data-son="${son}"` : ""} style="left:110px;top:${y}px;width:${w}px">
  <div class="baslik" style="font-size:${bb}px">${baslik}</div>${govde ? `<div class="govde" style="margin-top:34px">${govde}</div>` : ""}</div>`;
const tabelaYazi = (renkler, kelimeler, alt = null) => {
  const X = [68, 687, 1308], W = 545;
  return kelimeler.map((k, i) => `<div class="ab" style="left:${X[i]}px;top:520px;width:${W}px;height:215px;display:flex;align-items:center;justify-content:center">
    <span class="baslik" style="font-size:150px;color:${renkler[i]}">${k}</span></div>` + (alt ? `<div class="ab" style="left:${X[i]}px;top:790px;width:${W}px;text-align:center"><span class="cip" style="font-size:30px;letter-spacing:0;text-transform:none;padding:16px 30px">${alt[i]}</span></div>` : "")).join("");
};
const izgara = (tik, top) => `<div class="izgara" style="top:${top}px" ${tik ? "" : 'data-sinif="on13:1"'}>${window.FIKIRLER.map((f, i) =>
  `<div class="karo ${f.ben ? "ben" : ""} ${f.once ? "once" : ""} ${f.sonra ? "sonra" : ""}" ${tik ? 'data-tik="1"' : ""} data-no="${i}" style="--s:${i}"><img src="${IK(i)}"><div class="tik"></div><div class="k">${f.ad}</div><div class="i">${f.kisa}</div></div>`).join("")}</div>`;
// karikatür kartı: tek kare + altyazı (görseller img/karikatur/K01..K10.jpg, Codex)
const karikatur = (g, no, baslik, alt, a, son, x = 420, y = 120, rot = -2, w = 1080) =>
  `<div class="ab adim" data-a="${a}" ${son ? `data-son="${son}"` : ""} style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg)">
    <div class="karikatur">${no ? `<div class="kk-no">${no}</div>` : ""}<img src="img/karikatur/${g}.jpg"><div class="kk-baslik">${baslik}</div><div class="kk-alt">${alt}</div></div></div>`;
// tarayıcı penceresi (tek masa slaytı)
const tarayici = (img, x, y, w, rot, a, baslik) => `<div class="ab adim" data-a="${a}" data-son="5" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg)">
  <div class="tarayici"><div class="bar"><i></i><i></i><i></i><span>${baslik}</span></div><img src="img/${img}" style="width:100%;display:block"></div></div>`;

window.SLAYTLAR = [
  // 1 ─ KAPAK · GİRİŞİMCİLİK KURSU 1. DERS (kurs fişi · ördek duvarı · uygularsanız)
  { tur: "normal", bolum: 0, sure: 48, kunye: false, olcut: ["Etkileyici giriş (HİŞT): Heyecan + Şaşkınlık (10.000 ₺) + Tepki (gülme) + İlgi (sır)"],
    not: `[Sahneye gel, ortada dur, salona bak, gülümse. Kurs hocası tonuyla:]
Girişimcilik kursunun birinci dersine hoş geldiniz. [TIKLA — fiş] Küçük bir formalite: kurs ücretini yatıranlar el kaldırsın. [bekle; kimse kaldırmaz; gül] Ben de yatırmadım.
[TIKLA — hizmet içi] Ama ders şurada: bedel ödemeye razı kimse yoksa buna girişim demiyoruz; zorunlu hizmet içi eğitim diyoruz. [gülüşme] Bugün bunu düzelteceğiz.
[TIKLA — hoca kartı] Hocanız benim: Rauf Enç. Elektronik mühendisi, ilahiyatçı, öğretmen; yapay zekâyla iş üretirim, kitap yazdım… ve girişimciler yetiştiririm. [TIKLA — çarşıya dönmüş salon] Cuma günü bu salon da o listeye eklenecek.
Söz veriyorum: bu hafta öğreneceklerinizi uygularsanız milyoner olacaksınız. [TIKLA — öncesi/sonrası] Uygularsanız. [parmak salla, gülümse] [TIKLA]
Sabahtan beri on üç ders dinlediniz. Üzülmeyin: onlar bu kursun ücretsiz tanıtım dersleriydi. [gülüşme] Size bir sır vereyim mi? [bir adım öne, sesi alçalt] On üçü de… benim dersimin konusunu anlattı. Sadece haberleri yoktu. [TIKLA → film]
(Kural: cümleyi bitir, sonra gül; gülüş kelimeyi yutmasın.)`,
    fon: fon("A01_kapak_carsi") + `<div class="perde-sol"></div>`,
    html: `${etiket("Girişimcilik Kursu · 1. Ders · Rauf Enç", 150)}
      <div class="ab baslik" style="left:92px;top:200px;font-size:500px;color:var(--dom);line-height:.86">28</div>
      <div class="ab govde" style="left:114px;top:690px;width:760px;font-size:50px;line-height:1.3">Bir salon. Yirmi sekiz konu.<br><b>Bir sır.</b></div>
      <div class="ab adim" data-a="1" data-son="6" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.5)"></div>
      <div class="ab adim" data-a="1" data-son="3" style="left:560px;top:150px;width:800px;transform:rotate(-2deg)">
        <div class="kart" style="padding:44px 54px 56px;font-family:Menlo,'SF Mono',monospace;color:var(--mur);position:relative">
          <div style="text-align:center;font:700 36px Menlo;letter-spacing:.16em">KURS FİŞİ</div>
          <div style="text-align:center;font-size:20px;color:rgba(27,34,56,.55);margin-top:8px">Mogan · 7 gün · 1. ders</div>
          <div style="border-top:3px dashed rgba(27,34,56,.25);margin:24px 0 10px"></div>
          ${[["Girişimcilik kursu","7 gün"],["Kursiyer","28 kişi"],["Hoca","1 kişi, heyecanlı"],["Çay, simit","dahil"]].map(([a,b])=>`<div style="display:flex;align-items:baseline;gap:14px;font-size:30px;padding:12px 0"><span>${a}</span><span style="flex:1;border-bottom:4px dotted rgba(27,34,56,.3);transform:translateY(-8px)"></span><span style="font-weight:700">${b}</span></div>`).join("")}
          <div style="border-top:4px solid var(--mur);margin-top:16px;padding-top:20px;display:flex;align-items:baseline;gap:14px;font-size:44px;font-weight:700"><span>TOPLAM</span><span style="flex:1"></span><span style="color:var(--dom)">10.000 ₺</span></div>
          <div style="position:absolute;right:40px;top:28px;transform:rotate(-12deg);border:6px solid var(--zum);color:var(--zum);font:800 34px Inter;letter-spacing:.2em;padding:8px 18px;border-radius:12px;background:rgba(255,251,244,.85)">ÖDENECEK</div>
        </div></div>

      <div class="ab adim" data-a="2" data-son="3" style="left:0;right:0;top:850px;text-align:center"><div class="vurgu" style="font-size:40px;line-height:1.25;background:var(--dom)">Bedel ödemeye razı kimse yoksa buna <em style="color:var(--beyaz)">girişim</em> demiyoruz:<br><em>zorunlu hizmet içi eğitim</em> diyoruz. Bugün bunu düzelteceğiz.</div></div>
      <div class="ab adim" data-a="3" data-son="4" style="left:360px;top:200px;width:1200px;transform:rotate(1.5deg)">
        <div class="kart" style="padding:50px 60px 54px">
          <span class="cip dom" style="font-size:22px">HOCA</span>
          <div class="baslik" style="font-size:120px;line-height:1;margin-top:22px">Rauf Enç</div>
          <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:34px">
            ${["Elektronik mühendisi","İlahiyatçı","Öğretmen","Yapay zekâyla üretir","Yazar"].map(t=>`<span class="cip acik" style="font-size:28px;letter-spacing:0;padding:16px 28px;box-shadow:0 8px 24px rgba(27,34,56,.12);background:var(--krem)">${t}</span>`).join("")}
            <span class="cip zum" style="font-size:28px;letter-spacing:0;padding:16px 28px">girişimciler yetiştirir</span></div>
        </div></div>
      ${karikatur("K10_salon_carsi", "", "YETİŞTİRDİĞİM GİRİŞİMCİLER", "Var. Ve <em>cuma günü</em> bu salon da listeye eklenecek.", 4, 5, 420, 100, 2)}
      ${karikatur("K16_milyoner", "", "SÖZ: UYGULARSANIZ", "Bu haftanın notları, <em>uygulanırsa</em> böyle büyür. Uygulanmazsa… yarın anlatırım.", 5, 6, 420, 100, -2)}
      <div class="ab adim" data-a="6" style="left:0;top:0;width:1px;height:1px"></div>` },
  // 2 ─ FİLM 1 · 28
  { tur: "film", bolum: 0, sure: 31, video: "video/F1.mp4", poster: "video/F1.jpg", olcut: ["Etkileyici giriş (HİŞT): Heyecan", "Görsel ve işitsel araçlar"],
    not: `[Film kendiliğinden başlar (~31 sn, Emmett anlatıyor). Sen salona dön; kendi konularını duyunca gülümseyecekler. Film bitince TIKLA.]` },

  // 3 ─ 28 GİRİŞİM + EL KALDIRMA
  { tur: "normal", bolum: 0, sure: 14, kunye: false, olcut: ["Etkileyici giriş (HİŞT): Tepki (el kaldırma)", "Dinleyicilerle etkileşim", "Dinleyici ihtiyaçlarına uygunluk"],
    not: `Evet: bu salonda yirmi sekiz konu, yirmi sekiz girişim var. [TIKLA — benden öncekiler yanar]
Benden öncekilerin her biri bir derdin peşindeydi. [TIKLA]
Bir el kaldıralım: Kendini girişimci sayan? [elini kaldır, say: "iki… üç…"] [TIKLA]
Peki bir derdi çözmek için kendi başına bir şey kuran? Bir kulüp, bir kermes… [eller kalkar] İşte o eller girişimci elleri. [TIKLA]`,
    fon: `<div class="kagit"></div>`,
    html: `<div class="ab baslik" style="left:96px;top:96px;font-size:104px">Bu salonda <em>28 girişim</em> var.</div>
      <div class="ab adim" data-a="1" style="left:96px;top:222px"><span class="cip zum" style="letter-spacing:.06em">✓ BENDEN ÖNCEKİ 13 SUNUM</span> <span class="kucuk" style="margin-left:14px;font-size:24px">ve sırada 14 girişim daha</span></div>
      ${izgara(false, 290)}
      <div class="ab adim" data-a="2" data-son="3" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.45)"><div class="soru kart" style="padding:56px 80px;text-align:center;width:1250px">
        <span class="cip dom">EL KALDIRALIM</span><div class="baslik" style="font-size:96px;margin-top:28px">Kendini girişimci sayan?</div></div></div>
      <div class="ab adim" data-a="3" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.45)"><div class="soru kart" style="padding:56px 80px;text-align:center;width:1400px">
        <span class="cip dom">BİR DAHA</span><div class="baslik" style="font-size:84px;margin-top:28px">Bir derdi çözmek için<br>kendi başına bir şey kuran?</div></div></div>` },

  // 4 ─ TANIM + 3 KELİME + SÖZ
  { tur: "normal", bolum: 0, sure: 25, kunye: false, olcut: ["Konu çerçevesi ve anlaşılabilirlik", "Kazanım"],
    not: `Öğretmenler odasında girişim fikri böyle karşılanır: "Önce çayını iç, geçer." [bekle] Geçmiyor. [TIKLA]
Çünkü girişim şirket kurmak değil: bir derdi, birinin bedel ödemeye razı olduğu bir çözüme dönüştürmek. [TIKLA]
Üç kelime: Dert, Deney, Değer. [parmakla say] Yapay zekânın hangisini ucuzlattığını, hangisine dokunamadığını da göreceğiz. [TIKLA]
Sözüm şu: Bu salondan çıkarken her biriniz kendi sunum konunuzdan bir girişim fikri çıkarabileceksiniz. [TIKLA]`,
    fon: `<div class="kagit"></div>` + fon("B04_uc_tabela", 2, null, false),
    html: `${karikatur("K05_cay_gecer", "", "ÖĞRETMENLER ODASI", "— Hocam, bir girişim fikrim var.<br>— Önce çayını iç, <em>geçer.</em>", 0, 1, 420, 100, -2)}
      <div class="ab adim" data-a="1" data-son="2" style="left:110px;top:150px;width:1700px">
        <span class="etiket"><i></i>Girişim nedir?</span>
        <div class="baslik" style="font-size:118px;margin-top:40px;line-height:1.02">Bir <em>derdi</em>, birinin <span style="background:var(--saf);padding:0 18px;border-radius:16px">bedel ödemeye</span> razı olduğu bir <span style="color:var(--zum)">çözüme</span> dönüştürmek.</div></div>
      <div class="ab adim" data-a="2" style="left:0;top:0;width:1920px;height:1080px">
        <div class="ab" style="left:0;right:0;top:52px;text-align:center"><span class="cip" style="font-size:28px;padding:16px 36px">7 DAKİKA · 3 KELİME</span></div>
        ${tabelaYazi(["var(--dom)", "var(--zum)", "#C27A12"], ["Dert", "Deney", "Değer"])}</div>
      <div class="ab adim" data-a="3" style="left:110px;top:840px;width:1700px"><div class="vurgu" style="font-size:38px;width:1700px"><em>Sözüm:</em> Çıkarken her biriniz kendi sunum konunuzdan bir girişim fikri çıkarabileceksiniz.</div></div>` },

  // 5 ─ DERT · BENİM DERDİM: PADİŞAH KARTLARI (klasik çözümler vs girişim)
  { tur: "normal", bolum: 1, sure: 55, olcut: ["Konu çerçevesi (tanımın uygulanışı)", "Konuya hâkimiyet (kendi vakası)", "Dinleyici ihtiyaçlarına uygunluk", "Motivasyon"],
    not: `Birinci kelime: Dert. Benim derdimden başlayayım; sizinki de olabilir: çocuklar tarihten kopuk. Hepimiz tarihini bilsin, sevsin istiyoruz. [TIKLA]
Klasik çözümümüz bir: çocukları karşımıza alırız, Fatih'in faziletlerini anlatırız. [TIKLA]
İki: okuldan izin, belediyeden otobüs, dernekten sandviç; bir gün tarihî mekânlara gezi. [TIKLA]
İkisi de çok kıymetli, bol sevaplı. Ama bir soru: bedeli kim ödüyor? [salona bak] [TIKLA]
Siz. Mesainizle, enerjinizle. Sizin dışınızda kimse bedel ödemediği için buna girişim demiyoruz; o yüzden sürekliliği de olmuyor. [TIKLA]
Ben aynı derde başka bir çözüm denedim: Osmanlı Padişahları kart seti. Otuz altı padişah; önde sevimli bir resim ve tek cümle, arkada hayatından dört satır. Tek başına bilgi kartı, iki kişiyle oyun kartı. [TIKLA]
Bedelini kim ödüyor? Veli. Dert var, çözüm var, bedel ödemeye razı biri var: işte girişim. Bu bakış açısı için buradasınız. [TIKLA]`,
    fon: `<div class="kagit"></div>`,
    html: `${etiket("1 · Dert · Benim derdim")}
      <div class="ab adim" data-a="0" data-son="5" style="left:110px;top:210px;width:1000px"><div class="baslik" style="font-size:118px;line-height:1">Çocuklar<br>tarihten <em>kopuk.</em></div><div class="govde" style="margin-top:22px">Hepimizin derdi: tarihini bilsin, sevsin.</div></div>
      ${karikatur("K14_sohbet", "", "KLASİK ÇÖZÜM 1", "Çocukları karşımıza alalım, Fatih'in faziletlerini anlatalım.", 1, 5, 820, 80, 2, 880)}
      ${karikatur("K15_gezi", "", "KLASİK ÇÖZÜM 2", "Belediyeden otobüs, dernekten sandviç, <em>bir gün</em> gezi.", 2, 5, 980, 420, -2, 880)}
      <div class="ab adim" data-a="3" data-son="5" style="left:110px;top:560px;width:680px"><div class="vurgu" style="font-size:40px;line-height:1.25">İkisi de kıymetli, sevaplı.<br><em>Bedeli kim ödüyor?</em></div>
        <div class="adim" data-a="4" data-son="5" style="margin-top:20px"><div class="vurgu" style="font-size:34px;line-height:1.3;background:var(--dom)">Siz. Mesainizle, enerjinizle.<br>Başkası ödemeyince <em style="color:var(--beyaz)">girişim değil</em>; sürekliliği de yok.</div></div></div>
      <div class="ab adim" data-a="5" style="left:110px;top:210px;width:760px">
        <span class="cip zum" style="font-size:24px">BENİM ÇÖZÜMÜM</span>
        <div class="baslik" style="font-size:78px;line-height:1;margin-top:26px">Osmanlı Padişahları<br><em>Kart Seti</em></div>
        <div class="govde" style="margin-top:24px;font-size:34px">36 padişah · önde bir cümle, arkada dört satır<br><b>bilgi kartı</b> + <b>oyun kartı</b></div></div>
      <div class="ab adim" data-a="5" style="left:900px;top:110px;width:900px;height:900px">
        ${[["osman_on",0,90,-14],["kanuni_on",160,45,-7],["fatih_on",320,25,0],["bayezid2_on",480,45,7],["fatih_arka",640,90,14]].map(([g,x,y,r])=>`<img src="img/padisah/${g}.jpg" style="position:absolute;left:${x}px;top:${y}px;width:270px;border-radius:14px;box-shadow:0 30px 70px rgba(27,34,56,.35);transform:rotate(${r}deg);transform-origin:50% 120%">`).join("")}</div>
      <div class="ab adim cak" data-a="6" style="left:110px;top:760px;width:820px"><div class="vurgu" style="font-size:38px;line-height:1.3">Bedelini kim ödüyor? <em>Veli.</em><br>Dert + çözüm + bedel ödeyen = <em>girişim.</em></div></div>` },
  // 6 ─ DERT · %42
  { tur: "normal", bolum: 1, sure: 24, olcut: ["Dinleyicilerle etkileşim", "Konuya hâkimiyet (veri)"],
    not: `Peki dert yoksa? Halime Hocam'ın alanından acı bir rakam: Batan girişimlerin bir numaralı sebebi sizce ne? [salondan 2 cevap] [TIKLA]
Batan yüz bir girişimin kurucuları yazmış: yüzde kırk ikisinin ürününe pazarda ihtiyaç yokmuş. [TIKLA]
[karikatür] Ürünümüz mükemmeldi; sadece müşteri eksikti. [TIKLA]
Yapay zekâ bunu daha tehlikeli yaptı: ihtiyaç olmayan ürün artık bir haftada çıkıyor. Hız yön değildir. [TIKLA]`,
    fon: fon("A07_kepenk") + `<div class="perde-sol"></div>`,
    html: `${etiket("1 · Dert")}${selam(6, "Halime Hocam'ın konusu: <b>Ekonomi</b>")}
      <div class="ab baslik" style="left:110px;top:300px;width:900px;font-size:104px">Batan girişimlerin<br><em>1 numaralı</em> sebebi?</div>
      <div class="ab adim" data-a="0" data-son="1" style="left:110px;top:590px;display:flex;gap:18px;flex-wrap:wrap;width:820px">
        ${["Para bitti?", "Rakip ezdi?", "Başka bir şey?"].map(t => `<span class="cip acik" style="font-size:34px;letter-spacing:0;padding:18px 34px;box-shadow:0 10px 30px rgba(27,34,56,.12)">${t}</span>`).join("")}</div>
      <div class="ab adim" data-a="1" style="left:110px;top:560px;width:860px">
        <div style="display:flex;align-items:flex-end;gap:26px"><div class="baslik" style="font-size:210px;color:var(--dom);line-height:.8">%42</div>
          <div class="govde" style="padding-bottom:12px">Ürüne pazarda<br><b>ihtiyaç yoktu.</b></div></div>
        <div class="kucuk" style="margin-top:22px;font-size:22px">Sonrakiler: para bitti %29 · ekip uygun değildi %23 · rakip geçti %19<br>CB Insights · batan 101 girişimin kendi "otopsi" yazıları · 2014</div></div>
      ${karikatur("K07_mukemmel_urun", "", "KEPENKTEKİ NOT", "“Ürünümüz mükemmeldi.<br>Sadece <em>müşteri</em> eksikti.”", 2, 3, 760, 110, 2, 1040)}
      <div class="ab adim cak" data-a="3" style="left:110px;top:820px;width:900px"><div class="vurgu" style="font-size:36px;line-height:1.3">Yapay zekâ ihtiyaç olmayan ürünü de hızlandırır. <em>Hız yön değildir.</em></div></div>` },

  // 7 ─ DENEY · DROPBOX
  { tur: "normal", bolum: 2, sure: 28, olcut: ["Konuya hâkimiyet", "Akıcılık ve tutarlılık"],
    not: `İhtiyaç var mı, nasıl anlarız? Çoğumuz böyle: [karikatür] Pazar araştırması: katılımcı annem, sonuç "çok güzel olmuş". [gülüşme] [TIKLA]
İkinci kelime, Ahmet Hocam'ın konusu: Deney. 2008, Dropbox ürünü açmadan üç dakikalık bir video yayınlıyor: "Böyle bir şey olsa kullanır mıydınız?" [TIKLA]
Bekleme listesi bir gecede beş binden yetmiş beş bine. [TIKLA]
Fabrikayı kurmadan tabelayı astılar: pahalı hatadan önce ucuz deney. [TIKLA]
Peki bugün o tabelayı kim asıyor, kaça? [TIKLA]`,
    fon: fon("A08_tabela_kuyruk") + `<div class="perde-sol"></div>`,
    html: `${etiket("2 · Deney")}${karikatur("K06_pazar_arastirmasi", "", "PAZAR ARAŞTIRMASI", "Katılımcı: annem. Sonuç: <em>“çok güzel olmuş.”</em> n = 1", 0, 1, 420, 100, -2)}
      <div class="ab adim" data-a="1" style="left:0;top:0;width:1920px;height:1080px">${selam(0, "Ahmet Hocam'ın konusu: <b>Deney</b>")}
      <div class="ab baslik" style="left:110px;top:300px">Önce tabela.</div>
      <div class="ab govde" style="left:110px;top:470px;width:800px">2008. <b>Dropbox</b> ürününü herkese açmadan önce <b>üç dakikalık bir video</b> yayınlıyor.</div>
      </div>
      <div class="ab adim" data-a="2" style="left:110px;top:650px;width:860px">
        <div style="display:flex;align-items:baseline;gap:22px"><span class="baslik" style="font-size:96px;color:rgba(27,34,56,.35)">5.000</span><span class="baslik" style="font-size:80px;color:var(--zum)">→</span><span class="baslik" style="font-size:130px;color:var(--zum)">75.000</span></div>
        <div class="kucuk" style="font-size:26px;margin-top:6px">bekleme listesi · bir gecede</div></div>
      <div class="ab adim cak" data-a="3" style="left:110px;top:850px;display:flex;gap:18px;align-items:center"><div class="vurgu" style="font-size:38px">Pahalı hatadan önce <em>ucuz deney.</em></div>
        <span class="cip zum">KONUŞ</span><span class="cip zum">SOR</span><span class="cip zum">ÖN SİPARİŞ AL</span></div>
      <div class="ab adim" data-a="4" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.45)"><div class="soru kart" style="padding:56px 80px;text-align:center;width:1300px"><span class="cip zum">2026</span><div class="baslik" style="font-size:92px;margin-top:28px">Bugün o tabelayı<br>kim asıyor, <em>kaça</em> asıyor?</div></div></div>` },

  // 8 ─ DENEY · KARTLARIN RESİMLERİ (yapay zekâ = deneyin fiyatı) + AMA
  { tur: "normal", bolum: 2, sure: 24, olcut: ["Konuya hâkimiyet (kendi vakası)", "Akıcılık ve tutarlılık", "Motivasyon"],
    not: `Cevabı yine kart setinden vereyim. Otuz altı padişah, otuz altı resim. [TIKLA] Eskiden bunun için bir illüstratör, bir ajans ve aylar gerekirdi; ben çizemem. Bu resimlerin hepsini yapay zekâyla, kendi masamda ürettim. [TIKLA]
Yapay zekâ bana yetenek vermedi; parası ve çevresi olanların erişebildiği araçları masama getirdi. Girişimin giriş ücretini düşürdü. [TIKLA]
Ama… sizin için kolaylaşan herkes için kolaylaştı. Teknoloji kopyalanır; insanı anlamak kopyalanmaz. O zaman insanı anlayalım: sıra sizde. [TIKLA]`,
    fon: fon("B07_atolye_masa") + `<div class="perde-sol"></div>`,
    html: `${etiket("2 · Deney · Yapay zekâ")}
      <div class="ab" style="left:110px;top:220px;width:860px"><div class="baslik" style="font-size:104px;line-height:1">36 padişah,<br>36 <em>resim.</em></div>
        <div class="adim govde" data-a="1" style="margin-top:30px;font-size:36px;line-height:1.45"><span style="color:rgba(27,34,56,.5)">Eskiden:</span> illüstratör, ajans, aylar.<br><span style="color:rgba(27,34,56,.5)">Bugün:</span> <b>yapay zekâ ve bir masa.</b> Ben çizemem.</div>
        <div class="adim cak" data-a="2" style="margin-top:40px"><div class="vurgu" style="font-size:38px">Yapay zekâ girişimin <em>giriş ücretini</em> düşürdü.</div></div></div>
      <div class="ab" style="left:1000px;top:120px;width:860px;height:860px">
        ${[["osman_on",0,70,-12],["kanuni_on",150,30,-6],["fatih_on",300,10,0],["bayezid2_on",450,30,6],["gencosman_on",600,70,12]].map(([g,x,yy,r])=>`<img src="img/padisah/${g}.jpg" style="position:absolute;left:${x}px;top:${yy}px;width:250px;border-radius:14px;box-shadow:0 30px 70px rgba(27,34,56,.35);transform:rotate(${r}deg);transform-origin:50% 120%">`).join("")}
        <div class="adim" data-a="1" style="position:absolute;left:0;right:0;top:560px;text-align:center"><span class="cip zum" style="font-size:26px;letter-spacing:.1em">İLLÜSTRATÖR YOK · AJANS YOK</span></div></div>
      <div class="ab adim" data-a="3" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.55)"><div class="soru kart" style="padding:56px 80px;text-align:center;width:1400px"><span class="cip dom">AMA…</span><div class="baslik" style="font-size:84px;margin-top:28px;line-height:1.05">Sizin için kolaylaşan,<br>herkes için kolaylaştı.</div><div class="govde" style="margin-top:24px">Teknoloji kopyalanır. <b>İnsanı anlamak kopyalanmaz.</b></div></div></div>` },
  // 9 ─ SIRA SİZDE
  { tur: "normal", bolum: 0, sure: 24, kunye: false, olcut: ["Dinleyicilerle etkileşim", "Konuya hâkimiyet", "Kritik sorulara yanıt"],
    not: `Kursun ilk ödevi hemen şimdi: Sıra sizde. Bir konu söyleyin; on saniyede derdini, deneyini, değerini bulalım. [S tuşu ya da sağ üstteki halka: 10 sn]
[Salondan gelen konunun KAROSUNA TIKLA → kart açılır. Kartı kendi cümlenle oku.]
Örnek — Etli ekmek: Dert: Gurbetteki Konyalı etli ekmeği özlüyor, kargoda bayatlıyor. Deney: Şoklanmış yirmi paketlik ön sipariş. Değer: Memleket özlemi; insan bunun için seve seve öder.
[Karta tıkla → ızgara. TEK konu yeter; süre bol değil. Boş bir yere TIKLA → devam.]
Kimse söylemezse: "Yunus Hocam, etli ekmeği açalım mı?" — sonra senden önceki bir hocanın konusunu seç (ör. Lale Hocam'ın Uzay'ı).`,
    fon: `<div class="kagit"></div>`,
    html: `<div class="ab baslik" style="left:96px;top:86px;font-size:120px">Sıra sizde.</div>
      <div class="ab govde" style="left:100px;top:216px;font-size:34px">Bir konu söyleyin → <b>10 saniyede</b> &nbsp;<span class="cip dom" style="font-size:20px">DERT</span> <span class="cip zum" style="font-size:20px">DENEY</span> <span class="cip saf" style="font-size:20px">DEĞER</span></div>
      <div id="sayac"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="66" fill="#FFFBF4" stroke="rgba(27,34,56,.12)" stroke-width="10"/>
        <circle class="yay" cx="75" cy="75" r="66" fill="none" stroke="#D9472B" stroke-width="10" stroke-linecap="round" stroke-dasharray="414.7" stroke-dashoffset="0" transform="rotate(-90 75 75)" style="transition:stroke-dashoffset .9s linear"/></svg><div class="sy">10</div></div>
      ${izgara(true, 300)}` },

  // 10 ─ DEĞER · KAHVE
  { tur: "normal", bolum: 3, sure: 10, olcut: ["Konuya hâkimiyet", "Dinleyici ihtiyaçlarına uygunluk", "Akıcılık ve tutarlılık"],
    not: `Üçüncü kelime: Değer. 1871, Tahtakale: Mehmet Efendi kahveyi kavurup öğütüp kâğıda sarıyor: Kurukahveci. [TIKLA] Kahve aynı kahve; sattığı şey zahmetten kurtulmak. [TIKLA]
Ama değerin görünmeyen bir yüzü var. Sekiz yüz yıl önce, bir Ahi çarşısı… [TIKLA → film]`,
    fon: fon("A09_tahtakale_1871", 0, 2) + `<div class="perde-sol"></div>` + fon("D01_ahi_carsi", 2) + `<div class="perde-koyu adim" data-a="2"></div>`,
    html: `${etiket("3 · Değer")}${selam(7, "Hatice Hocam'ın konusu: <b>Ticaret</b>", 0, 2)}
      ${blok(0, 2, "Hazır kahve.", "1871, Tahtakale. Herkes çiğ kahve alıp evde kavuruyor, dövüyor. Mehmet Efendi kavurup öğütüp <b>kâğıda sararak</b> satıyor: <b>Kurukahveci.</b>", 300, 820, 140)}
      <div class="ab adim" data-a="1" data-son="2" style="left:110px;top:770px;width:860px"><div class="vurgu" style="font-size:36px">Kahve aynı kahve. Sattığı şey: <em>zahmetten kurtulmak.</em></div>
        <div class="govde" style="margin-top:22px;font-size:34px">İnsan ürünü değil, <b>ürünün kazandırdığını</b> satın alır.</div></div>
      <div class="ab adim" data-a="2" style="left:0;right:0;top:360px;text-align:center"><div class="baslik" style="font-size:120px;color:var(--beyaz);line-height:1.02">Ama değerin bir de<br><span style="color:var(--saf)">görünmeyen yüzü</span> var…</div></div>` },

  // 11 ─ FİLM 2 · PABUCU DAMA ATILDI
  { tur: "film", bolum: 3, sure: 38, video: "video/F2.mp4", poster: "video/F2.jpg", olcut: ["Görsel ve işitsel araçlar", "Motivasyon ve ilgi çekicilik"],
    not: `[Film kendiliğinden başlar (~38 sn, Emmett anlatıyor). Taban kopunca ve pabuç dama düşünce salon güler — bekle. Film bitince TIKLA.]` },

  // 12 ─ GÜVEN
  { tur: "normal", bolum: 3, sure: 18, olcut: ["Dinleyici ihtiyaçlarına uygunluk", "Konuya hâkimiyet (kaynak)", "Akıcılık (kitaba köprü)"],
    not: `Peygamber Efendimiz (sallallâhu aleyhi ve sellem) buyuruyor: [yavaş, tane tane]
"Doğru sözlü, güvenilir tüccar; peygamberler, sıddîklar ve şehitlerle beraberdir." [TIKLA]
Girişimin en büyük sermayesi para değil, güvendir. Güveni yapay zekâ sizin yerinize kazanamaz; güvenilir olmak da kendini tanımakla başlar. O, bu kursun başka bir dersi. [TIKLA]`,
    fon: fon("B01_terazi") + `<div class="perde-sol"></div>`,
    html: `${etiket("3 · Değer · Güven")}
      <div class="ab" style="left:110px;top:220px;width:860px">
        <div class="baslik" style="font-size:240px;color:var(--saf);line-height:.6;height:120px">“</div>
        <div class="baslik" style="font-size:76px;line-height:1.1">Doğru sözlü, güvenilir tüccar; peygamberler, sıddîklar ve şehitlerle beraberdir.</div>
        <div class="kucuk" style="margin-top:28px;font-size:26px;color:rgba(27,34,56,.7)">Peygamber Efendimiz (s.a.v.) · Tirmizî, Büyû', 4</div></div>
      <div class="ab adim cak" data-a="1" style="left:110px;top:840px"><div class="vurgu" style="font-size:40px">Girişimin en büyük sermayesi para değil: <em>güven.</em></div></div>` },

  // 13 ─ TOPARLAYALIM
  { tur: "normal", bolum: 0, sure: 26, kunye: false, olcut: ["Sunumun bitişi (özet)", "Akıcılık ve tutarlılık", "Dinleyicilerle etkileşim"],
    not: `Toparlayalım. [tabelaları göster] Dert: kimin canı yanıyor? Deney: en ucuz nasıl denerim? Değer: neden bedel öder, bana neden güvenir? [TIKLA]
Yapay zekâ yalnız deneyi ucuzlattı. Derdi bulmak, güven ve kendini tanımak hâlâ bizim işimiz. Giriş ücreti düştü; kalite ücreti duruyor. [TIKLA]
Bir yıl sonra ikinizden biri olacaksınız. [TIKLA — iki kare] Aynı defter: birinde raf tozu, diğerinde sipariş kutuları. Fark yetenek değil; uygulamak. [TIKLA]
Yedi günün sonunda bir derdi çözerken bedelini kimin ödeyeceğini de çözümün parçası yapacaksınız. O gün adınız girişimci olacak. Kendi konusunda bir dert bulan, el kaldırsın. [eller — gülümse] [TIKLA]`,
    fon: fon("B04_uc_tabela", null, null, false),
    html: `<div class="ab" style="left:0;right:0;top:52px;text-align:center"><span class="cip" style="font-size:28px;padding:16px 36px">TOPARLAYALIM</span></div>
      ${tabelaYazi(["var(--dom)", "var(--zum)", "#C27A12"], ["Dert", "Deney", "Değer"], ["Kimin canı yanıyor?", "En ucuz nasıl denerim?", "Neden bedel öder, güvenir?"])}
      <div class="ab adim" data-a="1" data-son="2" style="left:0;right:0;top:880px;text-align:center"><div class="vurgu" style="font-size:36px"><span style="color:var(--saf)">Yapay zekâ ucuzlattı:</span> deney. &nbsp;·&nbsp; <span style="color:var(--saf)">Ucuzlatamadığı:</span> dert, güven, kendini tanımak.</div>
        <div class="kucuk" style="color:rgba(255,251,244,.95);font-size:30px;margin-top:14px;text-shadow:0 2px 12px rgba(27,34,56,.6)">Giriş ücreti düştü; <b>kalite ücreti duruyor.</b></div></div>
      <div class="ab adim" data-a="2" data-son="3" style="left:0;top:0;width:1920px;height:1080px;background:rgba(27,34,56,.55)"></div>
      ${karikatur("K11_uygulamayan", "", "BİR YIL SONRA · UYGULAMAYAN", "Defter rafta. <em>Toz</em> bile not almış.", 2, 3, 60, 150, -2, 880)}
      ${karikatur("K12_uygulayan", "", "BİR YIL SONRA · UYGULAYAN", "Aynı defter, <em>açık.</em> Kapıda kuyruk.", 2, 3, 980, 150, 2, 880)}
      <div class="ab adim cak" data-a="3" style="left:0;right:0;top:920px;text-align:center"><div class="vurgu" style="background:var(--dom);font-size:40px">Kendi konunuzda bir dert bulan, el kaldırsın.</div></div>` },

  // 14 ─ KAPANIŞ
  { tur: "normal", bolum: 0, sure: 20, kunye: false, olcut: ["Sunumun bitişi", "Motivasyon ve ilgi çekicilik"],
    not: `Necmettin Hocam şiir anlattı; ben de Yunus'la bitireyim: [yavaş] "Gelin tanış olalım, işi kolay kılalım." İşi kolay kılmak, girişimin ta kendisi. [TIKLA]
Başta size bir salon göstermiştim; işte o salon. "Bu salonda yirmi sekiz girişim var" demiştim. Yanlış söylemişim. [TIKLA]
Bu salonda yirmi sekiz girişimci var. [arkada salon çarşıya dönmüş — 2 sn sus] [TIKLA]
Birinci ders bitti; yarın ikinci ders. Kart seti ve kitap şu masada; site, Instagram ve YouTube ekranda. [tebessüm] Teşekkür ederim. [Soru gelirse: Kritik_Sorular.md]`,
    fon: fon("A02_kapanis_gece") + `<div class="fon adim" data-a="1" style="background-image:url('img/karikatur/K10_salon_carsi.jpg')"></div><div class="ab" style="inset:0;background:linear-gradient(180deg, rgba(20,24,40,.82) 0%, rgba(20,24,40,.5) 45%, rgba(20,24,40,.12) 75%)"></div>`,
    html: `<div class="ab adim" data-a="0" data-son="1" style="left:0;right:0;top:150px;text-align:center">
        <span class="selam"><img src="${IK(12)}">Necmettin Hocam'ın konusu: <b>Şiir</b></span>
        <div class="baslik" style="font-size:110px;color:var(--beyaz);margin-top:46px;line-height:1.05">“Gelin tanış olalım,<br><span style="color:var(--saf)">işi kolay kılalım.</span>”</div>
        <div class="govde" style="color:rgba(255,251,244,.8);margin-top:24px">Yunus Emre</div></div>
      <div class="ab adim" data-a="1" style="left:0;right:0;top:190px;text-align:center">
        <div class="baslik" style="font-size:150px;color:var(--beyaz);line-height:1.02">Bu salonda<br><span style="color:var(--saf)">28 girişim<span class="adim ek" data-a="2" style="color:var(--dom);background:var(--beyaz);border-radius:18px">ci</span></span> var.</div></div>
      <div class="ab adim" data-a="3" style="left:0;right:0;top:660px;text-align:center"><span class="cip acik" style="font-size:30px;padding:14px 40px;letter-spacing:.08em">TEŞEKKÜR EDERİM</span></div>
      <div class="ab adim" data-a="3" style="left:0;right:0;top:760px;display:flex;justify-content:center;gap:24px">
        ${[["site","raufenc.com","SİTE"],["instagram","@raufenc","INSTAGRAM"],["youtube","@raufenc","YOUTUBE"]].map(([g,t,b])=>`<div class="kart" style="display:flex;align-items:center;gap:18px;padding:14px 26px 14px 14px;background:rgba(255,251,244,.96)"><img class="qr" src="img/qr/${g}.svg" style="width:230px;height:230px;display:block;border-radius:16px"><div style="text-align:left"><img src="img/qr/${g}_ikon.svg" style="width:44px;height:44px;display:block;margin-bottom:8px"><div class="kucuk" style="font-size:16px;letter-spacing:.18em;color:var(--dom)">${b}</div><div style="font:800 30px Inter;color:var(--mur);margin-top:4px">${t}</div></div></div>`).join("")}</div>` },
];
