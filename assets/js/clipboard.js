/* Keep the selection fallback inside the original tap/click on mobile browsers. */
(function (root) {
  'use strict';
  function copySelection(text) {
    const doc = root.document;
    if (!doc || typeof doc.execCommand !== 'function') return false;
    const area = doc.createElement('textarea');
    const previous = doc.activeElement;
    const x = root.scrollX, y = root.scrollY;
    area.value = text;
    area.readOnly = true;
    area.setAttribute('aria-label', 'Text to copy');
    // Readonly prevents a keyboard popup; focus and an explicit range support iOS.
    area.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:2em;padding:0;border:0;font-size:16px;opacity:0.01;pointer-events:none;';
    try {
      doc.body.append(area);
      area.focus({ preventScroll:true });
      area.select();
      area.setSelectionRange(0, text.length);
      return doc.execCommand('copy') === true;
    } catch { return false; }
    finally {
      area.remove();
      try { previous?.focus({ preventScroll:true }); } catch { /* Copy result remains valid if focus cannot be restored. */ }
      try {
        if (typeof root.scrollTo === 'function' && (root.scrollX !== x || root.scrollY !== y)) root.scrollTo(x, y);
      } catch { /* Scroll restoration must not change copy success. */ }
    }
  }
  function copyText(value) {
    const text = String(value);
    let nativeWrite;
    // Start both within the tap: awaiting a rejection first can lose user activation.
    try {
      if (root.navigator?.clipboard?.writeText) nativeWrite = root.navigator.clipboard.writeText(text);
    } catch { /* Show the selectable result if the browser denies copying. */ }
    const selected = copySelection(text);
    if (nativeWrite) return Promise.resolve(nativeWrite).then(() => true, () => selected);
    return Promise.resolve(selected);
  }
  root.WebClipboard = { copyText };
})(typeof globalThis !== 'undefined' ? globalThis : window);
