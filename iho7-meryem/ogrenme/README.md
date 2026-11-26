# Meryem’in Günü — öğrenme önizlemesi

Beş kaynak sahnesine üç aşamalı bir öğrenme yolu ekler: dinleme/anlama, örneğe göre cümle kurma, seçenek olmadan sözlü deneme ve modelle öz karşılaştırma. Yanlış cevapta seçilen kavrama özel açıklama, yeni örnek ve görevler arasına yerleştirilen hatırlama sorusu bulunur.

Finalde yeni bir gün anlatılır. Kaynak içerikteki kelimeler yeniden birleştirilmiştir: okul yerine pazar, öğle yerine akşam, anne yerine baba. Beş final sorusunun yalnızca ilk cevapları puanlanır. Öğrenme turu ve öğrencinin konuşmaya ilişkin öz beyanı bu puana eklenmez.

Arayüz tamamen Arapçadır. Açılışta yalnızca görsel, başlık ve başlat düğmesi bulunur. Görev dışı açıklamalar kaldırılmıştır; ayrıntılı rapor isteğe bağlı öğretmen bölümünde açılır.

## Kullanım

`ogrenme/index.html` dosyasını HTTP üzerinden açın. Öğretmen düğmesindeki kısayollar her aşamayı incelemek için ayrı bir deneme başlatır; SCORM sonucu göndermez. Yeni açılışta tur baştan başlar; ekran yönünün değişmesi açık turu sıfırlamaz. Tarayıcıda öğrenci kimliği veya ses kaydı saklanmaz.

Ses yerine metinle yapılan final, okuma destekli çalışma olarak etiketlenir ve dinleme puanı olarak LMS'ye gönderilmez. Model ve final anlatımı yerel macOS Majed sesiyle üretilmiş sentetik sestir; kaynak videolar aynen kullanılmıştır. Arapça telaffuz ve yeni cümlelerin öğretmen denetimi gerekir.

## Kapsam ve doğrulama

Bu klasör çalışan bir önizlemedir. `bridge.js`, SCORM 1.2 bağlayıcısıdır; gerçek EBA hesabında uyumluluk testi yapılmış teslim paketi değildir. Öğrenme üstünlüğü henüz öğrenci pilotuyla ölçülmemiştir.

Kaynaklar: `../content.js`, `../kesif/app.js`, `../kesif/assets/`, `../vid/clips/`, `../fonts/Arakom-Regular.ttf`.

Yeni görsel, yerel `frame-3.webp` karakter referansıyla yerleşik image_gen aracı kullanılarak üretildi. Prompt: Meryem aynı krem başörtüsü ve okul kıyafetiyle odasında masasındaki boş günlüğünü tutuyor; yumuşak gün ışığı, mevcut 3B çizgi film görünümü, soru cevaplarını ele veren okul/pazar/ebeveyn/saat ayrıntıları ve yazı yok. PNG aslı çalışma klasöründe, aynı boyutlu JPEG web sunumu için kullanılır.
