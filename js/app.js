import { getMarketsCandidate, getPositions, getActivity, getValue, resolveProxyFromActivity, getPositionsCount, marketLink } from './api.js';
import { buildUserFeatures, scoreMarket, reasonsFor } from './ranker.js';
import { isHexAddress, niceUsd, since, daysTo, horizonBucket, chip, reason } from './utils.js';
import { MarketWSS } from './wss.js';


function normTags(tags) {
  if (!tags) return [];
  return tags.map(t => {
    if (typeof t === 'string') return t;
    if (!t) return '';
    return t.name || t.tag || t.slug || t.id || String(t);
  }).filter(Boolean);
}


function valueTotal(v) {
  if (!v) return 0;
  // try several possible shapes
  if (typeof v === 'number') return v;
  if (v.data && (typeof v.data.total !== 'undefined')) return Number(v.data.total)||0;
  if (typeof v.total !== 'undefined') return Number(v.total)||0;
  if (typeof v.totalValue !== 'undefined') return Number(v.totalValue)||0;
  if (typeof v.value !== 'undefined') return Number(v.value)||0;
  return 0;
}

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function enrichWithMarketMeta(items, marketMap) {
  // Mutates items: set category/tags/endDate if missing
  for (const it of (items?.data || items || [])) {
    const cid = it.conditionId || it.condition_id || it.id;
    const m = marketMap.get(cid);
    if (m) {
      if (!it.category && (m.category)) it.category = m.category;
      const tgs = it.tags || (it.market && it.market.tags) || m.tags || [];
      it.tags = (Array.isArray(tgs) ? tgs : []).map(x => (typeof x === 'string') ? x : (x?.name || x?.tag || x?.slug || x?.id)).filter(Boolean);
      if (!it.endDate && m.endDate) it.endDate = m.endDate;
    }
  }
}


function selectTopPositions(positions, n=100) {
  const arr = (positions?.data || positions || []).slice();
  arr.sort((a,b)=> (Number(b.currentValue||b.initialValue||0) - Number(a.currentValue||a.initialValue||0)));
  return arr.slice(0, n);
}

function inferCategoryAndTagsFromTitle(title='') {
  const t = (title || '').toLowerCase();
  const tags = [];
  let category = 'Other';
  const push = (x)=> { if (x && !tags.includes(x)) tags.push(x); };

  // Crypto
  if (/(bitcoin|btc|ethereum|eth|crypto|token|airdrop|defi|solana|chain|coin)/.test(t)) {
    category = 'Crypto';
    if (/bitcoin|btc/.test(t)) push('btc');
    if (/ethereum|eth/.test(t)) push('eth');
    if (/airdrop/.test(t)) push('airdrop');
    push('crypto');
  }
  // Politics / geopolitics
  if (/(election|president|vote|senate|parliament|biden|trump|putin|ukraine|russia|ceasefire|bill|law|policy)/.test(t)) {
    category = 'Politics';
    push('politics'); if (/ukraine|russia|ceasefire|geopolitics/.test(t)) push('geopolitics');
  }
  // Sports
  if (/(nba|nfl|mlb|soccer|football|tennis|match|win the|championship|world cup|olympic)/.test(t)) {
    category = 'Sports'; push('sports');
  }
  // Tech
  if (/(apple|iphone|google|openai|microsoft|ai|launch|chip|nvidia|meta)/.test(t)) {
    category = 'Tech'; push('tech');
  }
  // Entertainment
  if (/(movie|box office|oscars|emmy|grammy|netflix|disney|marvel)/.test(t)) {
    category = 'Entertainment'; push('entertainment');
  }
  // Finance/Macro
  if (/(fed|rate|inflation|cpi|gdp|recession|stocks?|nasdaq|s&p|treasury)/.test(t)) {
    category = 'Business'; push('macro'); push('rates');
  }

  // Time cues
  if (/(this month|by .*\d{4}|by .*\d{1,2}\/\d{1,2}|by .*dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov)/.test(t)) push('deadline');

  // Outcome keywords
  if (/(reach|hit|above|below)/.test(t)) push('price');
  if (/(yes|no)/.test(t)) push('binary');

  return { category, tags };
}

function renderPortfolio() {
  try {
    const n = Number(state.portfolio || 0);
    els.bankroll.textContent = '$' + niceUsd(n, 0);
    const diagPort = document.getElementById('diagPortfolioShown');
    if (diagPort) diagPort.textContent = '$' + niceUsd(n, 0);
  } catch {}
}
function renderPnl() {
  try {
    const pnlEl = els.pnl;
    if (state.pnl === null || state.pnl === undefined || isNaN(Number(state.pnl))) {
      pnlEl.textContent = '—';
      pnlEl.style.color = '#e5e7eb';
    } else {
      const v = Number(state.pnl);
      pnlEl.textContent = '$' + niceUsd(Math.abs(v), 0);
      pnlEl.style.color = v > 0 ? '#22c55e' : (v < 0 ? '#ef4444' : '#e5e7eb');
    }
  } catch {}
}
const els = {
  walletInput: document.getElementById('walletInput'),
  seeFeedBtn: document.getElementById('seeFeedBtn'),
  inputError: document.getElementById('inputError'),
  mockToggle: document.getElementById('mockToggle'),
  liveToggle: document.getElementById('liveToggle'),
  profileCard: document.getElementById('profileCard'),
  bankroll: document.getElementById('bankroll'),
  pnl: document.getElementById('pnl'),
  topCats: document.getElementById('topCats'),
  topTags: document.getElementById('topTags'),
  feed: document.getElementById('feed'),
  cardTemplate: document.getElementById('cardTemplate'),
  emptyState: document.getElementById('emptyState'),
  statusBar: document.getElementById('statusBar'),
  statusDot: document.getElementById('statusDot'),
  statusText: document.getElementById('statusText'),
  statusExtra: document.getElementById('statusExtra'),
  filterCategory: document.getElementById('filterCategory'),
  filterHorizon: document.getElementById('filterHorizon'),
  filterLiquidity: document.getElementById('filterLiquidity'),
  applyFilters: document.getElementById('applyFilters'),
};

let state = {
  wallet: null,
  proxy: null,
  features: null,
  portfolio: 0,
  pnl: null,
  markets: [],
  recs: [],
  live: false,
  wss: null,
};

els.seeFeedBtn.addEventListener('click', onSeeFeed);
els.applyFilters.addEventListener('click', applyFilters);
const proxyBtn = document.getElementById('applyProxy');
if (proxyBtn) proxyBtn.addEventListener('click', async () => {
  const input = document.getElementById('proxyOverride');
  const v = (input?.value || '').trim();
  if (v && v.startsWith('0x') && v.length===42) {
    state.proxy = v;
    await onSeeFeed();
  }
});

async function onSeeFeed() {
  const addr = els.walletInput.value.trim();
  const demo = els.mockToggle.checked;
  const live = els.liveToggle.checked;
  els.inputError.classList.add('hidden');

  if (!demo && !isHexAddress(addr)) {
    els.inputError.classList.remove('hidden');
    return;
  }
  setStatus('loading', 'Fetching your data…');
  try {
    let positions, activity, value, markets;
    if (demo) {
      [positions, activity, value, markets] = await Promise.all([
        fetch('./data/sample_positions.json').then(r=>r.json()),
        fetch('./data/sample_activity.json').then(r=>r.json()),
        fetch('./data/sample_value.json').then(r=>r.json()),
        fetch('./data/sample_markets.json').then(r=>r.json()),
      ]);
      state.wallet = '0xDEMO...';
    } else {
      state.wallet = addr;
      // 1) Always try activity first to find proxy
      const activityTmp = await getActivity(addr, 1000);
      const res = resolveProxyFromActivity(activityTmp);
      let probeList = [];
      if (res?.list?.length) probeList = res.list;
      // Put addr at front for completeness
      probeList = [addr, ...probeList.filter(x => x.toLowerCase() !== addr.toLowerCase())].slice(0, 6);
      // 2) Probe candidates and pick the first with non-empty positions
      let foundProxy = null, foundPositions = null;
      for (const cand of probeList) {
        const { n, raw } = await getPositionsCount(cand);
        if (n > 0) { foundProxy = cand; foundPositions = raw; break; }
      }
      if (foundProxy && foundProxy.toLowerCase() !== addr.toLowerCase()) {
        state.proxy = foundProxy;
      }
      positions = foundPositions || await getPositions(state.proxy || addr);
      value = await getValue(state.proxy || addr);
      // Diagnostics
      const dbox = document.getElementById('diagBox'); if (dbox) dbox.classList.remove('hidden');
      const vurl = `/pdata/value?user=${encodeURIComponent(state.proxy || addr)}`;
      const elUrl = document.getElementById('diagValueUrl'); if (elUrl) elUrl.textContent = vurl;
      const elVOk = document.getElementById('diagValueOk'); if (elVOk) elVOk.textContent = (value ? 'yes' : 'no');
      const elPOk = document.getElementById('diagPosOk'); if (elPOk) elPOk.textContent = ((positions?.data?.length ?? positions?.length ?? 0) > 0 ? 'yes' : 'no');
      const elAOk = document.getElementById('diagActOk'); if (elAOk) elAOk.textContent = 'yes';
      const elVRaw = document.getElementById('diagValueRaw'); if (elVRaw) elVRaw.textContent = JSON.stringify(value, null, 2);
      try {
        if (Array.isArray(value) && value.length && value[0] && (value[0].value !== undefined)) {
          state.portfolio = Number(value[0].value) || 0;
          renderPortfolio();
        }
      } catch {}

      try {
        if (Array.isArray(value) && value.length && value[0] && (value[0].value !== undefined)) {
          const hardPortfolio = Number(value[0].value) || 0;
          state.portfolio = hardPortfolio;
          els.bankroll.textContent = '$' + niceUsd(hardPortfolio, 0);
          const diagPort = document.getElementById('diagPortfolioShown'); if (diagPort) diagPort.textContent = '$' + niceUsd(hardPortfolio, 0);
        }
      } catch {}

      // --- Force portfolio from array payload if present (authoritative) ---
      try {
        if (Array.isArray(value) && value.length && value[0] && (value[0].value !== undefined)) {
          const hardPortfolio = Number(value[0].value) || 0;
          // Render immediately so UI never shows $0 if data is present
          els.bankroll.textContent = '$' + niceUsd(hardPortfolio, 0);
        }
      } catch {}

      activity = activityTmp;
      markets = await getMarketsCandidate();
      // Limit to top 100 positions by value for profiling
      const topPos = selectTopPositions(positions, 100);
      // Build map for enrichment
      const mm = new Map();
      (markets?.data || markets || []).forEach(m => { mm.set(m.conditionId || m.id, m); });
      enrichWithMarketMeta(positions, mm);
      enrichWithMarketMeta(activity, mm);
    }

    // Feature extraction
    // Prefer top 100 for profiling
    const feats = buildUserFeatures({data: (typeof topPos !== 'undefined' ? topPos : (positions?.data||positions||[]))}, activity);
    state.features = feats;

    // Cold start detection
    const posCount = (positions?.data?.length ?? positions?.length ?? 0);
    const actCount = (activity?.data?.length ?? activity?.length ?? 0);
    const coldStart = posCount === 0 && actCount === 0;

    // Profile UI
    els.profileCard.classList.remove('hidden');
    els.bankroll.textContent = '$' + niceUsd(valueTotal(value), 0);
    els.pnl.textContent = '—';
    const proxyDisp = document.getElementById('proxyDisp');
    proxyDisp.textContent = state.proxy ? state.proxy : '(none)';
    els.topCats.innerHTML = '';
    const topCats = Object.entries(feats.cat_counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    for (const [k,v] of topCats) chip(els.topCats, `${k} (${v})`);
    els.topTags.innerHTML = '';
    const topTags = Object.entries(feats.tag_counts).sort((a,b)=>b[1]-a[1]).slice(0,8);
    for (const [k,v] of topTags) chip(els.topTags, `#${k}`);
    const histNote = document.getElementById('historyNote');
    histNote.textContent = `positions: ${posCount} • activity: ${actCount}${coldStart ? ' — using trending blend' : ''}`;
    const posArr = (typeof topPos !== 'undefined' ? topPos : (positions?.data || positions || []));
    let matched = posArr.filter(p => (p.category || (p.tags && p.tags.length))).length;
    if (matched === 0 && posArr.length) {
      // Infer categories/tags from titles for the selected set
      for (const p of posArr) {
        const title = p.title || p.question || p.slug || '';
        const inf = inferCategoryAndTagsFromTitle(title);
        p.category = p.category || inf.category;
        p.tags = p.tags && p.tags.length ? p.tags : inf.tags;
      }
      matched = posArr.filter(p => (p.category || (p.tags && p.tags.length))).length;
    }
    const matchNote = document.getElementById('matchNote');
    matchNote.textContent = `enriched: ${matched}/${posArr.length} positions have category/tags`;
    if (coldStart) { chip(els.topCats, 'Cold start'); }

    // Rank markets
    const raw = (markets?.data || markets || []);
    // Normalize tags
    raw.forEach(m => { m.tags = normTags(m.tags); });
    state.markets = raw.filter(m => m?.endDate && m?.question);
    const seed = hashSeed((state.proxy || state.wallet || 'seed') + '::fyp');
    const scored = state.markets.map((m, i) => ({ m, s: scoreMarket(m, feats), r: reasonsFor(m, feats), t: ((seed ^ i) % 7)/1000 }));
    scored.sort((a,b)=> (b.s + b.t) - (a.s + a.t));
    state.recs = scored.slice(0, 24);

    renderFeed();

    if (live) enableLive(); else disableLive();

    clearStatus();
  } catch (e) {
    console.error(e);
    setStatus('error', 'Failed to fetch data. Try Demo mode.');
  }
}

function applyFilters() {
  renderFeed();
}

function renderFeed() {
  const cat = els.filterCategory.value;
  const hz = els.filterHorizon.value;
  const liqMin = Number(els.filterLiquidity.value || 0);

  els.feed.innerHTML = '';
  let used = 0;
  for (const { m, s, r } of state.recs) {
    if (cat && (m.category !== cat)) continue;
    const days = daysTo(m);
    const hb = horizonBucket(days);
    if (hz && hb !== hz) continue;
    const liq = Number(m.liquidityNum || 0);
    if (liqMin && Math.round((liq/10)) < liqMin) continue;

    const node = els.cardTemplate.content.cloneNode(true);
    const link = node.querySelector('a');
    link.textContent = m.question;
    const targetSlug = m.slug || m.id || m.conditionId || '';
    link.href = targetSlug ? `https://polymarket.com/market/${targetSlug}` : 'https://polymarket.com/';

    const tagbar = node.querySelectorAll('div.flex.flex-wrap.gap-2.text-xs')[0];
    (normTags(m.tags) || []).slice(0,5).forEach(t => {
      const span = document.createElement('span');
      span.className = 'chip px-2 py-1 rounded-lg';
      span.textContent = '#' + t;
      tagbar.appendChild(span);
    });

    node.querySelector('.price-mid').textContent = ((Number(m.bestBid||0)+Number(m.bestAsk||0))/2).toFixed(2);
    node.querySelector('.price-bid').textContent = (Number(m.bestBid||0)).toFixed(2);
    node.querySelector('.price-ask').textContent = (Number(m.bestAsk||0)).toFixed(2);
    node.querySelector('.vol24h').textContent = (Number(m.volume24hr||0)).toLocaleString();
    node.querySelector('.ends-in').textContent = (days !== null && days !== undefined) ? `${days}d` : '—';

    const reasonsEl = node.querySelector('.reasons');
    (r||[]).forEach(tx => reason(reasonsEl, tx));

    node.querySelector('.last-updated').textContent = 'rank ' + (s*100).toFixed(0) + '/100';

    els.feed.appendChild(node);
    used += 1;
  }

  els.emptyState.classList.toggle('hidden', used > 0);
}

function enableLive() {
  if (state.wss) return;
  state.wss = new MarketWSS({
    onUpdate: (msg) => {
      // For this demo, simply update the "last updated" timestamp on any message
      // Advanced: map conditionId to DOM card and patch bid/ask/mid
      els.statusExtra.textContent = 'Last: ' + since(new Date());
    },
    onStatus: ({state: st}) => {
      if (st === 'open') setStatus('live', 'Live updates on');
      else if (st === 'error') setStatus('warn', 'Live failed, offline');
      else if (st === 'closed') setStatus('warn', 'Live closed');
    }
  });
  state.wss.connect();
  // subscribe visible recs
  const ids = state.recs.map(x => x.m.conditionId).filter(Boolean).slice(0, 20);
  state.wss.subscribe(ids);
  // mark cards as live visually
  document.querySelectorAll('.badge.live').forEach(el => el.classList.remove('hidden'));
}

function disableLive() {
  if (state.wss && state.wss.ws) try { state.wss.ws.close(); } catch {}
  state.wss = null;
  document.querySelectorAll('.badge.live').forEach(el => el.classList.add('hidden'));
  clearStatus();
}

function setStatus(kind, text) {
  els.statusBar.classList.remove('hidden');
  els.statusText.textContent = text || '';
  if (kind === 'live') {
    els.statusDot.style.backgroundColor = '#22c55e';
  } else if (kind === 'warn') {
    els.statusDot.style.backgroundColor = '#f59e0b';
  } else if (kind === 'error') {
    els.statusDot.style.backgroundColor = '#ef4444';
  } else {
    els.statusDot.style.backgroundColor = '#f59e0b';
  }
}

function clearStatus() {
  els.statusBar.classList.add('hidden');
  els.statusText.textContent = '';
  els.statusExtra.textContent = '';
}

