/* ============================================================
   BOŞ İÇERİK ŞABLONU — yeni bir Bak Bak klonu için buradan başla.
   1) Bu dosyayı kopyala:  icerik/<yeni-ad>.js
   2) meta + ogeler[] doldur (motor dosyalarına DOKUNMA).
   3) Görselleri koy:      varliklar/<yeni-ad>/<id>.png
   4) Aç:                  index.html?paket=<yeni-ad>
   ------------------------------------------------------------
   NOTLAR
   • En az 4 öğe önerilir (çeldirici çeşitliliği için). 6-12 idealdir.
   • gorsel yoksa emoji yedeği kullanılır — sadece emoji ile de oynanır.
   • soruModu:
       "bilgi"   → hedef için BİLGİ KARTI (ipucu/tanım) gösterilir; çocuk bilgiden
                   hangi simge olduğunu bulur (asıl öğrenme modu — önerilen)
       "resim"   → hedef resim gösterilir, aynı resmi bul (görsel dikkat)
       "kelime"  → hedef KELİME yazılır, doğru resmi bul (kavram-görsel)
       "karisik" → turlar arası bilgi/resim/kelime sırayla döner
     Not: "bilgi" modunda bir öğenin bilgi'si yoksa otomatik "kelime"ye düşer.
     Doğru bulunca cevap (ad+görsel) kısa süre gösterilir → pekiştirme.
   • hedefKelime: kazanmak için toplanacak harf sayısı = tur sayısı.
       "BAK BAK" = 6 tur.  Daha kısa: "BAK".  Daha uzun: "LOOK LOOK".
   ============================================================ */
window.PAKET = {
  meta: {
    id: "ornek-paket",
    ad: "Örnek Paket",
    altBaslik: "Görsel Dikkat Oyunu",
    ders: "Ders adı", sinif: "4-8", unite: "Ünite X",
    surum: "1.0.0",

    kok: "varliklar/ornek-paket/",
    hedefKelime: "BAK BAK",
    soruModu: "bilgi",
    seviyeler: [ { adet: 9 }, { adet: 16 }, { adet: 25 } ]
  },

  // her öğe: id, ad, arapca, gorsel, emoji(yedek), bilgi(ipucu — adı söylemeden tarif et)
  ogeler: [
    { id: "oge1", ad: "Birinci",  arapca: "", gorsel: "oge1.png", emoji: "①", bilgi: "Bu simgeyi adını söylemeden tarif eden ipucu." },
    { id: "oge2", ad: "İkinci",   arapca: "", gorsel: "oge2.png", emoji: "②", bilgi: "..." },
    { id: "oge3", ad: "Üçüncü",   arapca: "", gorsel: "oge3.png", emoji: "③", bilgi: "..." },
    { id: "oge4", ad: "Dördüncü", arapca: "", gorsel: "oge4.png", emoji: "④", bilgi: "..." }
    // ... istediğin kadar öğe ekle
  ]
};
