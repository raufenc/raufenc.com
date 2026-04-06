/* search.js - Turkce arama motoru (ters indeks) */
(function(){
  function normalize(s) {
    return s.toLowerCase()
      .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
      .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')
      .replace(/İ/g,'i').replace(/Ö/g,'o').replace(/Ü/g,'u')
      .replace(/Ş/g,'s').replace(/Ç/g,'c').replace(/Ğ/g,'g');
  }

  function tokenize(text) {
    return normalize(text).split(/\s+/).filter(w => w.length > 1);
  }

  let conceptIndex = null; // word -> Set of concept indices
  let refIndex = null;     // word -> Set of ref indices

  function buildIndex() {
    if (conceptIndex) return;
    conceptIndex = {};
    refIndex = {};

    DATA.concepts.forEach((c, i) => {
      const words = tokenize([c.term, c.code, c.desc, c.family, c.sub].join(' '));
      words.forEach(w => {
        if (!conceptIndex[w]) conceptIndex[w] = new Set();
        conceptIndex[w].add(i);
      });
    });

    DATA.references.forEach((r, i) => {
      const words = tokenize([r.code, r.text].join(' '));
      words.forEach(w => {
        if (!refIndex[w]) refIndex[w] = new Set();
        refIndex[w].add(i);
      });
    });
  }

  function search(query, limit) {
    buildIndex();
    limit = limit || 50;
    const tokens = tokenize(query);
    if (tokens.length === 0) return { concepts: [], references: [] };

    // Score concepts
    const cScores = {};
    tokens.forEach(t => {
      // Exact match
      if (conceptIndex[t]) {
        conceptIndex[t].forEach(idx => { cScores[idx] = (cScores[idx]||0) + 3; });
      }
      // Prefix match
      Object.keys(conceptIndex).forEach(w => {
        if (w.startsWith(t) && w !== t) {
          conceptIndex[w].forEach(idx => { cScores[idx] = (cScores[idx]||0) + 1; });
        }
      });
    });

    // Score references
    const rScores = {};
    tokens.forEach(t => {
      if (refIndex[t]) {
        refIndex[t].forEach(idx => { rScores[idx] = (rScores[idx]||0) + 3; });
      }
      Object.keys(refIndex).forEach(w => {
        if (w.startsWith(t) && w !== t) {
          refIndex[w].forEach(idx => { rScores[idx] = (rScores[idx]||0) + 1; });
        }
      });
    });

    const concepts = Object.entries(cScores)
      .sort((a,b) => b[1]-a[1])
      .slice(0, limit)
      .map(([idx]) => DATA.concepts[idx]);

    const references = Object.entries(rScores)
      .sort((a,b) => b[1]-a[1])
      .slice(0, Math.min(limit, 20))
      .map(([idx]) => DATA.references[idx]);

    return { concepts, references };
  }

  function quickFilter(query, items, fields) {
    const q = normalize(query);
    return items.filter(item =>
      fields.some(f => normalize(item[f] || '').includes(q))
    );
  }

  window.Search = { normalize, tokenize, search, quickFilter, buildIndex };
})();
