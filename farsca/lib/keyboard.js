/* ============================================================
   Persian On-Screen Keyboard
   ============================================================ */
const FarsKeyboard = (() => {
  const ROWS = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
    ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
    ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'ژ'],
  ];

  const SHIFT_MAP = {
    'ض': 'ً', 'ص': 'ٌ', 'ث': 'ٍ', 'ق': 'ریال', 'ف': 'ّ', 'غ': 'َ',
    'ع': 'ُ', 'ه': 'ِ', 'خ': ']', 'ح': '[', 'ج': '}', 'چ': '{',
    'ش': 'ؤ', 'س': 'ئ', 'ی': 'ي', 'ب': 'إ', 'ل': 'أ', 'ا': 'آ',
    'ت': 'ة', 'ن': '»', 'م': '«', 'ک': ':', 'گ': '؛',
    'ظ': 'ك', 'ط': 'ٓ', 'ز': 'ژ', 'ر': 'ٰ', 'ذ': 'ٔ',
    'د': 'ٕ', 'پ': 'ء', 'و': ',', 'ژ': '.'
  };

  let targetInput = null;
  let isShift = false;
  let container = null;
  let onInput = null;

  function create(targetSelector, opts = {}) {
    onInput = opts.onInput || null;
    container = document.createElement('div');
    container.className = 'fars-keyboard';
    container.innerHTML = '';

    ROWS.forEach((row, ri) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'kb-row';

      if (ri === 2) {
        const shiftBtn = _makeKey('Shift', 'kb-special', () => toggleShift());
        shiftBtn.id = 'kb-shift';
        rowDiv.appendChild(shiftBtn);
      }

      row.forEach(ch => {
        const btn = _makeKey(ch, 'kb-key', () => insertChar(isShift && SHIFT_MAP[ch] ? SHIFT_MAP[ch] : ch));
        btn.dataset.base = ch;
        btn.dataset.shift = SHIFT_MAP[ch] || ch;
        rowDiv.appendChild(btn);
      });

      if (ri === 2) {
        rowDiv.appendChild(_makeKey('⌫', 'kb-special', () => doBackspace()));
      }

      container.appendChild(rowDiv);
    });

    /* Bottom row: space, ZWNJ, etc */
    const bottomRow = document.createElement('div');
    bottomRow.className = 'kb-row kb-bottom';
    bottomRow.appendChild(_makeKey('‌', 'kb-special kb-zwnj', () => insertChar('\u200C'), 'نیم‌فاصله'));
    bottomRow.appendChild(_makeKey('فاصله', 'kb-space', () => insertChar(' ')));
    bottomRow.appendChild(_makeKey('↵', 'kb-special', () => { if (onInput) onInput('enter'); }));
    container.appendChild(bottomRow);

    return container;
  }

  function attachTo(inputEl) {
    targetInput = inputEl;
  }

  function insertChar(ch) {
    if (!targetInput) return;
    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const val = targetInput.value;
    targetInput.value = val.slice(0, start) + ch + val.slice(end);
    targetInput.selectionStart = targetInput.selectionEnd = start + ch.length;
    targetInput.focus();
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    if (isShift) toggleShift();
    if (onInput) onInput('char', ch);
  }

  function doBackspace() {
    if (!targetInput) return;
    const start = targetInput.selectionStart;
    const end = targetInput.selectionEnd;
    const val = targetInput.value;
    if (start !== end) {
      targetInput.value = val.slice(0, start) + val.slice(end);
      targetInput.selectionStart = targetInput.selectionEnd = start;
    } else if (start > 0) {
      targetInput.value = val.slice(0, start - 1) + val.slice(start);
      targetInput.selectionStart = targetInput.selectionEnd = start - 1;
    }
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    if (onInput) onInput('backspace');
  }

  function toggleShift() {
    isShift = !isShift;
    const shiftBtn = document.getElementById('kb-shift');
    if (shiftBtn) shiftBtn.classList.toggle('active', isShift);
    container.querySelectorAll('.kb-key').forEach(btn => {
      btn.textContent = isShift ? btn.dataset.shift : btn.dataset.base;
    });
  }

  function _makeKey(label, cls, handler, title) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cls;
    btn.textContent = label;
    if (title) btn.title = title;
    btn.addEventListener('click', e => { e.preventDefault(); handler(); });
    return btn;
  }

  return { create, attachTo, insertChar };
})();
