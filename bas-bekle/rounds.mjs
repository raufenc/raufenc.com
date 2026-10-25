// Original Turkish round design. No assets or source from the reference game.
export const tempos = { calm: { name: 'Sakin', factor: 1.65 }, flow: { name: 'Akış', factor: 1 }, rush: { name: 'Baskı', factor: .75 } };
export const phases = ['Isınma', 'Dikkat', 'Hafıza', 'Çelişki', 'Son viraj'];
export function createDeck(mode = 'classic', random = Math.random) {
  const memory = [3, 4, 6][Math.floor(random() * 3)];
  const hour = [2, 3, 4][Math.floor(random() * 3)];
  const r = (text, expected, why, type = 'Dikkat', seconds = 6, extra = {}) => ({ text, expected, why, type, seconds, ...extra });
  const deck = [
    r('Bir kez bas.', 1, 'Tek bir dokunuş yeterliydi.', 'Isınma', 5),
    r('Basma.', 0, 'Bazen doğru hamle, beklemektir.', 'Fren', 5),
    r('İki kez bas.', 2, 'İki dokunuştan sonra durmalıydın.', 'Sayma'),
    r('Öncekiyle aynı sayıda bas.', 2, 'Önceki turda iki kez basman istenmişti.', 'Hafıza', 7),
    r('Sonuç kadar bas.', 3, '6 − 4 + 1 = 3. Üç kez basmalıydın.', 'Hesap', 7, { visual: 'math', value: '6 − 4 + 1' }),
    r('Aklında tut. Basma.', 0, 'Bu bir hafıza turuydu; sayıyı saklayıp beklemeliydin.', 'Hafıza', 7, { visual: 'memory', value: memory }),
    r('Kedi sayısı kadar bas.', 3, 'Üç kedi vardı. Tilkiler sayılmıyordu.', 'Ayırt etme', 7, { visual: 'animals', value: ['cat', 'fox', 'cat', 'fox', 'cat'] }),
    r('Renk maviyse bir kez bas.', 1, 'Kelime “SARI” olsa da yazının rengi maviydi.', 'Çelişki', 7, { visual: 'color', value: 'SARI', color: '#74bfff' }),
    r('Hilal → iki kez bas.\nDiğer talimatı yok say.\nŞimdi bekle.', 0, 'Kuralı öğrenme turunda hilal yoktu; beklemeliydin.', 'Yeni kural', 11, { setRule: 'Hilal varsa diğer talimat yerine 2 kez bas.' }),
    r('Hiç basma.', 2, 'Hilal kuralı geçerliydi: diğer talimat yerine iki kez basmalıydın.', 'Kural', 6, { visual: 'moon' }),
    r('Hatırladığın sayı kadar bas.', memory, `Sakladığın sayı ${memory} idi.`, 'Hafıza', 8),
    r('Kediler çiftse bir kez bas.\nDeğilse bekle.', 1, 'Dört kedi vardı. Dört çift sayıdır; bir kez basmalıydın.', 'Mantık', 8, { visual: 'animals', value: ['cat', 'cat', 'cat', 'cat'] }),
    r('Dolu noktalar kadar bas.', 3, 'Üç dolu nokta vardı. Çemberler sayılmıyordu.', 'Ayırt etme', 7, { visual: 'dots', value: [1, 0, 1, 0, 1] }),
    r('İki kez bas.', 2, 'Hilal kuralı da metin de iki kez basmanı söylüyordu.', 'Kural', 5, { visual: 'moon' }),
    r('Hilal kuralı bitti.\nBir kez bas.', 1, 'Kural kalktı; bir dokunuşla onaylamalıydın.', 'Kural değişimi', 8, { clearRule: true }),
    r('Hiç basma.', 0, 'Hilal kuralı artık geçerli değildi. Yazıyı izlemeliydin.', 'Fren', 5, { visual: 'moon' }),
    r('Her kelime için bir kez bas.', 4, '“Acele / etmeden / dikkatle / oku” dört kelimedir.', 'Dil', 8, { visual: 'sentence', value: 'Acele etmeden dikkatle oku' }),
    r('Her sivri uç için bir kez bas.', 5, 'Yıldızın beş dış ucu var.', 'Sayma', 7, { visual: 'star' }),
    r('Saat kaçsa o kadar bas.', hour, `Saat ${hour}.00’ı gösteriyordu. ${hour} kez basmalıydın.`, 'Saat', 8, { visual: 'clock', value: hour }),
    r('Üç kez değil. Bir kez bas.', 1, 'Cümlenin tamamını okumalıydın: yalnızca bir kez.', 'Fren', 6),
    r('Sonuç tekse iki kez bas.\nÇiftse basma.', 0, '9 − 3 = 6. Altı çift olduğundan beklemeliydin.', 'Mantık', 8, { visual: 'math', value: '9 − 3' }),
    r('Öncekiyle aynı sayıda bas.', 0, 'Önceki turda hiç basmaman istenmişti.', 'Hafıza', 6),
    r('Kelime MAVİ ise basma.\nDeğilse iki kez bas.', 0, 'Rengine değil kelimeye bakmalıydın. Kelime “MAVİ” idi.', 'Çelişki', 8, { visual: 'color', value: 'MAVİ', color: '#ffad58' }),
    r('Aklındaki sayıdan bir eksik bas.', memory - 1, `Aklındaki sayı ${memory} idi; bir eksiği ${memory - 1}.`, 'Hafıza', 8),
    r('Son tur. Sadece bekle.', 0, 'Son hamle, süre bitene kadar beklemekti.', 'Fren', 6)
  ];
  if (mode === 'siyer') {
    deck[2] = r('Peygamberimiz Mekke’de doğduysa iki kez bas.', 2, 'Peygamberimiz Mekke’de doğdu; iki kez basmalıydın.', 'Siyer', 9);
    deck[4] = r('Peygamberimizin annesinin adı Âmine ise üç kez bas.', 3, 'Annesinin adı Âmine’dir; üç kez basmalıydın.', 'Siyer', 9);
    deck[6] = r('Peygamberimizin babasının adı Abdullah ise bir kez bas.', 1, 'Babasının adı Abdullah’tır; bir kez basmalıydın.', 'Siyer', 9);
    deck[7] = r('İlk vahiy Hira’da geldiyse bir kez bas.', 1, 'İlk vahiy Hira mağarasında geldi.', 'Siyer', 9);
    deck[11] = r('Hicret Mekke’den Medine’ye yapıldıysa iki kez bas.', 2, 'Peygamberimiz Mekke’den Medine’ye hicret etti.', 'Siyer', 10);
    deck[12] = r('Peygamberimiz Medine’de doğduysa bas. Değilse bekle.', 0, 'Peygamberimiz Mekke’de doğdu; beklemeliydin.', 'Siyer', 9);
    deck[16] = r('Her kelime için bir kez bas.', 4, '“Peygamberimiz / bize / örnek / oldu” dört kelimedir.', 'Dil', 8, { visual: 'sentence', value: 'Peygamberimiz bize örnek oldu' });
    deck[19] = r('Peygamberimizin sütannesinin adı Halîme ise bir kez bas.', 1, 'Sütannesinin adı Halîme’dir; bir kez basmalıydın.', 'Siyer', 9);
    deck[20] = r('İlk vahiy Medine’de geldiyse bas. Değilse bekle.', 0, 'İlk vahiy Mekke yakınındaki Hira mağarasında geldi.', 'Siyer', 9);
    deck[22] = r('Hicret bu şehre ise basma.\nDeğilse iki kez bas.', 0, 'Hicretin varış şehri Medine’dir. Talimat beklemeni istiyordu.', 'Siyer', 10, { visual: 'sentence', value: 'MEDİNE' });
  }
  return deck;
}
export function judge(round, presses) { return presses === round.expected; }
export function reward(streak) { return 100 + Math.min(Math.max(streak - 1, 0), 5) * 20; }
