# Kocaeli AR-GE — Android uygulaması (APK)

`com.raufenc.kocaeliarge` paketi; web uygulamasını (`https://raufenc.com/kocaeli-arge/`) tam ekran yerel kabukta açar.
Android 7.0 (API 24) ve üzeri. Gradle gerekmez; `build.sh` yalnız Android SDK build-tools ile derler.

**Yerel özellikler:** açılış ekranı, çevrim dışı ekranı ve yeniden dene, tam ekran video, fotoğraf seçici (paylaşım),
geri tuşu ile sayfa geçmişi, yerel paylaşım menüsü (`AndroidBridge.share`), etkinliği telefon takvimine ekleme
(`AndroidBridge.addEvent`), YouTube / harita / telefon / e-posta bağlantılarının ilgili uygulamada açılması,
`raufenc.com/kocaeli-arge` bağlantılarının uygulamada açılması (App Links, `/.well-known/assetlinks.json`).

**Sınırlar (WebView kabuğu):** Google ile giriş ve web push bildirimleri WebView içinde çalışmaz; canlı modda bunlar için
Trusted Web Activity (Bubblewrap) paketi ya da Firebase Android SDK'lı yerel sürüm gerekir. Mağaza yayını için kurum
yetki yazısı ve kurum geliştirici hesabı gerekir (bkz. ../KURULUM.md).

**İmza:** `kocaeli-arge-release.keystore` (alias `kocaeliarge`) depoya konmaz; güvenli yerde saklanır. Yeni sürümde
`AndroidManifest.xml` içindeki `versionCode` artırılır ve aynı anahtarla imzalanır; aksi hâlde güncelleme kurulamaz.
SHA-256 parmak izi: `42:C6:D4:E2:28:43:81:17:12:92:1C:BF:A2:0F:B7:5D:5E:57:1E:97:4F:77:D2:A7:B0:15:9A:1E:F5:92:D0:1D`
