(function () {
  'use strict';
  const U = window.WebUtils;
  const $ = id => document.getElementById(id);
  function message(id, text) { const el = $(id); if (el) { el.textContent = text; el.hidden = !text; } }
  function storageGet(key, fallback = null) {
    try { return localStorage.getItem(key) ?? fallback; }
    catch { message('storage-status', 'Browser storage is unavailable. Changes will last only while this page is open.'); return fallback; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch { message('storage-status', 'Could not save to browser storage. Keep this page open to retain your changes.'); return false; }
  }
  let toastTimer;
  function toast(text) { message('toast', text); clearTimeout(toastTimer); toastTimer = setTimeout(() => message('toast', ''), 2600); }
  async function copy(value) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value); toast('Copied');
    } catch {
      const area = document.createElement('textarea');
      area.value = value; area.setAttribute('aria-label', 'Text to copy');
      area.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
      const previous = document.activeElement;
      document.body.append(area); area.select();
      let success = false;
      try { success = document.execCommand('copy'); } catch { /* Manual selection remains available in results. */ }
      area.remove(); previous?.focus();
      toast(success ? 'Copied' : 'Copy unavailable. Select the result and copy it manually.');
    }
  }
  function renderLinks(target, links) {
    target.replaceChildren();
    for (const link of links) {
      const row = document.createElement('div'); row.className = 'result-row';
      const label = document.createElement('div'); label.className = 'result-label'; label.textContent = link.label;
      const line = document.createElement('div'); line.className = 'copy-line';
      const code = document.createElement('code'); code.textContent = link.value;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'secondary'; button.textContent = 'Copy';
      button.setAttribute('aria-label', `Copy ${link.label}`); button.addEventListener('click', () => copy(link.value));
      line.append(code, button); row.append(label, line); target.append(row);
    }
  }
  function setupConverter(inputId, resultId, errorId, convert) {
    const input = $(inputId); if (!input) return;
    input.addEventListener('input', () => {
      $(resultId).replaceChildren(); message(errorId, ''); input.removeAttribute('aria-invalid');
      if (!input.value.trim()) return;
      try { renderLinks($(resultId), convert(input.value)); }
      catch (error) { message(errorId, error.message); input.setAttribute('aria-invalid', 'true'); }
    });
  }
  setupConverter('git-input', 'git-results', 'git-error', U.gitLinks);
  setupConverter('youtube-input', 'youtube-results', 'youtube-error', value => [{ label: 'YouTube web URL', value: U.youtubeLink(value) }]);
  if ($('clean-input')) {
    $('clean-input').addEventListener('input', () => { $('clean-output').textContent = U.cleanText($('clean-input').value); });
    $('clean-copy').addEventListener('click', () => {
      const result = U.cleanText($('clean-input').value);
      if (!result) return toast('Enter some text to clean first.');
      $('clean-output').textContent = result; copy(result);
    });
  }
  if ($('laundry-input')) setupLaundry();
  if ($('counter-value')) setupCounter();
  if ($('rgb-input')) setupColors();
  if ($('fee-form')) setupFees();
  if ($('markdown-input')) setupMarkdown();

  function setupLaundry() {
    const input = $('laundry-input');
    let rates = [], rows = [], confirmedText = null;
    const raw = storageGet('ClotheTypeAndRates');
    if (raw) {
      try { rates = U.normalizeRates(JSON.parse(raw)); }
      catch { message('storage-status', 'Saved rates could not be read. The original saved data has been left untouched.'); }
    }
    input.value = storageGet('LAUNDRY_DRAFT', '');
    function hideResults() { $('laundry-results').hidden = true; }
    function renderRates() {
      const list = $('laundry-rates'); list.replaceChildren();
      const active = new Set(U.parseLaundry(input.value).rows.map(row => row.clotheType));
      const visibleRates = rates.filter(item => active.has(item.clotheType))
        .sort((a, b) => a.clotheType.localeCompare(b.clotheType));
      for (const item of visibleRates) {
        const field = document.createElement('div'); field.className = 'rate-field';
        const label = document.createElement('label'); const id = `rate-${rates.indexOf(item)}`; label.htmlFor = id;
        label.textContent = item.clotheType;
        const unit = document.createElement('div'); unit.className = 'input-unit';
        const control = document.createElement('input'); control.id = id; control.type = 'number'; control.min = '0'; control.step = 'any'; control.inputMode = 'decimal'; control.value = item.rate;
        const currency = document.createElement('span'); currency.textContent = 'rs';
        control.addEventListener('input', () => {
          item.rate = control.value; hideResults(); message('laundry-error', '');
          if (storageSet('ClotheTypeAndRates', JSON.stringify(rates))) message('rates-status', 'Rates saved on this device.');
        });
        unit.append(control, currency); field.append(label, unit); list.append(field);
      }
      $('rates-empty').hidden = visibleRates.length > 0;
    }
    renderRates();
    input.addEventListener('input', () => {
      storageSet('LAUNDRY_DRAFT', input.value); confirmedText = null; rows = []; $('laundry-calculate').disabled = true;
      renderRates();
      hideResults(); message('laundry-error', ''); message('laundry-status', 'Confirm rates after editing the list.');
    });
    $('laundry-confirm').addEventListener('click', () => {
      hideResults(); message('laundry-error', ''); message('laundry-status', '');
      const parsed = U.parseLaundry(input.value);
      rows = []; confirmedText = null; $('laundry-calculate').disabled = true;
      if (parsed.errors.length) return message('laundry-error', parsed.errors.join('\n'));
      if (!parsed.rows.length) return message('laundry-error', 'Paste your clothes list first, with one COUNTx TYPE entry per line.');
      rows = parsed.rows; confirmedText = input.value;
      for (const type of [...new Set(rows.map(row => row.clotheType))].sort()) {
        if (!rates.some(rate => rate.clotheType === type)) rates.push({ key: `rate-${rates.length}`, clotheType: type, rate: '' });
      }
      renderRates(); $('laundry-calculate').disabled = false;
      message('laundry-status', `${rows.length} rows ready. Check the rates, then calculate the total.`);
    });
    $('laundry-calculate').addEventListener('click', () => {
      message('laundry-error', ''); hideResults();
      if (confirmedText !== input.value || !rows.length) return message('laundry-error', 'Confirm the current clothes list first.');
      try {
        const result = U.calculateLaundry(rows, rates);
        $('laundry-payment').textContent = `${result.total} rs`;
        $('laundry-count').textContent = String(result.totalClothes); $('laundry-rows').textContent = String(result.totalRows);
        const body = $('laundry-details'); body.replaceChildren();
        for (const item of result.details) {
          const row = document.createElement('tr');
          for (const value of [item.clotheType, item.count, item.rate, new BigNumber(item.amount).toFixed(2)]) {
            const cell = document.createElement('td'); cell.textContent = String(value); row.append(cell);
          }
          body.append(row);
        }
        $('laundry-results').hidden = false; message('laundry-status', 'Total calculated for all confirmed rows.');
        storageSet('ClotheTypeAndRates', JSON.stringify(rates));
      } catch (error) { message('laundry-error', error.message); }
    });
  }

  function setupCounter() {
    let value = U.readCounter(storageGet('COUNTER')), previous = null, start = null;
    const output = $('counter-value');
    function save() { const saved = storageSet('COUNTER', String(value)); message('counter-status', saved ? 'Saved on this device.' : 'Value is available in this tab only.'); }
    function render() { output.textContent = String(value); }
    function change(delta) {
      if (!Number.isSafeInteger(value + delta)) return toast('Counter limit reached.');
      value += delta; render(); save();
    }
    render();
    $('counter-plus').addEventListener('click', () => change(1)); $('counter-minus').addEventListener('click', () => change(-1));
    $('counter-save').addEventListener('click', () => { save(); toast($('counter-status').textContent); });
    $('counter-reset').addEventListener('click', () => {
      previous = value; value = 0; render(); save(); $('counter-undo').hidden = false;
    });
    $('counter-undo').addEventListener('click', () => { if (previous !== null) { value = previous; previous = null; render(); save(); $('counter-undo').hidden = true; } });
    window.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
      const delta = { ArrowUp:1, ArrowRight:1, ArrowDown:-1, ArrowLeft:-1 }[event.key];
      if (delta) { event.preventDefault(); change(delta); }
    });
    const pad = $('counter-pad');
    pad.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      start = { x:event.clientX, y:event.clientY, id:event.pointerId }; pad.setPointerCapture(event.pointerId);
    });
    pad.addEventListener('pointerup', event => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y; start = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) <= 60) return;
      change(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : -1) : (dy < 0 ? 1 : -1));
    });
    pad.addEventListener('pointercancel', () => { start = null; });
    window.addEventListener('storage', event => { if (event.key === 'COUNTER') { value = U.readCounter(event.newValue); render(); message('counter-status', 'Updated from another tab.'); } });
  }

  function setupColors() {
    for (const [prefix, convert] of [['rgb', U.rgbToHex], ['hex', U.hexToRgb]]) {
      const input = $(`${prefix}-input`);
      input.addEventListener('input', () => {
        $(`${prefix}-results`).replaceChildren(); message(`${prefix}-error`, ''); input.removeAttribute('aria-invalid');
        $(`${prefix}-swatch`).style.backgroundColor = 'transparent';
        if (!input.value.trim()) return;
        try {
          const value = convert(input.value);
          renderLinks($(`${prefix}-results`), [{ label: prefix === 'rgb' ? 'HEX with alpha' : 'RGBA', value }]);
          $(`${prefix}-swatch`).style.backgroundColor = value;
        } catch (error) { message(`${prefix}-error`, error.message); input.setAttribute('aria-invalid', 'true'); }
      });
    }
  }
  function setupFees() {
    function calculate() {
      message('fee-error', ''); $('fee-results').hidden = true;
      try {
        const result = U.calculateFees({ rate:$('fee-rate').value, price:$('fee-price').value, fee:$('fee-percent').value, charged:$('fee-charged').value });
        for (const [key, value] of Object.entries(result)) $(`fee-${key}-result`).textContent = value + (['percent','serviceFee'].includes(key) ? '%' : '');
        $('fee-results').hidden = false;
      } catch (error) { message('fee-error', error.message); }
    }
    $('fee-form').addEventListener('input', calculate); $('fee-form').addEventListener('submit', event => event.preventDefault()); calculate();
  }
  function setupMarkdown() {
    const input = $('markdown-input'), preview = $('markdown-preview'), drop = $('markdown-drop');
    let loadId = 0;
    function render() {
      const html = marked.parse(input.value, { gfm:true, breaks:false });
      preview.innerHTML = DOMPurify.sanitize(html, { FORBID_TAGS:['style','form','input','button','iframe'], FORBID_ATTR:['style'] });
      $('markdown-placeholder').hidden = !!input.value;
    }
    async function loadFile(file) {
      if (!file) return;
      const currentId = ++loadId;
      if (!/\.(?:md|markdown|txt)$/i.test(file.name)) return message('markdown-error', 'Choose a .md, .markdown, or .txt file.');
      if (file.size > 2 * 1024 * 1024) return message('markdown-error', 'Choose a text file smaller than 2 MB.');
      try { const text = await file.text(); if (currentId !== loadId) return; input.value = text; render(); message('markdown-error', ''); message('markdown-status', `Opened ${file.name}`); }
      catch { message('markdown-error', 'Could not read that file. Try another file or paste its text.'); }
    }
    input.addEventListener('input', () => { loadId++; render(); });
    $('markdown-file').addEventListener('change', event => loadFile(event.target.files[0]));
    drop.addEventListener('dragover', event => { event.preventDefault(); drop.classList.add('dragging'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('dragging'));
    drop.addEventListener('drop', event => { event.preventDefault(); drop.classList.remove('dragging'); loadFile(event.dataTransfer.files[0]); });
    render();
  }

  // Remove only the previous CRA worker belonging to this exact site path.
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    const script = document.querySelector('script[data-app]');
    const siteBase = new URL('../../', script.src);
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        const worker = registration.active || registration.waiting || registration.installing;
        if (registration.scope === siteBase.href && worker && new URL(worker.scriptURL).pathname === new URL('service-worker.js', siteBase).pathname) registration.unregister().catch(() => {});
      }
    }).catch(() => {});
  }
})();
