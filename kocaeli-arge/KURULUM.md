# Kocaeli MEM AR-GE Portalı — kurulum ve işletme notları

Uygulama `https://raufenc.com/kocaeli-arge/` adresinde PWA olarak çalışır (telefonda "Ana ekrana ekle").
Yönetici paneli: `https://raufenc.com/kocaeli-arge/yonetim/`

## Çalışma modları
| | Demo (varsayılan) | Canlı |
|---|---|---|
| Kimlik | Demo hesap, PIN'li yönetici | Google ile giriş, e-posta ile yönetici |
| İçerik | `data/seed.json` + tarayıcı belleği | Firestore `icerik/*` belgeleri (anlık) |
| Beğeni / yorum / görüntülenme | Bu cihazda | Firestore `sosyal/*` (tüm kullanıcılar) |
| Push bildirim | Uygulama içi bildirim merkezi | FCM web push + uygulama içi |
| Haber / video akışı | Canlı (`/api/arge-feed`) | Canlı (`/api/arge-feed`) |
| Yapay zekâ | `/api/arge-asistan` (sunucu anahtarı) | aynı |

Demo modda Firebase gerekmez; tüm ekranlar ve yönetici paneli çalışır.

## Canlı moda geçiş (yaklaşık 15 dakika)
1. console.firebase.google.com → **proje oluştur** (ör. `kocaeli-arge`), konum `europe-west`.
2. **Web uygulaması ekle** → çıkan `firebaseConfig` değerlerini `js/config.js` → `FIREBASE_CONFIG` içine yapıştır.
3. **Authentication → Sign-in method → Google** etkinleştir. *Settings → Authorized domains* listesine `raufenc.com` ekle.
4. **Firestore Database → Create** (production). *Rules* sekmesine `firestore.rules` içeriğini yapıştır.
5. Firestore'da `yoneticiler` koleksiyonu oluştur; belge kimliği = yönetici Google e-postası (ör. `halatmedya@gmail.com`), içeriği `{ rol: "admin" }`.
   `js/config.js` → `ADMIN_EMAILS` listesine de aynı e-postaları yaz.
6. **Storage → Get started**; *Rules* sekmesine `storage.rules` içeriğini yapıştır (yönetici e-postalarını güncelle).
7. **Cloud Messaging → Web configuration → Web Push certificates → Generate key pair** → anahtarı `js/config.js` → `VAPID_KEY` içine yapıştır.
8. Push gönderimi için: *Project settings → Service accounts → Generate new private key* (JSON). Vercel'de ortam değişkenleri:
   - `ARGE_FCM_SERVICE_ACCOUNT` = JSON'un tamamı (ya da base64'ü)
   - `ARGE_ADMIN_TOKEN` = uzun rastgele bir gizli anahtar (yönetici paneli "Bildirim gönder" bunu ister)
9. Yapay zekâ asistanı için Vercel'de `ANTHROPIC_API_KEY` (tercihen) veya `OPENAI_API_KEY`; isteğe bağlı `ARGE_MODEL`.
10. Deploy. İlk girişte yönetici panelinden içerikleri doldur; Firestore `icerik` koleksiyonu boşken uygulama `seed.json` örneklerini gösterir.

## Veri modeli (Firestore)
- `icerik/{koleksiyon}` → `{ items: [...] }` (haberler, duyurular, projeler, etkinlikler, ilceler, kutuphane, videolar, oynatmaListeleri, bannerlar, basvurular, bildirimler) veya nesne (surum, etwinning, tubitak, akademiler, dokumanlar, iletisim, anketler)
- `kullanicilar/{uid}` profil, favoriler, beğeniler, bildirim tercihleri
- `sosyal/{itemId}` `{ begeni, goruntulenme, yorum }` + `yorumlar/{id}`
- `anketCevaplari/{anketId_uid}`, `anketSonuc/{anketId}` `{ sayim, katilim }`
- `pushTokens/{token}` `{ token, uid, topics[] }`

`itemId` kuralı: haberler `k<hash>` / `m<hash>` (RSS bağlantısından), videolar `v<YouTubeId>`, duyurular kendi `id`'si.

## Haber ve video kaynakları
- Kocaeli İl MEM: `kocaeli.meb.gov.tr/meb_iys_dosyalar/xml/rss_duyurular.xml` (haber + duyuru; `<category>` 1 = haber, 2 = duyuru)
- Kocaeli AR-GE: `kocaeliarge.meb.gov.tr/meb_iys_dosyalar/xml/rss_duyurular.xml`
- MEB: `meb.gov.tr` ana sayfa haber kuşağı (RSS yok; sayfa yapısı değişirse `api/arge-feed.js` → `parseMebHome` güncellenir)
- YouTube: kanal RSS'leri (API anahtarı gerekmez); kanal kimlikleri `js/config.js` → `YT_CHANNELS`
  - Kocaeli MEM `UCL15RFYGVnpVVoSeTeZXWTA`, MEB `UC5pivY9xQEn-vWwCW4Okhzw`, EBA `UCCTccDv6cXvwl1-SzfF83Vg`
- Haber detayı uygulama içinde okunur (`/api/arge-feed?src=detail&url=…`; yalnız meb.gov.tr alan adları).

## Sürüm yönetimi
`js/config.js` → `APP_VERSION` uygulama sürümüdür. Yönetici paneli → Sürüm yönetimi ile "son sürüm" ve "en düşük sürüm" ayarlanır; kullanıcıya güncelleme çubuğu çıkar. Yeni dağıtımda `sw.js` → `VERSION` sabitini de artırın.

## Resmîleşme için gerekenler (kurumdan)
- Mağaza yayını ve logo kullanımı için İl MEM resmî yetki yazısı; Apple/Google geliştirici hesapları (kurum adına)
- e-Devlet ve MEBBİS girişi için Türksat / MEB BİDB protokolleri (giriş ekranındaki düğmeler hazır, protokol sonrası bağlanır)
- Kişisel veri barındırma kararı (Firebase yurt dışı; alternatif Türkiye'de sunucu) ve KVKK aydınlatma metni
