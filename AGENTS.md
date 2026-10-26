# raufenc.com — basılı kitaplardaki kalıcı bağlantılar

Rauf'un 26 Ekim 2026 talimatı: NöroTerbiye kitabındaki üç QR adresini onar ve bir daha değiştirme. Bu adresler basılı kitaplarda bulunuyor; site yeniden tasarlansa veya başka sunucuya taşınsa da korunur.

| Kalıcı adres | Sabit hedef |
| --- | --- |
| `/neuroterbiye-adalet` | `https://www.youtube.com/watch?v=mZLrfNy2Ia8` |
| `/neuroterbiye-nasilbuhalegeldik` | `https://www.youtube.com/watch?v=LBsY-GBSQwQ` |
| `/neuroterbiye-mhrs` | `https://www.mhrs.gov.tr/` |

- `neuroterbiye` yazımını `noroterbiye` olarak düzeltme; QR kodlarda ilk yazım basılıdır.
- `vercel.json` içindeki altı kuralı (sonunda `/` olan ve olmayan adresler), sabit hedeflerini ve `permanent: true` değerlerini koru. Bu kurallar yönlendirme listesinin başında kalır.
- `scripts/verify-book-qr.mjs`, Vercel `buildCommand`, `.vercelignore` içindeki bu dosyaya ait istisna ve `.github/workflows/book-qr-links.yml` korumalarını kaldırma veya atlatma. Kontrolü geçirmek için beklenen adresleri değiştirme.
- Hedef değişikliği ancak Rauf'un bu bağlantıya yönelik açık yeni talimatıyla yapılabilir; eski basılı adres yine korunur.
- Yayımdan önce `node scripts/verify-book-qr.mjs` ve `node --test tests/book-qr-redirects.test.mjs` çalıştır. Yayından sonra üç gerçek adresin doğru hedefe yönlendiğini kontrol et.
- GitHub `main` üzerinden yayımla. Daraltılmış yerel kopyayı Vercel CLI ile tüm site yerine yükleme. Göndermeden önce `git pull --rebase origin main` yap; zorla gönderim kullanma.
- Metin üslubu için `CLAUDE.md` kurallarını da koru.
