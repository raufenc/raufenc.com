/* Bir Beyit, Bir Âlem · Fâilâtün — on ders. F: failatun.js içindeki yardımcılar. */
window.BBA_DERSLER = F => [
{
  id: "saymak-ve-tartmak", baslik: "Saymak mı, tartmak mı?",
  ozet: "Hece vezni sayar, aruz vezni tartar. Bütün mesele bu cümlede.",
  govde: () => `
    <p>Şiirde ölçü iki türlü tutulur. <b>Hece vezni</b> heceleri sayar: Yunus Emre’nin mısraında beş hece, bir durak, beş hece daha. <b>Aruz</b> ise heceleri tartar: her hecenin bir ağırlığı vardır; kimi kısa, kimi uzundur. “Vezin” kelimesi zaten tartı demektir.</p>
    ${F.klip("tartar")}
    <p>Aynı farkı kitaptaki iki mısrada görelim. Soldaki mısrada yalnız sayı tutulur. Sağdakinde her hecenin altında ağırlığı yazar: kısa hece <b>1 birim</b>, uzun hece <b>2 birim</b>.</p>
    ${F.w("saytart")}
    <div class="formul">kısa hece <em>·</em> = 1 birim &nbsp;&nbsp;·&nbsp;&nbsp; uzun hece <em>—</em> = 2 birim<small>Bu sitedeki bütün hesap bu iki sayıyla yapılır</small></div>
    <p>Demek ki aruzda iki mısranın hece sayısı aynı olsa bile ritimleri başka olabilir; çünkü ağırlıkların <em>sırası</em> başkadır. Kulağın sevdiği o yürüyüş, uzun ile kısanın belli bir düzenle dizilmesinden gelir.</p>
    ${F.klip("tarti")}
    <h2>Temrin</h2>
    ${F.temrin("birim", {adet: 3, tur: "hece"})}`
},
{
  id: "hecenin-agirligi", baslik: "Hecenin ağırlığı: 1 ve 2",
  ozet: "Bir hecenin kısa mı uzun mu olduğu üç kaideyle bilinir.",
  govde: () => `
    <p>Tartıya başlamak için tek bir şeyi bilmek yeter: hece nasıl bitiyor ve içindeki sesli harf uzun mu?</p>
    <ul class="kaide">
      <li><span class="rozet r-k">· 1<small>kısa</small></span><span>Sesli harfle biten ve seslisi kısa olan hece <b>kısadır</b> (açık hece): <em>ne, bi, gi, ya.</em></span></li>
      <li><span class="rozet r-u">— 2<small>uzun</small></span><span>Sessiz harfle biten hece <b>uzundur</b> (kapalı hece): <em>hal, bir, yok, dev, let.</em></span></li>
      <li><span class="rozet r-u">— 2<small>uzun</small></span><span>Seslisi uzun olan hece, sesliyle bitse de <b>uzundur</b>: <em>hâ, dî, rû, câ.</em> İmlâda bunu şapka (â, î, û) gösterir.</span></li>
    </ul>
    <p>Aşağıya bir kelime yazın; heceleri ayrılsın ve her biri tartılsın.</p>
    ${F.w("hecetart")}
    <p>Hocamız bu işin kulakla ne kadar kolay olduğunu şöyle gösterir: tef’ile adlarını bir kenara bırakıp ritmi ağızla vurunca uzun ve kısa heceler kendiliğinden ortaya çıkar.</p>
    ${F.klip("randiran")}
    <h2>Kitaptan bir mısra</h2>
    <p>Şeyh Gâlib’in mısraında her hece tabiî ağırlığıyla okunur; hiçbir zorlama yoktur. Dinleyin, sonra çizgi ve noktaları takip edin.</p>
    ${F.takti(13, 0)}
    <h2>Temrin</h2>
    ${F.temrin("isaretle", {adet: 3, filtre: "sade"})}`
},
{
  id: "tefile", baslik: "Tef’ile: ritmin hücresi",
  ozet: "Heceler tek tek değil, küme küme yürür. Her kümenin bir adı ve bir ağırlığı vardır.",
  govde: () => `
    <p>Uzun ve kısa heceler mısrada rastgele dizilmez; üçer dörder kümelenir. Bu kümelere <b>tef’ile</b> denir. Her tef’ile, ritmini kendi sesinde taşıyan bir kelimeyle anılır: <em>fâ‘ilâtün</em> derken ağzınız zaten “uzun–kısa–uzun–uzun” der.</p>
    <div class="formul">Fâ – ‘i – lâ – tün &nbsp;=&nbsp; <em>—  ·  —  —</em> &nbsp;=&nbsp; 2 + 1 + 2 + 2 &nbsp;=&nbsp; <em>7 birim</em><small>adını söylemek, ritmini söylemektir</small></div>
    <p>Hocamız ritmi ağızla vururken uzun heceye “dan”, kısa heceye “di” der. Biz de öyle yapalım. Kitaptaki beyitlerde geçen bütün tef’ileler aşağıda; her birini dinleyin ve hesabına bakın.</p>
    ${F.w("hucreler")}
    <p>Tabloda dikkat çeken bir şey var: <em>fâ‘ilâtün</em> ile <em>mefâ‘îlün</em> aynı ağırlıktadır, ikisi de 7 birim. Fark, kısa hecenin yerindedir. Ağırlık aynı, sıra başka; yürüyüş de başka.</p>
    ${F.klip("ondakika")}
    ${F.klip("kalem")}
    <h2>Temrin</h2>
    ${F.temrin("birim", {adet: 4, tur: "tefile"})}`
},
{
  id: "kalip", baslik: "Kalıp: hücreden mısraya",
  ozet: "Tef’ileler yan yana gelince vezin olur. Kitaptaki 52 beyit sekiz kalıpla yazılmıştır.",
  govde: () => `
    <p>Bir mısra, birkaç tef’ilenin art arda dizilmesidir. Bu dizilişe <b>kalıp</b> ya da <b>vezin</b> denir. En meşhur kalıp şudur:</p>
    <div class="formul">Fâ‘ilâtün · Fâ‘ilâtün · Fâ‘ilâtün · Fâ‘ilün<br>7 + 7 + 7 + 5 &nbsp;=&nbsp; <em>26 birim</em>, 15 hece<small>Son hücre bir hece kısadır: mısranın nefes payı</small></div>
    <p>Hocamız bu vezni en meşhur beyitle tanıtır: kitaptaki 6. beyit, Muhibbî’nin sıhhat beyti.</p>
    ${F.klip("kanuni")}
    ${F.takti(6, 0)}
    <h2>Sekiz kalıbın hesabı</h2>
    <p>Kitaptaki bütün aruzlu beyitler aşağıdaki sekiz kalıptan biriyle yazılmıştır. Her satırda tef’ilelerin ağırlığını toplayın; mısranın boyu çıkar.</p>
    ${F.w("kaliplar")}
    <p>${F.say.yirmiiki}</p>
    <h2>Hocamızın saydığı dört vezin</h2>
    <p>Hocamız, en çok kullanılan birkaç vezni bilenin divan şiirinin büyük kısmını “ayak sesinden” tanıyacağını söyler ve dördünü birer misalle sayar.</p>
    ${F.klip("nabi")}
    ${F.klip("akincilar")}
    ${F.klip("istiklal")}
    <h2>Temrin</h2>
    ${F.temrin("kulak", {adet: 3})}`
},
{
  id: "takti", baslik: "Taktî: mısrayı tartmak",
  ozet: "Dört adım: hecele, tart, kümele, karşılaştır.",
  govde: () => `
    <p>Bir mısranın veznini bulma işine <b>taktî</b> denir; kelime “kesmek, parçalara ayırmak” demektir. İş dört adımdan ibarettir. Adımlara sırayla dokunun.</p>
    ${F.w("adimlar")}
    <p>Şairin her heceyi nasıl yerine koyduğunu Hocamız bir cümleyle anlatır: adam bunu elmas tartar gibi yazmıştır.</p>
    ${F.klip("elmas")}
    <h2>Şimdi siz tartın</h2>
    <p>Her heceye dokunarak kısa (nokta) ya da uzun (çizgi) deyin, sonra tartıya koyun.</p>
    ${F.temrin("isaretle", {adet: 3, filtre: "sade"})}`
},
{
  id: "ulama", baslik: "Ulama: kelime sınırı kayar",
  ozet: "Sessizle biten kelime, sesliyle başlayana bağlanır; hecenin ağırlığı değişir.",
  govde: () => `
    <p>Konuşurken “acz olan” demeyiz; “ac-zo-lan” deriz. Sessiz harfle biten kelime, sesli harfle başlayan kelimeye kendiliğinden bağlanır. Buna <b>ulama</b> (vasl) denir. Aruzda heceler yazıya göre değil, bu doğal okuyuşa göre ayrılır.</p>
    <div class="formul">Halk içinde &nbsp;→&nbsp; Hal – k‿i – çin – de<br><em>—  ·  —  —</em><small>“halk”ın k’si sonraki heceye geçer; “ki” açık ve kısa bir hece olur (“de” imâleyle uzar; o, gelecek dersin konusu)</small></div>
    <p>Hesap açısından ulamanın yaptığı şudur: sessiz harf komşu heceye taşınınca, önceki hece açılabilir, sonraki hece yeni bir hece olarak ortaya çıkar. Taktîde bağlanan yerler <b>‿</b> işaretiyle gösterilir.</p>
    ${F.takti(1, 0)}
    <h2>Kitaptan misaller</h2>
    <p>${F.say.ulama}</p>
    ${F.misaller("ulama", 6)}
    <p>Ulama her yerde yapılmaz: durak ve noktalamada, bir de şair vezin için kelimeyi ayrı tutmak istediğinde bağlanmadan okunur. Bunu bir sonraki derslerde, med bahsinde göreceğiz.</p>
    <h2>Temrin</h2>
    ${F.temrin("isaretle", {adet: 3, filtre: "ulama"})}`
},
{
  id: "imale-ve-zihaf", baslik: "İmâle ve zihaf: tartıya el değince",
  ozet: "Kısa heceyi uzun okumak imâle (+1), uzun heceyi kısa okumak zihaftır (−1).",
  govde: () => `
    <p>Türkçenin kelimelerinde uzun sesli yoktur; aruz ise uzun heceye çok yer verir. Şair, kalıbın uzun istediği yere kısa bir açık hece düştüğünde onu biraz çekerek okutur. Buna <b>imâle</b> denir.</p>
    <div class="formul">gi – <em>bi</em> &nbsp;→&nbsp; · <em>—</em> &nbsp;&nbsp; (1 → 2, +1 birim)<small>imâle: kısa hece vezin gereği uzun okunur</small></div>
    <p>İmâle en çok Türkçe kelime ve eklerde, bir de terkipleri bağlayan <em>-i / -ı</em> sesinde (izafet) görülür: <em>hâk-i acz, bülbül-i şeydâ.</em> Yerinde yapılan imâle kulağa hoş gelir; ama fazlası mısrayı ağırlaştırır.</p>
    ${F.takti(51, 0)}
    <p>${F.say.imale}</p>
    ${F.misaller("imale", 6)}
    <h2>Zihaf: tersine iş</h2>
    <p>Uzun sesli bir heceyi kalıba uysun diye kısa okumaya <b>zihaf</b> denir. İmâlenin tersidir, kusur sayılır ve nadirdir. ${F.say.zihaf}</p>
    ${F.misaller("zihaf", 4)}
    <p>Bazen de yazıda şapka konmadığı hâlde kelimenin aslında uzun olan bir sesli vardır: <em>fânî, nîsân.</em> Orada imâle yoktur; hece zaten uzundur. Taktîlerde bunu “aslı uzun” diye gösterdik.</p>
    <p>Hocamız beyitleri okurken vezni duyurmak için vurguyu bilerek belirginleştirir. İmâleli heceleri en iyi böyle bir okuyuşta işitirsiniz.</p>
    ${F.klip("abartili")}
    <h2>Temrin</h2>
    ${F.temrin("isaretle", {adet: 3, filtre: "imale"})}`
},
{
  id: "med", baslik: "Med: bir hece, üç birim",
  ozet: "Bazı heceler tek başına bir uzun ve bir kısa yer tutar.",
  govde: () => `
    <p>Bazı heceler uzundan da uzundur: uzun sesliden sonra bir sessiz gelir (<em>bâğ, pâk, şîr, mûr</em>) ya da hece iki sessizle biter (<em>halk, dehr, râst</em>). Böyle bir hece, arkasından ulama yapılmazsa, kalıpta <b>bir uzun ve bir kısa</b> yer tutar. Buna <b>med</b> denir.</p>
    <div class="formul">bâğ &nbsp;=&nbsp; <em>—  ·</em> &nbsp;=&nbsp; 2 + 1 &nbsp;=&nbsp; <em>3 birim</em><small>tek hece, iki hecelik yer</small></div>
    <p>Yalnız bir istisna vardır: uzun sesliden sonra <em>n</em> gelirse med olmaz; <em>cân, cihân, nihân</em> tek uzun sayılır.</p>
    ${F.takti(14, 0)}
    <p>${F.say.med}</p>
    ${F.misaller("med", 6)}
    <p>Medde hece sayısı ile kalıptaki yer sayısı birbirinden ayrılır: mısrada hece bir eksik çıkar ama birim toplamı aynı kalır. Aruzun saymayıp tarttığını en açık burada görürsünüz.</p>
    ${F.klip("natvurgu")}
    <h2>Temrin</h2>
    ${F.temrin("isaretle", {adet: 3, filtre: "med"})}`
},
{
  id: "daire", baslik: "Dâire: ritimlerin akrabalığı",
  ozet: "Aynı halkayı başka yerinden okuyunca başka bir vezin çıkar.",
  govde: () => `
    <p>Aruzu kuran âlimler vezinleri dâireler üzerinde göstermiştir. Sebebi şu: bir tef’ile durmadan tekrar edince kapalı bir halka olur ve bu halkayı nereden okumaya başladığınıza göre başka bir ritim işitirsiniz.</p>
    <p>Aşağıdaki halkada <em>mefâ‘îlün</em> art arda dizili. Başlangıç noktasını çevirin.</p>
    ${F.w("daire")}
    <p>Bir kısa ile üç uzundan kurulu aynı halka, başlangıcı kaydırınca üç ayrı bahrin hücresini verir: <b>hezec</b> (mefâ‘îlün), <b>recez</b> (müstef‘ilün) ve <b>remel</b> (fâ‘ilâtün). Eskiler bu üçünü aynı dâirede toplamıştır. Kitaptaki beyitlerin çoğu bu ailenin iki kolundandır: remel ve hezec.</p>
    <p>Remelin en yaygın kalıbı o kadar çok kullanılmıştır ki Hocamız ona verilen adı da nakleder.</p>
    ${F.klip("davulcu")}
    <p>Bazı kalıplar ise nadirdir. Kitaptaki 25. beytin vezni bunlardandır; mısra tam ortadan iki eş parçaya ayrılır.</p>
    ${F.klip("nadir")}
    ${F.takti(25, 1)}
    <h2>Temrin</h2>
    ${F.temrin("kulak", {adet: 3})}`
},
{
  id: "ahenk", baslik: "Ahenk: tekrar, denge, kulak",
  ozet: "Vezin bir hesap olduğu kadar bir terbiyedir; kulağa yerleşince kendini hatırlatır.",
  govde: () => `
    <p>Buraya kadar hesabını yaptık. Şimdi o hesabın kulakta niçin güzel durduğuna bakalım. Üç sebep var.</p>
    <ul class="kaide">
      <li><span class="rozet r-m">×4<small>tekrar</small></span><span>Aynı hücre tekrar eder. <em>Mefâ‘îlün</em> dört defa gelir; kulak ikinci tef’ilede ritmi tanır, üçüncüde bekler.</span></li>
      <li><span class="rozet r-m">5+7<small>denge</small></span><span>Bazı kalıplar ortadan ikiye bölünür: <em>mef‘ûlü fâ‘ilâtün</em> | <em>mef‘ûlü fâ‘ilâtün.</em> İki kefe eşittir.</span></li>
      <li><span class="rozet r-m">7·7·7·5<small>iniş</small></span><span>Çoğu kalıbın son hücresi kısalır. Mısra biterken nefes de iner.</span></li>
    </ul>
    <p>Bu düzen o kadar sıkıdır ki tek bir hece fazla ya da eksik olsa kulak hemen fark eder. Hocamız bunu iki misalle gösterir.</p>
    ${F.klip("ey")}
    ${F.klip("ki")}
    <p>Vezin eskiden kitaptan öğrenilmezdi; Mevlid dinleyen her çocuğun kulağına kundakta yerleşirdi.</p>
    ${F.klip("kundak")}
    ${F.klip("mevlid")}
    <p>Ve vezin yalnız şiirde kalmaz; insana bir ölçü duygusu verir. Hocamızın naklettiği kıssa bunu en güzel şekilde anlatır.</p>
    ${F.klip("vezinahlaki")}
    <h2>Son söz</h2>
    <p>Hocamızın öğretmenlere tavsiyesi bu sitenin de usulüdür: önce zevki, sonra tekniği. Dersler bitti; şimdi beyitlere dönün, her birini önce Hocamızdan dinleyin, sonra tartın.</p>
    ${F.klip("zevk")}
    <h2>Temrin</h2>
    ${F.temrin("kulak", {adet: 4})}`
}
];
