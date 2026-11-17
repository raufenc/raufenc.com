/* Bütün satış ve iletişim bağlantıları için tek yapılandırma. */
window.KA_SATIS = {yas:{uzun:'10 yaş ve üzeri',kisa:'10+'},durum:'onsiparis',fiyat:'',url:'',eposta:'raufenc@gmail.com',konu:'Kök Atlası ön sipariş'};
(() => {
  'use strict';
  window.kaSatisDoldur = (root=document) => {
    const s=window.KA_SATIS, sale=s.durum==='satista' && s.url.trim();
    const email='mailto:'+s.eposta+'?subject='+encodeURIComponent(s.konu)+'&body='+encodeURIComponent('Adınız: \nŞehriniz: \nKaç set: \n');
    root.querySelectorAll('[data-yas]').forEach(el=>el.textContent=s.yas?.[el.dataset.yas]||'');
    root.querySelectorAll('[data-cta]').forEach(a=>{
      const question=a.dataset.cta==='question';
      a.textContent=question?'Soru sorun':sale?'Seti edinin'+(s.fiyat?' · '+s.fiyat:''):'Ön sipariş verin';
      a.href=question?email:sale?s.url:email;
    });
    root.querySelectorAll('[data-status]').forEach(el=>el.textContent=sale?'Kök Atlası seti satışta.':'Baskı hazırlığında. İlk baskıdan haber almak için ön sipariş verin.');
  };
  window.kaSatisDoldur();
})();
