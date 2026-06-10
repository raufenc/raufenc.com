# raufenc.com — Gece Denetimi Raporu
**Tarih:** 2026-06-10
**Kapsam:** Uçtan uca site sağlık kontrolü, teknik hata onarımı, deploy ve canlı doğrulama.

---

## Özet

| Alan | Sonuç |
|------|-------|
| Yerel ↔ canlı senkron | ✅ Güncel (origin/main ile 0 fark) |
| Canlı sayfa sağlığı (sitemap 54 URL) | ✅ Tümü 200 |
| JSON bütünlüğü (4637 dosya) | ✅ Tümü geçerli |
| Çalışma zamanı (8+ akış) | ✅ Console hatası yok |
| CSP ihlali (jsdelivr script) | ⚠️ 21 dosyada bulundu → ✅ düzeltildi |
| Kırık link / varlık | ✅ Tespit edilen kullanıcıya açık kırık link yok |

**Toplam bulunan teknik hata:** 21 dosyada CSP ihlali (2 farklı kullanıcıya açık sayfa + 19 bağlantısız kopya).
**Düzeltilen:** 21/21.
**Karar bekleyen / dokunulmayan:** 1 (hikmetler — aşağıda).

---

## 1. Yerel ↔ Canlı Senkron
- `git fetch` + `rev-list`: yerel `main`, `origin/main` ile **tam senkron** (0 ileri, 0 geri). Rebase/pull gerekmedi.
- Çalışma dizininde kullanıcının **commit edilmemiş WIP**'i mevcut: `index.html` (+503 satır) ve `data/projeler.js`. Bu dosyalara **dokunulmadı** ve commit'e **dahil edilmedi** (müşteri çalışması).
- Çok sayıda izlenmeyen iCloud çakışma kopyası mevcut (`sinav/`, `sinav 2/`, `_verify N.html`, `_PROMPTLAR N.md`, `harita 21-92.html`, `vitrin/` vb.). Bunlar deploy edilmiyor; commit'e dahil edilmedi.

## 2. Canlı Sayfa Sağlığı
- `sitemap.xml` içindeki **54 URL'nin tamamı 200** döndü (curl ile, takip yönlendirmeleri dahil).
- `robots.txt` ✅ (200, sitemap referansı doğru), `site.webmanifest` ✅ (200).
- Ana sayfadaki 13 dahili link ✅ 200. `data/projeler.js` proje kartları (18 hedef) — tümü sitemap kapsamında, 200. `/maarif/` ✅ 200.
- Güvenlik başlıkları (vercel.json): CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy mevcut.

## 3. Veri Bütünlüğü
- Repodaki **4637 `.json` dosyasının tamamı** `json.load` ile başarıyla parse edildi. **Bozuk JSON yok.**

## 4. Çalışma Zamanı Testi (yerel http.server + preview tarayıcı)
Test edilen akışlar — hepsinde **console hatası yok**:

| Akış | Sonuç |
|------|-------|
| Ana sayfa | ✅ title/h1 doğru, 53 link, hatasız |
| lugat (sözlük PWA) | ✅ arama girişi var, service worker, hatasız |
| 7sinif portal + 4 ünite | ✅ /7sinif/1..4 tümü 200, hub 4 ünite linki |
| iho-oyunlar/eba-etkilesim | ✅ 200, hatasız |
| iho-oyunlar/eba-yaris | ✅ 200, `../eba-etkilesim` klip linki (ask_mahaza.mp3) 200 |
| iho-oyunlar/harita.html (3D) | ✅ THREE r160 (unpkg), 2 canvas, hatasız |
| islam-alimleri | ✅ Fuse fonksiyon, 2594 âlim, arama testi geçti |
| tarih-atlasi | ✅ d3 v7.9.0, 14 SVG, hatasız |

## 5. Kırık Link / Varlık Taraması
- **eba-yaris → eba-etkilesim:** `game.js` klipleri `/iho-oyunlar/eba-etkilesim/vid/clips/` (mutlak yol) üzerinden çekiyor. Klasörde **230 klip** mevcut; örnek klip hem yerelde hem **canlıda 200**. ✅ Linkleme sağlam.
- Ana sayfa + projeler.js link hedefleri: tümü 200.

## 6. CSP Uyumu — BULUNAN VE DÜZELTİLEN HATALAR ⚠️→✅

**Site CSP'si** (vercel.json, tüm yollara uygulanıyor):
`script-src` izinli CDN'ler: `cdn.tailwindcss.com, gstatic, cdnjs.cloudflare.com, googletagmanager, youtube(-nocookie), unpkg`. **jsdelivr YASAK.**
`img-src 'self' data: blob: https:` — yani **görsel** her https kaynağından serbest.

Tespit edilen **jsdelivr script** referansları (CSP tarafından engellenir → ilgili kütüphane yüklenmez → sayfa işlevi bozulur):

| Dosya | Kütüphane | Etki | Düzeltme |
|-------|-----------|------|----------|
| `islam-alimleri/index.html` | fuse.js@7.0.0 | **Canlıda arama bozuktu** (`new Fuse` ReferenceError) | → `unpkg.com/fuse.js@7.0.0/dist/fuse.min.js` |
| `tarih-atlasi/index.html` | d3@7 | **Canlıda d3 görselleştirme bozuktu** | → `unpkg.com/d3@7/dist/d3.min.js` |
| `iho-oyunlar/harita 2.html` … `harita 20.html` (19 dosya) | three@0.160.0 | Bağlantısız iCloud kopyaları (kanonik `harita.html` zaten unpkg) | → `unpkg.com/three@0.160.0/build/three.min.js` |

**Doğrulama:** Düzeltme sonrası her sayfa yerelde test edildi — `Fuse` fonksiyon olarak yüklendi (arama testi geçti), `d3` v7.9.0 yüklendi (14 SVG render), `THREE` r160 yüklendi. Console hatası yok.

**Dokunulmayan (kasıtlı):** `muallimo/index.html` ve `muallimo/review/js/review-app.js` — bunlar jsdelivr'i **görsel** kaynağı olarak kullanıyor (`cdn.jsdelivr.net/gh/raufenc/muallimo-images@main/...`). Bu, CSP `img-src ... https:` tarafından **izinli**; ayrıca görseller kişisel bir GitHub deposunda olduğundan unpkg/cdnjs/gstatic'te muadili yok. Taşınması görselleri kırardı. **Değiştirilmedi.**

## 7. SEO / PWA
- Ana sayfa: title + meta + og etiketleri mevcut, favicon setleri (16/32/192/512 + apple-touch-icon) ✅.
- lugat: PWA manifest + service worker kaydı ✅ çalışıyor.
- sitemap.xml + robots.txt ✅ tutarlı.

## Karar Bekleyen / Bilgi Notları (düzeltme YAPILMADI)

1. **hikmetler/** — Hafıza notu (`project_hikmetler.md`) bu bölümün deploy edildiğini söylüyor, ancak:
   - Repoda **dizin yok**, git'te **izlenmiyor**, canlıda **404**.
   - **Hiçbir yerden link verilmiyor** (ana sayfa, projeler.js, sitemap — hiçbiri referans vermiyor; `.vercelignore` yalnızca `hikmetler/scripts/` ve `.build-hash.json` alt yollarını dışlıyor).
   - **Sonuç:** Kullanıcıya açık kırık link değil; bölüm bilinçli kaldırılmış görünüyor. Hafıza notu güncelliğini yitirmiş. İçerik/yapı kararı olduğundan **dokunulmadı** — kullanıcı onayı bekliyor (geri yüklensin mi, yoksa hafıza notu mu güncellensin?).

2. **iho-oyunlar/harita N.html (2–20) ve diğer numaralı kopyalar** — Bunlar iCloud senkron çakışmasının ürettiği `harita.html` kopyaları; hiçbir yerden link verilmiyor. CSP açısından bu denetimde düzeltildi, ancak ileride **tamamen silinmeleri** önerilir (repo temizliği). Bu denetimde yapı değişikliğinden kaçınmak için silinmedi, yalnızca CSP ihlali giderildi.

## Deploy
- Commit'e **yalnızca** denetim düzeltmeleri dahil edildi (21 dosya + bu rapor). Kullanıcının WIP'i (`index.html`, `data/projeler.js`) ve izlenmeyen iCloud kopyaları **dışarıda bırakıldı**.
- `git pull --rebase` → `add` (seçici) → `commit` → `push origin main`. `--force` **kullanılmadı**.
