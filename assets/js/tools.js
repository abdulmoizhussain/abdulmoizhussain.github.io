/* Pure tool logic, shared by the pages and dependency-free Node tests. */
(function (root) {
  'use strict';
  const decimalPattern = /^(?:\d+(?:\.\d*)?|\.\d+)$/;
  function decimal(value, name = 'Value') {
    if (!decimalPattern.test(String(value).trim())) throw new Error(`${name} must be a non-negative number.`);
    const result = new root.BigNumber(String(value).trim());
    if (!result.isFinite()) throw new Error(`${name} must be a finite number.`);
    return result;
  }
  function parseLaundry(text) {
    const rows = [], errors = [];
    String(text).split(/\r?\n/).forEach((line, index) => {
      if (!line.trim()) return;
      const match = /^(\d+)\s*[xX×]\s+(.+)$/.exec(line.trim());
      if (!match || !Number.isSafeInteger(Number(match[1]))) {
        errors.push(`Line ${index + 1}: use COUNTx TYPE, for example 2x Shirt.`);
      } else {
        rows.push({ count: Number(match[1]), clotheType: match[2].trim() });
      }
    });
    return { rows, errors };
  }
  function normalizeRates(stored) {
    if (!Array.isArray(stored)) throw new Error('Saved rates must be a list.');
    const seen = new Set();
    return stored.filter(row => row && typeof row.clotheType === 'string' && row.clotheType.trim() && !seen.has(row.clotheType) && seen.add(row.clotheType))
      .map((row, index) => ({ key: `rate-${index}`, clotheType: row.clotheType, rate: typeof row.rate === 'string' || typeof row.rate === 'number' ? String(row.rate) : '' }));
  }
  function calculateLaundry(rows, rates) {
    if (!Array.isArray(rows) || !rows.length) throw new Error('Enter at least one clothes-list row.');
    if (!Array.isArray(rates)) throw new Error('Garment rates must be a list.');
    let total = new root.BigNumber(0), totalClothes = 0;
    const details = new Map();
    for (const row of rows) {
      if (!row || typeof row.clotheType !== 'string' || !row.clotheType.trim()) throw new Error('Every row must have a garment type.');
      if (!Number.isSafeInteger(row.count) || row.count < 0) throw new Error(`Count for ${row.clotheType} must be a non-negative safe integer.`);
      const matches = rates.filter(saved => saved && saved.clotheType === row.clotheType);
      if (matches.length > 1) throw new Error(`More than one rate is configured for ${row.clotheType}. Confirm a single rate.`);
      const rate = decimal(matches.length ? matches[0].rate : '', `Rate for ${row.clotheType}`);
      const amount = rate.times(row.count);
      if (!amount.isFinite()) throw new Error(`Amount for ${row.clotheType} is too large.`);
      total = total.plus(amount);
      if (!total.isFinite()) throw new Error('The payment total is too large.');
      totalClothes += row.count;
      if (!Number.isSafeInteger(totalClothes)) throw new Error('The clothes count is too large.');
      const previous = details.get(row.clotheType);
      details.set(row.clotheType, { clotheType: row.clotheType, count: row.count + (previous ? previous.count : 0), rate: rate.toFixed(), amount: amount.plus(previous ? previous.amount : 0).toFixed() });
    }
    // Multiply and add exact decimals, then round the final payment once.
    return { total: total.toFixed(2, root.BigNumber.ROUND_HALF_UP), totalClothes, totalRows: rows.length, details: [...details.values()] };
  }
  function formatLaundryAmount(value) {
    const amount = decimal(value, 'Amount');
    return amount.toFixed(Math.max(2, amount.decimalPlaces()));
  }
  function gitLinks(input) {
    const value = String(input).trim();
    let host = 'github.com', owner, repo, username = '';
    const ssh = /^(?:ssh:\/\/)?git@([a-z0-9.-]+)[:/]([^/]+)\/([^/]+)\/?$/i.exec(value);
    if (ssh) [, host, owner, repo] = ssh;
    else if (/^https?:\/\//i.test(value)) {
      let url;
      try { url = new URL(value); } catch { throw new Error('Enter a valid repository URL.'); }
      const parts = url.pathname.replace(/\/$/, '').split('/').filter(Boolean);
      if (parts.length !== 2 || url.port || url.search || url.hash) throw new Error('Use the repository URL, without a file path or query.');
      host = url.hostname; [owner, repo] = parts; username = url.username;
    } else {
      const parts = value.split('/');
      if (parts.length !== 2) throw new Error('Enter owner/repository, an HTTPS URL, or an SSH clone URL.');
      [owner, repo] = parts;
    }
    repo = repo.replace(/\.git$/, '');
    if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(host) || !/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo) || /^\.+$/.test(owner) || /^\.+$/.test(repo)) throw new Error('Enter a valid repository owner and name.');
    const links = [
      { label: 'SSH', value: `git@${host}:${owner}/${repo}.git` },
      { label: 'HTTPS', value: `https://${host}/${owner}/${repo}.git` }
    ];
    if (host.toLowerCase() === 'github.com') links.push({ label: 'GitHub CLI', value: `gh repo clone ${owner}/${repo}` });
    if (username) links.push({ label: 'HTTPS with username', value: `https://${username}@${host}/${owner}/${repo}.git` });
    return links;
  }
  function youtubeLink(input) {
    let url;
    try { url = new URL(input.trim()); } catch { throw new Error('Enter a full YouTube URL.'); }
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Enter an HTTP or HTTPS YouTube URL.');
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let id;
    if (host === 'youtu.be') id = url.pathname.split('/')[1];
    else if (['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v');
      else id = /^\/(?:embed|v|shorts|live|u\/\w+)\/([^/]+)/.exec(url.pathname)?.[1];
    }
    if (!id || !/^[\w-]{11}$/.test(id)) throw new Error('Use a YouTube watch, shared, embed, Shorts, or live-video link.');
    return `https://www.youtube.com/watch?v=${id}`;
  }
  function rgbToHex(input) {
    const raw = input.trim().replace(/^rgba?\(\s*/i, '').replace(/\)$/, '');
    const parts = raw.split(/[\s,\/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4 || parts.some(part => !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(part))) throw new Error('Use three channels (0–255) and optional alpha (0–1).');
    const [r, g, b, a = 1] = parts.map(Number);
    if ([r, g, b].some(value => !Number.isInteger(value) || value < 0 || value > 255) || a < 0 || a > 1) throw new Error('RGB channels must be whole numbers from 0–255; alpha must be 0–1.');
    return '#' + [r, g, b, Math.round(a * 255)].map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  function hexToRgb(input) {
    let hex = input.trim().replace(/^#/, '');
    if (!/^(?:[a-f\d]{3}|[a-f\d]{4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(hex)) throw new Error('Use 3, 4, 6, or 8 hexadecimal digits, with or without #.');
    if (hex.length < 5) hex = [...hex].map(char => char + char).join('');
    const channels = hex.match(/../g).map(value => parseInt(value, 16));
    const [r, g, b, a = 255] = channels;
    return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(2)})`;
  }
  function calculateFees(values) {
    const rate = decimal(values.rate, 'Exchange rate'), price = decimal(values.price, 'Price');
    const feePercent = decimal(values.fee, 'Bank fee'), charged = decimal(values.charged, 'Actual charged amount');
    const base = rate.times(price);
    if (base.isZero()) throw new Error('Exchange rate and price must be greater than zero.');
    const fee = base.times(feePercent).div(100), percent = charged.div(base).times(100);
    return { base: base.toFixed(2), fee: fee.toFixed(2), total: base.plus(fee).toFixed(2), percent: percent.toFixed(2), serviceFee: percent.minus(100).toFixed(2) };
  }
  function cleanText(input) { return input.replace(/[^a-zA-Z0-9]+/g, ' ').trim(); }
  function readCounter(value) { return value !== null && /^-?\d+$/.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : 0; }
  const api = { parseLaundry, normalizeRates, calculateLaundry, formatLaundryAmount, gitLinks, youtubeLink, rgbToHex, hexToRgb, calculateFees, cleanText, readCounter };
  root.WebUtils = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
