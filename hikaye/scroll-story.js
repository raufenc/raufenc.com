/* ============================================================
   scroll-story.js — kaydırmaya bağlı video anlatı motoru
   raufenc.com

   Sözleşme: sahneleri HTML'den okur, zaman çizelgesini videonun
   gerçek süresinden türetir. Elle ayarlanan sihirli sayı yoktur.

   <section data-scroll-story
            data-story-hold="0.35"   (sahne başına duraklama oranı)
            data-story-vh="130">     (sahne başına kaydırma yüksekliği)
     <video data-story-video ...>
     <div data-story-intro>...</div>
     <article data-story-scene="1" data-scene-at="0.08">...</article>
     ...
     <div data-story-outro>...</div>
   </section>
   ============================================================ */

(() => {
  'use strict';

  const roots = document.querySelectorAll('[data-scroll-story]');
  if (!roots.length) return;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const easeOutCubic = (v) => 1 - Math.pow(1 - v, 3);
  const smoothstep = (v) => v * v * (3 - 2 * v);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  roots.forEach((root) => new ScrollStory(root));

  function ScrollStory(root) {
    const video = root.querySelector('[data-story-video]');
    const intro = root.querySelector('[data-story-intro]');
    const outro = root.querySelector('[data-story-outro]');
    const scenes = [...root.querySelectorAll('[data-story-scene]')];
    const progressBar = root.querySelector('[data-story-progress]');
    const counter = root.querySelector('[data-story-counter]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!video || !scenes.length) return;

    /* ---- konfigürasyon ---- */
    const vhPerScene = Number(root.dataset.storyVh) || 130;
    const outroVh = Number(root.dataset.storyOutroVh) || 120;

    /* Giriş metninin tek başına okunacağı pay. Kartlar ancak
       bu mesafe geçildikten sonra belirmeye başlar. */
    const introVh = vhPerScene * (Number(root.dataset.storyIntroVh) || 0.85);

    /* Toplam sayfa yüksekliği buradan türetilir; video süresinden
       değil. Böylece video değişince JS'e dokunmak gerekmez. */
    const storyVh = introVh + scenes.length * vhPerScene;
    const totalVh = storyVh + outroVh;
    root.style.setProperty('--story-total-vh', String(totalVh));

    /* Her sahnenin videodaki konumu 0..1 aralığında.
       data-scene-at verilmişse o kullanılır, yoksa eşit dağıtılır. */
    const anchors = scenes.map((el, i) => {
      const explicit = el.dataset.sceneAt;
      return explicit !== undefined
        ? clamp(Number(explicit), 0, 1)
        : (i + 0.5) / scenes.length;
    });

    /* Kaydırma → video zamanı eşlemesinin kontrol noktaları.
       Kartın tam ortasında video, o kartın çapasında olur. */
    const sceneCenterVh = (i) => introVh + (i + 0.5) * vhPerScene;
    const controls = [
      { vh: 0, at: 0 },
      ...anchors.map((a, i) => ({ vh: sceneCenterVh(i), at: a })),
      { vh: storyVh, at: 1 },
    ].sort((a, b) => a.vh - b.vh);

    let pageTop = 0;
    let vhPx = window.innerHeight / 100;
    let frame = 0;
    let targetTime = 0.01;
    let duration = 0;
    let primed = false;
    let unlocked = false;
    let iosTimer = 0;
    let sceneNow = 0;

    /* ---- ölçüm ---- */
    const measure = () => {
      pageTop = root.getBoundingClientRect().top + window.scrollY;
      vhPx = Math.max(window.innerHeight / 100, 1);
      update();
    };

    const scrollVh = () => clamp((window.scrollY - pageTop) / vhPx, 0, totalVh);

    /* Kaydırma ilerlemesini video zamanına çevirir.
       Kontrol noktaları arasında smoothstep ile yumuşatır: kart tam
       okunurken video da o sahnede yavaşlamış gibi olur. */
    const timeAt = (vh) => {
      if (!duration) return 0.01;
      const x = clamp(vh, 0, storyVh);

      let i = 0;
      while (i < controls.length - 2 && x > controls[i + 1].vh) i += 1;

      const a = controls[i];
      const b = controls[i + 1];
      const span = b.vh - a.vh;
      const local = span > 0 ? smoothstep(clamp((x - a.vh) / span, 0, 1)) : 1;
      const norm = a.at + (b.at - a.at) * local;

      return clamp(norm * duration, 0.01, Math.max(duration - 0.05, 0.01));
    };

    /* ---- kart görünürlüğü ---- */
    const fade = (vh, start, end, dist) => {
      const inn = clamp((vh - start) / dist, 0, 1);
      const out = clamp((end - vh) / dist, 0, 1);
      return easeOutCubic(Math.min(inn, out));
    };

    const updateScenes = (vh) => {
      /* Sayaç, iki kart arasındaki geçişte geriye düşmemeli.
         En görünür kart esas alınır; hiçbiri görünmüyorsa
         kaydırma konumuna en yakın kart korunur. */
      let best = -1;
      let bestO = 0;

      scenes.forEach((el, i) => {
        const start = introVh + i * vhPerScene;
        const end = start + vhPerScene;
        const o = fade(vh, start, end, vhPerScene * 0.4);
        el.style.setProperty('--scene-opacity', o.toFixed(3));
        el.style.setProperty('--scene-y', `${((1 - o) * 28).toFixed(2)}px`);
        el.setAttribute('aria-hidden', o < 0.05 ? 'true' : 'false');
        if (o > bestO) { bestO = o; best = i; }
      });

      const active = best >= 0 && bestO > 0.01
        ? best + 1
        : clamp(Math.floor((vh - introVh) / vhPerScene) + 1, 1, scenes.length);

      if (active !== sceneNow) {
        sceneNow = active;
        if (counter) {
          counter.textContent = `${String(active).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
        }
      }
    };

    const updateIntro = (vh) => {
      if (!intro) return;
      const o = clamp(1 - vh / (introVh * 0.85), 0, 1);
      intro.style.setProperty('--intro-opacity', o.toFixed(3));
      intro.style.setProperty('--intro-y', `${(-16 * (1 - o)).toFixed(2)}px`);
      intro.setAttribute('aria-hidden', o < 0.05 ? 'true' : 'false');
    };

    const updateOutro = (vh) => {
      if (!outro) return;
      const p = easeOutCubic(clamp((vh - storyVh) / outroVh, 0, 1));
      root.style.setProperty('--outro-progress', p.toFixed(4));
      root.classList.toggle('story-outro-active', p > 0.85);
    };

    /* ---- video ---- */
    const seek = () => {
      if (reduced.matches || video.readyState < 1) return;
      if (Math.abs(targetTime - video.currentTime) < 0.01) return;
      try {
        video.currentTime = targetTime;
        pumpIOS();
      } catch (_) { /* seek henüz mümkün değil */ }
    };

    /* iOS Safari duraklatılmış videoda seek edilen kareyi boyamaz.
       Çok kısa bir oynatma karesi compositor'a taşır. */
    function pumpIOS() {
      if (!isIOS || !unlocked || reduced.matches) return;
      window.clearTimeout(iosTimer);
      try { video.play()?.catch?.(() => {}); } catch (_) { return; }
      iosTimer = window.setTimeout(() => video.pause(), 140);
    }

    const prime = () => {
      if (reduced.matches || primed || video.readyState < 2) return;
      primed = true;
      video.muted = true;
      video.defaultMuted = true;
      try {
        video.play()
          ?.then(() => { unlocked = true; video.pause(); seek(); dropUnlock(); })
          ?.catch(() => { video.pause(); seek(); });
      } catch (_) { /* jest bekleniyor */ }
      root.classList.add('story-ready');
    };

    function unlock() {
      if (reduced.matches || unlocked) return;
      video.muted = true;
      try {
        video.play()?.then(() => {
          unlocked = true;
          primed = true;
          if (!isIOS) video.pause();
          seek();
          root.classList.add('story-ready');
          dropUnlock();
        })?.catch(() => {});
      } catch (_) { /* yoksay */ }
    }

    function dropUnlock() {
      ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((e) =>
        window.removeEventListener(e, unlock));
    }

    /* ---- ana döngü ---- */
    const update = () => {
      frame = 0;
      const vh = scrollVh();
      updateIntro(vh);
      updateScenes(vh);
      updateOutro(vh);

      if (progressBar) {
        progressBar.style.setProperty('--story-progress', clamp(vh / storyVh, 0, 1).toFixed(4));
      }

      if (reduced.matches) return;
      targetTime = timeAt(vh);
      if (!primed) prime();
      seek();
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /* ---- kurulum ---- */
    video.muted = true;
    video.defaultMuted = true;

    const onMeta = () => { duration = video.duration || 0; measure(); };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta, { once: true });

    if (video.readyState >= 2) prime();
    else video.addEventListener('loadeddata', () => { prime(); seek(); }, { once: true });

    video.addEventListener('seeked', () => root.classList.add('story-ready'));
    video.addEventListener('error', () => root.classList.add('story-video-failed'));

    if (reduced.matches) {
      root.classList.add('story-reduced');
      video.pause();
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('touchmove', onScroll, { passive: true });
      ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((e) =>
        window.addEventListener(e, unlock, { passive: true }));
    }

    reduced.addEventListener?.('change', () => {
      root.classList.toggle('story-reduced', reduced.matches);
      if (reduced.matches) video.pause(); else measure();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause(); else update();
    });

    window.addEventListener('resize', measure, { passive: true });
    measure();

    /* Hata ayıklama/test kancası: rAF'ı beklemeden senkron güncelleme.
       Sekme arka plandayken veya otomatik testte gereklidir. */
    root.scrollStory = {
      update, measure, timeAt,
      state: () => ({ vh: scrollVh(), time: targetTime, duration, storyVh, introVh, totalVh }),
    };
  }
})();
