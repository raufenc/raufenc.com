/* IHO Unit 2 Game Engines — No dependency, browser/global friendly. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.IHOGameEngines = factory();
})(typeof self !== 'undefined' ? self : this, function(){
  'use strict';

  const DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
  function normalizeArabic(input){
    return String(input || '')
      .replace(DIACRITICS, '')
      .replace(/ـ/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[،؛؟.!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function createRng(seed){
    let h = 2166136261 >>> 0;
    String(seed || 'unit2').split('').forEach(ch => { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); });
    return function(){
      h += 0x6D2B79F5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, seed){
    const out = [...arr]; const rnd = createRng(seed);
    for(let i=out.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [out[i],out[j]]=[out[j],out[i]]; }
    return out;
  }
  function take(arr, n){ return arr.slice(0, Math.max(0, n || arr.length)); }

  function mapById(list){ const m = {}; (list||[]).forEach(x => { m[x.id] = x; }); return m; }
  function getBank(data, key){ return data && data.banks ? data.banks[key] : null; }
  function getPriceSet(data, id){ return (data.price_sets || []).find(x => x.id === id); }
  function getDialogue(data, id){ return (data.dialogues || []).find(x => x.id === id); }

  function poolByConfig(data, poolConfig, seed){
    let list = data.vocabulary || [];
    if(poolConfig && poolConfig.categories) list = list.filter(w => poolConfig.categories.includes(w.category));
    if(poolConfig && poolConfig.word_ids) list = list.filter(w => poolConfig.word_ids.includes(w.id));
    if(poolConfig && poolConfig.tags) list = list.filter(w => (w.tags || []).some(t => poolConfig.tags.includes(t)));
    list = shuffle(list, seed || 'pool');
    if(poolConfig && poolConfig.limit) list = take(list, poolConfig.limit);
    return list;
  }

  const engines = {
    flashcards(config, data, opts={}){
      const cards = poolByConfig(data, config.pool || {categories:['grocery','fruit','vegetable']}, opts.seed)
        .map(w => ({ id:w.id, front:w.ar, back:w.tr, emoji:w.emoji, example:w.examples && w.examples[0], audio_key:w.audio_key, raw:w }));
      return { type:'flashcards', cards };
    },
    matching(config, data, opts={}){
      const byId = mapById(data.vocabulary);
      const ids = config.word_ids || [];
      const pairs = ids.map(id => byId[id]).filter(Boolean).map(w => ({ id:w.id, left:w.ar, right:w.emoji, emoji:w.emoji, audio_key:w.audio_key }));
      return { type:'matching', left:shuffle(pairs.map(p => ({ id:p.id, text:p.left, emoji:p.emoji })), opts.seed+'L'), right:shuffle(pairs.map(p => ({ id:p.id, text:p.right, emoji:p.emoji })), opts.seed+'R'), pairs };
    },
    category_sort(config, data, opts={}){
      const byId = mapById(data.vocabulary);
      const ids = config.word_ids || [];
      const items = shuffle(ids.map(id => byId[id]).filter(Boolean).map(w => ({ id:w.id, text:w.ar, tr:w.tr, category:w.category, emoji:w.emoji })), opts.seed);
      return { type:'category_sort', categories:config.categories || [], items };
    },
    shopping_list(config, data, opts={}){
      const byId = mapById(data.vocabulary);
      const pool = (config.word_ids || []).map(id => byId[id]).filter(Boolean);
      const shuffled = shuffle(pool, opts.seed || 'shopping');
      const targets = take(shuffled, config.target_count || 5).map(w => ({ id:w.id, text:w.ar, tr:w.tr, emoji:w.emoji }));
      const shelf = shuffle(take(shuffled, config.shelf_count || 12).map(w => ({ id:w.id, text:w.ar, tr:w.tr, emoji:w.emoji })), (opts.seed||'shopping')+'shelf');
      return { type:'shopping_list', targets, shelf, targetIds:targets.map(x => x.id) };
    },
    price_quiz(config, data, opts={}){
      const ps = getPriceSet(data, config.price_set);
      const items = ps ? ps.items : [];
      const questions = shuffle(items, opts.seed || 'price').slice(0, config.question_count || items.length).map(item => {
        const optsPrices = shuffle([...new Set(items.map(x => x.price).concat([item.price+1, Math.max(1,item.price-1)]))], item.ar).slice(0,4);
        if(!optsPrices.includes(item.price)) optsPrices[0] = item.price;
        return { id:'price_'+item.word_id, q_ar:'بِكَم '+item.ar+'؟', q_tr:'', answer:item.price, options:shuffle(optsPrices, item.word_id).map(p => ({ value:p, label:p+' ليرات' })), item };
      });
      return { type:'price_quiz', price_set:ps, questions };
    },
    comparative_quiz(config, data, opts={}){
      const ps = getPriceSet(data, config.price_set);
      const items = ps ? ps.items : [];
      const pairs = [];
      for(let i=0;i<items.length;i++) for(let j=i+1;j<items.length;j++) if(items[i].price !== items[j].price) pairs.push([items[i], items[j]]);
      const questions = shuffle(pairs, opts.seed || 'cmp').slice(0, config.question_count || 6).map(([a,b], idx) => {
        const cheaper = a.price < b.price ? a : b;
        const expensive = a.price > b.price ? a : b;
        // Tek doğru ifade + iki yanlış (önceki sürümde iki şık da doğruydu)
        const correct = `${cheaper.ar} أَرْخَص مِن ${expensive.ar}`;
        const wrong1  = `${cheaper.ar} أَغْلى مِن ${expensive.ar}`;
        const wrong2  = `${expensive.ar} أَرْخَص مِن ${cheaper.ar}`;
        const options = shuffle([correct, wrong1, wrong2], 'cmp'+idx);
        return { id:'cmp_'+idx, q_ar:`أَيّ جُمْلَة صَحيحَة؟ (${a.ar}: ${a.price}₺ / ${b.ar}: ${b.price}₺)`, q_tr:'', options, answer:correct, items:[a,b] };
      });
      return { type:'comparative_quiz', questions };
    },
    fill_blank(config, data, opts={}){
      const items = Array.isArray(config.items) ? config.items : getBank(data, config.items) || [];
      return { type:'fill_blank', items:shuffle(items, opts.seed || 'fill') };
    },
    sentence_order(config, data, opts={}){
      const items = Array.isArray(config.items) ? config.items : getBank(data, config.items) || [];
      return { type:'sentence_order', items:shuffle(items, opts.seed || 'sentence').map(x => ({...x, shuffled:shuffle(x.tokens, (opts.seed||'sentence')+x.id)})) };
    },
    dialogue_order(config, data, opts={}){
      const d = getDialogue(data, config.dialogue_id);
      const lines = d ? d.lines : [];
      return { type:'dialogue_order', dialogue:d, lines:shuffle(lines.map(l => ({ line_no:l.line_no, speaker:l.speaker, ar:l.ar, tr:l.tr })), opts.seed || 'dialogue'), answer:lines.map(l => l.line_no) };
    },
    word_search(config, data, opts={}){
      const words = (config.words || []).map(w => normalizeArabic(w).replace(/\s+/g,''));
      const size = config.size || Math.max(10, ...words.map(w => w.length));
      const rnd = createRng(opts.seed || 'wordsearch');
      const letters = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');
      const grid = Array.from({length:size}, () => Array.from({length:size}, () => ''));
      const placements = [];
      function canPlace(word, r, c, dr, dc){
        for(let i=0;i<word.length;i++){
          const rr=r+dr*i, cc=c+dc*i;
          if(rr<0||cc<0||rr>=size||cc>=size) return false;
          if(grid[rr][cc] && grid[rr][cc] !== word[i]) return false;
        }
        return true;
      }
      function place(word){
        const dirs = [[0,1],[1,0]];
        for(let attempt=0; attempt<200; attempt++){
          const [dr,dc]=dirs[Math.floor(rnd()*dirs.length)];
          const r=Math.floor(rnd()*size), c=Math.floor(rnd()*size);
          if(canPlace(word,r,c,dr,dc)){
            for(let i=0;i<word.length;i++) grid[r+dr*i][c+dc*i]=word[i];
            placements.push({word,r,c,dr,dc}); return true;
          }
        }
        return false;
      }
      words.forEach(place);
      for(let r=0;r<size;r++) for(let c=0;c<size;c++) if(!grid[r][c]) grid[r][c]=letters[Math.floor(rnd()*letters.length)];
      return { type:'word_search', size, grid, words, placements };
    },
    memory(config, data, opts={}){
      const byId = mapById(data.vocabulary);
      const cards = [];
      (config.word_ids || []).forEach(id => {
        const w = byId[id]; if(!w) return;
        cards.push({ id:w.id+'_ar', pair:w.id, text:w.ar, kind:'ar', emoji:w.emoji });
        cards.push({ id:w.id+'_em', pair:w.id, text:w.emoji, kind:'emoji', emoji:w.emoji });
      });
      return { type:'memory', cards:shuffle(cards, opts.seed || 'memory') };
    },
    odd_one_out(config, data, opts={}){
      const items = Array.isArray(config.items) ? config.items : getBank(data, config.items) || [];
      return { type:'odd_one_out', items:shuffle(items, opts.seed || 'odd') };
    },
    multiple_choice(config, data, opts={}){
      const items = Array.isArray(config.items) ? config.items : getBank(data, config.items) || [];
      return { type:'multiple_choice', items:shuffle(items, opts.seed || 'mc').map(q => ({...q, options:shuffle(q.options, (opts.seed||'mc')+q.id)})) };
    },
    roleplay(config, data, opts={}){
      const ps = getPriceSet(data, config.price_set);
      const items = ps ? shuffle(ps.items, opts.seed || 'role') : [];
      const a = items[0], b = items[1] || items[0];
      const prompt = {
        roles: config.roles || ['البائِع','المُشْتَري'],
        product_a: a, product_b: b,
        must_use_ar: ['أَهْلًا وَسَهْلًا، أَيّ خِدْمَة؟','بِكَم ...؟','... بِـ ... ليرات','أَرْخَص مِن / أَغْلى مِن','شُكْرًا، مَعَ السَّلامَة'],
        prompt_tr: ''
      };
      return { type:'roleplay', prompt };
    },
    listening_select(config, data, opts={}){
      return { type:'listening_select', items:shuffle(config.items || [], opts.seed || 'listen') };
    }
  };

  function createGame(gameOrType, data, opts={}){
    let type, config, meta={};
    if(typeof gameOrType === 'string'){ type = gameOrType; config = opts.config || {}; }
    else { type = gameOrType.type; config = gameOrType.config || {}; meta = gameOrType; }
    if(!engines[type]) throw new Error('Unknown game engine type: ' + type);
    return { meta, ...engines[type](config, data, opts) };
  }

  function isCorrect(expected, actual){
    if(Array.isArray(expected) && Array.isArray(actual)) return expected.join('|') === actual.join('|');
    return normalizeArabic(expected) === normalizeArabic(actual) || String(expected) === String(actual);
  }

  function gradeMultipleChoice(item, choice){ return isCorrect(item.answer, choice); }
  function scoreAnswers(pairs){
    let correct = 0; pairs.forEach(p => { if(isCorrect(p.expected, p.actual)) correct++; });
    return { correct, total:pairs.length, percent:pairs.length ? Math.round(correct*100/pairs.length) : 0 };
  }

  return { normalizeArabic, createRng, shuffle, poolByConfig, createGame, engines, isCorrect, gradeMultipleChoice, scoreAnswers };
});
