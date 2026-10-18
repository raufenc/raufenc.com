-- Mekteb veri modeli (Postgres). Faz 0 taslağı.
-- İlke: iki bağımsız ilerleme yolu (kuran / ilmihal), hoca eliyle yazılan kanıt,
-- onaysız içeriğin yayımlanmaması, iman/ihlas puanı gibi bir alanın bulunmaması.

create type yol as enum ('kuran', 'ilmihal');
create type kanit_seviye as enum ('henuz_degil', 'yardimla', 'ipucuyla', 'bagimsiz'); -- 0..3
create type kanit_kaynak as enum ('canli_hoca', 'kendi_calisma'); -- kendi_calisma → hoca onayı bekler
create type icerik_durum as enum ('taslak', 'inceleme', 'onayli', 'yayinda', 'geri_cekildi');
create type rol as enum ('ogrenci', 'veli', 'hoca', 'icerik_onayci', 'yonetici');

-- Kişiler ve erişim -----------------------------------------------------------
create table kisi (
  id          bigserial primary key,
  ad          text not null,
  rol         rol  not null,
  eposta      text unique,
  dogum_yili  smallint,              -- yalnız öğrenci; yaş grubu için
  olusturma   timestamptz default now()
);
create table veli_ogrenci (
  veli_id     bigint references kisi(id),
  ogrenci_id  bigint references kisi(id),
  riza_tarihi date not null,          -- KVKK: veli rızası olmadan öğrenci açılmaz
  primary key (veli_id, ogrenci_id)
);

-- İçerik: tek kaynak -------------------------------------------------------------
create table kazanim (
  kod         text primary key,       -- K-TCV-03.2, I-AKD-003 (bkz. sema/icerik-kodu.md)
  yol         yol  not null,
  alan        text not null,          -- ELF/TCV/YZN/EZB | AKD/FKH/AHL/SYR
  sira        int  not null,          -- modül içi öğretim sırası
  modul       smallint not null check (modul between 1 and 3),
  baslik      text not null,
  anlama      text,                   -- UbD: "öğrenci şunu anlar"
  transfer    text,                   -- UbD: "yeni durumda şunu yapabilir"
  kaynak_ref  text[],                 -- R:SEADET:…, S:KRB:2:9, Q:…
  onkosul     text[]                  -- diğer kazanım kodları
);
create table icerik (
  id          bigserial primary key,
  kazanim_kod text references kazanim(kod),
  tur         text not null,          -- sayfa | etkinlik | ses | hoca_aciklama | ogrenci_metni
  kod         text not null,          -- E:K-TCV-03:ayirt:1, A:…, H:…
  surum       text not null,          -- v1.0
  durum       icerik_durum not null default 'taslak',
  govde       jsonb not null,         -- etkinlik tanımı, metin, dosya yolu…
  yazan       bigint references kisi(id),
  onaylayan   bigint references kisi(id),
  onay_tarihi timestamptz,
  unique (kod, surum)
);
-- Öğrenci yalnız yayında olan sürümü görür:
create view icerik_yayinda as select * from icerik where durum = 'yayinda';

create table kanit_tanimi (
  id          bigserial primary key,
  kazanim_kod text references kazanim(kod),
  kod         text unique not null,   -- Kn:K-TCV-03:2
  gorev       text not null,          -- "daha önce çalışmadığı bir örnekte medd-i tabîîyi bulur"
  olcut       text not null,          -- hocanın bakacağı ölçüt
  canli_gerekir boolean not null default true  -- Kur'ân okuyuşu için her zaman true
);

-- Program ve takvim -------------------------------------------------------------------
create table kayit (                    -- öğrencinin bir modüle kaydı
  id          bigserial primary key,
  ogrenci_id  bigint references kisi(id),
  modul       smallint not null,
  baslangic   date not null,
  hoca_id     bigint references kisi(id)   -- değişebilir; geçmiş oturumlarda saklanır
);
create table gorusme (                  -- 25 dakikalık görüşme; en fazla 96 / modül
  id          bigserial primary key,
  kayit_id    bigint references kayit(id),
  hoca_id     bigint references kisi(id),
  planlanan   timestamptz not null,
  baslangic   timestamptz,
  bitis       timestamptz,
  durum       text not null default 'planli',   -- planli | yapildi | gelmedi | telafi
  kuran_dk    numeric(4,1),                     -- gerçekleşen süreler (hedef 15 / 10)
  ilmihal_dk  numeric(4,1),
  hoca_notu   text                              -- kısa gözlem; isteğe bağlı
);

-- İlerleme ve kanıt: iki yol ayrı -----------------------------------------------------
create table ilerleme (                 -- "kaldığı yer" — yol başına tek satır
  ogrenci_id  bigint references kisi(id),
  yol         yol not null,
  kazanim_kod text references kazanim(kod),   -- sıradaki/açık kazanım
  konum       jsonb,                          -- {"kitap":"KRB","cilt":2,"sayfa":9,"ornek":3}
  guncelleme  timestamptz default now(),
  primary key (ogrenci_id, yol)
);
create table kanit (
  id            bigserial primary key,
  ogrenci_id    bigint references kisi(id),
  kanit_kod     text references kanit_tanimi(kod),
  gorusme_id    bigint references gorusme(id),  -- canlıysa dolu
  kaynak        kanit_kaynak not null,
  seviye        kanit_seviye not null,
  hoca_onayi    boolean,                        -- kendi_calisma kanıtı için; null = bekliyor
  icerik_surum  text,                           -- öğrencinin gördüğü içerik sürümü
  not_          text,
  zaman         timestamptz default now()
);
-- Bir kazanım "kazanıldı" sayılır: aynı kanıt tanımı için en az iki ayrı görüşmede
-- 'bagimsiz', veya hoca açıkça onaylar. (Kural uygulama katmanında; burada görünüm.)
create view kazanim_durumu as
select k.ogrenci_id, kt.kazanim_kod,
       max(case when k.seviye = 'bagimsiz' and (k.kaynak = 'canli_hoca' or k.hoca_onayi) then 1 else 0 end) as bagimsiz_var,
       count(distinct k.gorusme_id) filter (where k.seviye = 'bagimsiz') as bagimsiz_gorusme_sayisi,
       max(k.zaman) as son_kanit
from kanit k join kanit_tanimi kt on kt.kod = k.kanit_kod
group by k.ogrenci_id, kt.kazanim_kod;

-- Kendi kendine çalışma ----------------------------------------------------------------------
create table calisma (                  -- etkinlik denemeleri; kanıt DEĞİL, hoca görür
  id          bigserial primary key,
  ogrenci_id  bigint references kisi(id),
  icerik_id   bigint references icerik(id),
  sonuc       jsonb not null,          -- cevaplar, ipucu sayısı, süre
  zaman       timestamptz default now()
);

-- Dışa aktarım / LMS ---------------------------------------------------------------------------
-- kanit ve calisma satırları xAPI ifadelerine (actor/verb/object/result) eşlenir;
-- LTI 1.3 bağlantısında kayit_id dış LMS'in context_id'siyle ilişkilendirilir.
