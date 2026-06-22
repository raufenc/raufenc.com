// NöroTerbiye — Okuyucu Yorumları (Kitapyurdu + Trendyol + Hepsiburada)
// Son güncelleme: 2026-06-22
const YORUMLAR_DATA = [
  // ── Kitapyurdu (6 yorum) ──
  { yazar: "a-meva", tarih: "07.05.2026", puan: 5, kaynak: "Kitapyurdu", onayli: false, metin: "Kitabı okudum ve nöroloji, ahlak ve bilim sahalarında yazılmış disiplinlerarası bir çalışma olmasının yanı sıra her yaştan insana nefsin biyolojisini öğreten, misallerle açıklayan muazzam bir çalışma. Aynı zamanda Rauf Enç'in youtube sohbetleri de mutlaka Halat Medya üzerinden takip edilmesi gerekiyor. Teşekkürler." },
  { yazar: "Adem Boz", tarih: "07.04.2026", puan: 5, kaynak: "Kitapyurdu", onayli: false, metin: "Kitabı okudum, günümüzde pek çok insan nefsini terbiye etmek için bir yol arıyor, nereden nasıl başlasam diye bu kitap bu yolda size rehber olacaktır inşallah." },
  { yazar: "takmaatsız", tarih: "04.03.2026", puan: 5, kaynak: "Kitapyurdu", onayli: true, metin: "Beyin, nörobiyoloji, sindirim sistemi, sağlıklı beslenme, irade terbiyesi vs üzerine yazılmış Serkan İsmailoğlu, Oytun Erbaş, Canan Karatay vb yazarlara ait toplam on tane kitap okumuşumdur. Bunları ve benzeri bilimsel kitapları, özümüze hitap eden Gazali, İmam Rabbani rahimullah gibi referans İslam âlimlerinin nefs ve terbiyesi konusuyla ilgili eserlerine harmanlayarak ortaya hap gibi bilgi ve çözüm sunan mükemmel bir kitap çıkarmış. Yani günümüz anlayışına hitap eden üslupla, onlarca kitaba bedel bir hülasa olmuş, keşke 3-5 sene önce yazsaydı da bunca kitabı okuma zahmetinden kurtulsaydık. Umarım okuyanlara istifade etmek yani uygulamak nasip olur. Şiddetle tavsiye edilir." },
  { yazar: "Yasin Arı", tarih: "04.03.2026", puan: 5, kaynak: "Kitapyurdu", onayli: true, metin: "Ufuk açan bir eser tavsiye ile aldım iyi ki almışım." },
  { yazar: "Fatih İlhan", tarih: "26.01.2026", puan: 5, kaynak: "Kitapyurdu", onayli: false, metin: "Dili çok akıcı ve açıklayıcı. Kitap sadece nörobiyoloji bilgisi vermekle kalmıyor bunu ahlaki çerçevede inceliyor. Emeği geçenlerin yüreğine sağlık." },
  { yazar: "Üsküplüsehzade", tarih: "26.01.2026", puan: 5, kaynak: "Kitapyurdu", onayli: false, metin: "Kitabı baştan sona okudum. Kendinizi (nefsimizi) tanımak adına mükemmel bir kitap. Keşke daha önce okusaydım." },

  // ── Trendyol (9 yorum) ──
  { yazar: "Trendyol Alıcısı", tarih: "23.07.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Tam ihtiyacım olan bilgiler çok güzel bir rehber. Herkes okumalı. Yılların tecrübesiyle kaleme alınmış, her satırı yaşanarak yazılmış. Yazara başarıların devamını dilerim, artık sürekli takipçisiyim." },
  { yazar: "Trendyol Alıcısı", tarih: "24.04.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Kitap çok tavsiye edildi. Emeği geçenlere sonsuz teşekkürler." },
  { yazar: "A** H**", tarih: "01.08.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Kesinlikle tam bir baş ucu kitabı." },
  { yazar: "b** c**", tarih: "24.08.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Çok güzel kitap." },
  { yazar: "E** A**", tarih: "21.04.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Tam aradığım kitap nefs terbiyesi üzerinde durulmuş akıcı bir dilde yazılmış." },
  { yazar: "Trendyol Alıcısı", tarih: "20.04.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Okumaya başladım iyi gidiyor beğendim." },
  { yazar: "Trendyol Alıcısı", tarih: "10.05.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Böyle kitaplar artmalı." },
  { yazar: "Trendyol Alıcısı", tarih: "15.06.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Çok faydalı bir kitap, tavsiye ederim." },
  { yazar: "Y** A** K**", tarih: "02.06.2025", puan: 5, kaynak: "Trendyol", onayli: true, metin: "Başı sıkıcı gibi gelse de sonradan güzel." },

  // ── Hepsiburada (4 yorum) ──
  { yazar: "B**** Ç****", tarih: "12.03.2026", puan: 5, kaynak: "Hepsiburada", onayli: true, metin: "Okunması hayata bakışını değiştirir. İnsanı okumuş oluyorsunuz." },
  { yazar: "Ö**** Ö****", tarih: "29.10.2025", puan: 5, kaynak: "Hepsiburada", onayli: true, metin: "Bilim ve ilimi bir arada yürütmeye çalışan, çok faydalı bir kitap. Özellikle eğitimcilerin, anne babaların okuması faydalıdır." },
  { yazar: "h**** t****", tarih: "22.03.2026", puan: 5, kaynak: "Hepsiburada", onayli: true, metin: "Faydalandığım kıymetli bir eser. Tavsiye ederim." },
  { yazar: "A**** T****", tarih: "23.03.2026", puan: 5, kaynak: "Hepsiburada", onayli: true, metin: "Harika bir kitap" },
];
