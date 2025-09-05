export function isHexAddress(addr) {
  if (typeof addr !== 'string') return false;
  if (!addr.startsWith('0x')) return false;
  return addr.length === 42 && /^0x[0-9a-fA-F]{40}$/.test(addr);
}

export function niceUsd(n, maxFrac=0) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: maxFrac, maximumFractionDigits: maxFrac });
}

export function nicePct(p, digits=0) {
  if (p === null || p === undefined || Number.isNaN(p)) return '—';
  return (Number(p) * 100).toFixed(digits) + '%';
}

export function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

export function daysTo(endLike) {
  const pick = (m) => m?.endDate || m?.closeDate || m?.closingTime || m?.resolutionTime || m;
  const endIso = pick(endLike);
  if (!endIso) return null;
  const now = new Date();
  const end = new Date(endIso);
  if (isNaN(end.getTime())) return null;
  const ms = end.getTime() - now.getTime();
  const d = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Math.max(0, d);
}

export function horizonBucket(days) {
  if (days === null) return 'unknown';
  if (days <= 7) return 'short';
  if (days <= 45) return 'medium';
  return 'long';
}

export function since(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return d.toLocaleDateString();
}

export function chip(el, text) {
  const span = document.createElement('span');
  span.className = 'chip px-2 py-1 rounded-lg';
  span.textContent = text;
  el.appendChild(span);
}

export function reason(el, text) {
  const span = document.createElement('span');
  span.className = 'chip px-2 py-1 rounded-lg';
  span.textContent = text;
  el.appendChild(span);
}

export function decileFromLiquidity(liq) {
  if (liq === null || liq === undefined) return 0;
  // liquidityNum is an arbitrary score; map via simple thresholds
  const n = Number(liq) || 0;
  if (n <= 10) return 1;
  if (n <= 20) return 2;
  if (n <= 30) return 3;
  if (n <= 40) return 4;
  if (n <= 50) return 5;
  if (n <= 60) return 6;
  if (n <= 70) return 7;
  if (n <= 80) return 8;
  if (n <= 90) return 9;
  return 10;
}
