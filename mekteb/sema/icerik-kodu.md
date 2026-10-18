# İçerik kod şeması

Her kazanım, kitap sayfası, etkinlik, ses ve öğretmen açıklaması **aynı kodla**
bağlanır. Kitaptaki karekod bu kodu açar; sayfa düzeni değişse kod değişmez
(`/karabas-elifbasi/?d=03` mantığının genelleştirilmiş hâli).

## Kazanım kodu

```
<YOL>-<ALAN>-<NN>[.<k>]
```

| Parça | Değerler | Anlam |
|---|---|---|
| `YOL` | `K` Kur'ân · `I` İlmihal | İki bağımsız ilerleme yolu |
| `ALAN` (Kur'ân) | `ELF` Elifba · `TCV` Tecvid · `YZN` Yüzünden okuma · `EZB` Ezber (sûre ve dualar) | |
| `ALAN` (İlmihal) | `AKD` Akaid · `FKH` Fıkıh · `AHL` Ahlâk · `SYR` Siyer | Brief'teki dört alan |
| `NN` | 01… | Alan içinde sıra; Karabaş için **ders kimliğiyle aynı** (`K-TCV-03` = Karabaş ders 03) |
| `.k` | 1… | Dersin içindeki alt kazanım (isteğe bağlı) |

Örnek: `K-TCV-03.2` = Karabaş ders 03 (Medd-i tabîî), 2. kazanım: "bir elif miktarı uzatır".

## Bağlı nesnelerin kodları

| Nesne | Kod | Örnek |
|---|---|---|
| Kitap sayfası | `S:<kitap>:<cilt>:<sayfa>` | `S:KRB:2:9` (Karabaş, cilt 2, sayfa 9) |
| Karekod hedefi | `Q:<kazanım>` → `https://<alan>/d/K-TCV-03` | kalıcı, sayfadan bağımsız |
| Etkinlik | `E:<kazanım>:<tip>:<n>` | `E:K-TCV-03:ayirt:1` (ayırt etme etkinliği) |
| Kanıt tanımı | `Kn:<kazanım>:<n>` | `Kn:K-TCV-03:2` |
| Ses (onaylı hafız) | `A:<kazanım>:<örnek>` | `A:K-TCV-03:tawwaban` |
| Öğretmen açıklaması | `H:<kazanım>` | `H:K-TCV-03` |
| İlmihal kaynağı | `R:<eser>:<cilt?>:<sayfa>` | `R:SEADET:… ` (Tam İlmihâl Seâdet-i Ebediyye, sayfa vakıf tarafından girilir) |

## Etkinlik tipleri (brief'teki liste)

`eslestir` (resimli eşleştirme) · `surukle` (sürükle-bırak) · `sirala` · `ayirt`
(benzerleri ayırt etme) · `sec` (seçimle ilerleyen kısa etkinlik) · `dinle-sec` ·
`acikla` (öğrenci sözlü açıklar, hoca işaretler) · `uygula` (yeni örnekte uygulama) ·
`goster` (bir uygulamanın sırasını gösterme).

Kur'ân metni ve dinî kavramlarla **kullanılmaz:** süreli yarış, parçalama/patlatma,
ceza animasyonu, bilmece-yarışma dili.

## Sürüm ve onay

Her içerik nesnesi `v<major>.<minor>` taşır ve şu durumlardan birindedir:
`taslak → inceleme → onaylı → yayında → geri çekildi`. Öğrenciye yalnız `yayında`
gösterilir; öğrencinin gördüğü sürüm `kanit.icerik_surum` alanına yazılır, böylece bir
içerik düzeltildiğinde hangi öğrencilerin eski sürümle çalıştığı bulunur.
