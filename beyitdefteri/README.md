# Beyit Defteri

Asıl adres: https://raufenc.com/beyitdefteri/

## Yeni şiir eklemek

`data/defter.json` tek içerik kaynağıdır. `collections` koleksiyonları, `poems` şiirleri taşır. Yeni bir koleksiyon gerekiyorsa sabit bir `id`, başlık ve açıklama ekleyin. Şiirler dizi sırasıyla fihriste gelir. Mevcut şiirin `id` değerini değiştirmeyin; kalıcı adres buna bağlıdır. Başlığı değiştirmek adresi değiştirmez.

Her şiirde `id`, `collectionId`, `title`, `coupletCount`, `couplets`, `glossary`, `meterType` ve `meterId` bulunur. Her beyit iki `verses` kaydı, her mısra `text` taşır. Taktî varsa mısranın `scan` alanına `feet` (name, syllables, symbols) ve `notes` eklenir. `source` kaynak metni ve URL'sidir. Mektûbât gazellerinde ayrıca `letter` ve `volume` korunur. Eski şiirlerin fihrist numaraları mektup numarası değildir.

Kayıt güncellenecekse aynı kimliği kullanın; tekrar eklemeyin. `isNew`, bu yayına özgü düzeltilmiş Mektûbât nüshasını işaretler, otomatik tarih hesabı değildir.

Kök dizinde `node scripts/build_beyitdefteri.mjs` çalıştırın. Fihrist, koleksiyon sayıları, şiir sayfaları ve alt sitemap yeniden üretilir. Betik eksik beyitleri, hatalı kimlikleri, tekrarı ve eksik tef‘ileleri reddeder. Eski adreslerin devam etmesi için kayıt kimlikleri kalıcıdır. Metinleri kaynakla karşılaştırıp ilgili dosyaları GitHub ana dalına normal gönderimle yayımlayın. Tüm siteyi daraltılmış çalışma kopyasından Vercel CLI ile yüklemeyin.

## İçerik kökeni

50 yeni gazel: kullanıcının `Beyit_Defteri_50_Gazel_Duzeltilmis.html` dosyası, 9 Eylül 2026 düzeltmesi. SHA-256: 28fa783554dc41fd4165954218c7881908ac79e4af99ef2a34cdc071ee88b3de.

40 önceki şiir/sürüm: Beyit Defteri'nin 10 Eylül 2026 tarihinde mevcut olan ikinci yayını. 168 beyit ve defter hakkında bölümünde korunan bağımsız bir mısra. Yeni nüsha 292 beyit; toplam 460 beyit. Metinler ve kaynakta verilen taktîler aktarım sırasında değiştirilmedi. Bu çalışma yeni bir aruz veya kaynak tahkiki değildir.
