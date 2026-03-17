/* ============================================================
   Spaced Repetition Engine — SM-2 Algorithm
   ============================================================ */
const SpacedRepetition = (() => {

  /* quality: 0-5 (0=complete fail, 5=perfect) */
  function review(cardId, quality) {
    const data = FarsStorage.getSRData();
    let card = data[cardId] || {
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      nextReview: Date.now()
    };

    if (quality >= 3) {
      if (card.repetition === 0) card.interval = 1;
      else if (card.repetition === 1) card.interval = 6;
      else card.interval = Math.round(card.interval * card.easeFactor);
      card.repetition++;
    } else {
      card.repetition = 0;
      card.interval = 1;
    }

    card.easeFactor = Math.max(1.3,
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
    card.nextReview = Date.now() + card.interval * 86400000;
    card.lastReview = Date.now();

    data[cardId] = card;
    FarsStorage.saveSRData(data);
    return card;
  }

  function getDueCards(allCardIds) {
    const data = FarsStorage.getSRData();
    const now = Date.now();
    const due = [];
    const newCards = [];

    allCardIds.forEach(id => {
      const card = data[id];
      if (!card) newCards.push(id);
      else if (card.nextReview <= now) due.push(id);
    });

    return { due, newCards, reviewed: allCardIds.length - due.length - newCards.length };
  }

  function getCardStats(cardId) {
    const data = FarsStorage.getSRData();
    return data[cardId] || null;
  }

  function getTotalStats() {
    const data = FarsStorage.getSRData();
    const entries = Object.values(data);
    return {
      totalCards: entries.length,
      mastered: entries.filter(c => c.interval >= 21).length,
      learning: entries.filter(c => c.interval > 1 && c.interval < 21).length,
      newOrFailed: entries.filter(c => c.interval <= 1).length,
      avgEase: entries.length ? (entries.reduce((s, c) => s + c.easeFactor, 0) / entries.length).toFixed(2) : 0
    };
  }

  return { review, getDueCards, getCardStats, getTotalStats };
})();
