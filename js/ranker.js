// Feature extraction + scoring (client-side minimal version)
import { horizonBucket, clamp, decileFromLiquidity } from './utils.js';

export function buildUserFeatures(positions=[], activity=[]) {
  const feats = {
    avg_usdc_size: 0,
    median_usdc_size: 0,
    size_std: 0,
    cat_counts: {},
    tag_counts: {},
    yes_share: 0.5,
    price_dist_avg: 0.0,
    horizon_pref: 'medium',
    liq_pref_decile: 5,
  };

  // Sizes from activity.usdcSize if present
  const sizes = [];
  let yesTrades = 0, totalYN = 0;
  let priceDistances = [];
  let horizons = [];

  for (const ev of (activity?.data || activity || [])) {
    const usdc = Number(ev.usdcSize ?? ev.size_usdc ?? ev.value_usd);
    if (!Number.isNaN(usdc) && usdc > 0) sizes.push(usdc);

    const side = String(ev.side || '').toUpperCase();
    const outcome = ev.outcomeIndex;
    if (side && (outcome === 0 || outcome === 1)) { // naive map: 1 = YES sometimes; varies by market schema
      totalYN += 1;
      if (outcome === 1) yesTrades += 1;
    }

    const price = Number(ev.price);
    if (!Number.isNaN(price)) priceDistances.push(Math.abs(price - 0.5));

    const end = ev.endDate || ev.marketEndDate || ev?.market?.endDate;
    if (end && ev.timestamp) {
      const dDays = Math.ceil((new Date(end) - new Date(ev.timestamp)) / 86400000);
      if (Number.isFinite(dDays)) horizons.push(dDays);
    }
  }

  sizes.sort((a,b)=>a-b);
  if (sizes.length) {
    feats.avg_usdc_size = sizes.reduce((a,b)=>a+b,0)/sizes.length;
    feats.median_usdc_size = sizes[Math.floor(sizes.length/2)];
    const mu = feats.avg_usdc_size;
    feats.size_std = Math.sqrt(sizes.reduce((s,x)=>s+(x-mu)*(x-mu),0)/sizes.length);
  }

  feats.yes_share = totalYN ? yesTrades/totalYN : 0.5;
  feats.price_dist_avg = priceDistances.length ? priceDistances.reduce((a,b)=>a+b,0)/priceDistances.length : 0.1;

  // Categories + tags from positions
  for (const p of (positions?.data || positions || [])) {
    const cat = p.category || p.marketCategory || p?.market?.category || p?.event?.category;
    if (cat) feats.cat_counts[cat] = (feats.cat_counts[cat]||0)+1;
    const tags = (p.tags || p?.market?.tags || p?.event?.tags || []).map(x => (typeof x === 'string') ? x : (x?.name || x?.tag || x?.slug || x?.id)).filter(Boolean);
    for (const t of tags) feats.tag_counts[t] = (feats.tag_counts[t]||0)+1;
    // Horizon from positions
    const end = p.endDate || p?.market?.endDate;
    const ts = p.timestamp || p.openedAt;
    if (end && ts) {
      const dDays = Math.ceil((new Date(end) - new Date(ts))/86400000);
      if (Number.isFinite(dDays)) horizons.push(dDays);
    }
  }

  // Horizon pref
  if (horizons.length) {
    horizons.sort((a,b)=>a-b);
    const med = horizons[Math.floor(horizons.length/2)];
    feats.horizon_pref = horizonBucket(med);
  }

  // Liquidity preference: naive fixed to 6; can refine with market join if needed client-side
  feats.liq_pref_decile = 6;

  return feats;
}

function simFromCounts(itemTags=[], countsObj={}) {
  if (!itemTags || !itemTags.length) return 0;
  const sum = itemTags.reduce((s,t)=> s + (countsObj[t] ? Math.log(1+countsObj[t]) : 0), 0);
  return Math.min(1, sum / 10); // squash
}

export function scoreMarket(m, feats) {
  const tags = m.tags || [];
  const tagSim = simFromCounts(tags, feats.tag_counts);
  const catMatch = feats.cat_counts[m.category || ''] ? 1 : 0;

  // Horizon
  const days = Math.ceil((new Date(m.endDate) - Date.now())/86400000);
  const hz = horizonBucket(days);
  const horizonScore = (feats.horizon_pref === hz) ? 1 : (hz === 'unknown' ? 0.5 : 0.2);

  // Risk (distance from 0.5)
  const bid = Number(m.bestBid) || 0;
  const ask = Number(m.bestAsk) || 0;
  const mid = (bid + ask) / 2 || 0.5;
  const dist = Math.abs(mid - 0.5);
  const riskScore = 1 - Math.abs(dist - feats.price_dist_avg); // closer to preferred distance

  // Liquidity
  const liqDec = decileFromLiquidity(m.liquidityNum);
  const liqScore = 1 - Math.abs((liqDec/10) - (feats.liq_pref_decile/10));

  // Momentum: normalize 24h volume roughly
  const vol = Number(m.volume24hr) || 0;
  const volScore = Math.tanh(vol / 20000); // fast-growing then saturate

  const score = 0.25*tagSim + 0.15*catMatch + 0.20*horizonScore + 0.15*riskScore + 0.10*liqScore + 0.10*volScore + 0.05*1; // novelty skip
  return clamp(score, 0, 1);
}

export function reasonsFor(m, feats) {
  const out = [];
  const tags = m.tags || [];
  if (tags.some(t => feats.tag_counts[t])) out.push('tags you favor');
  if (feats.cat_counts[m.category || '']) out.push(`${m.category} you trade often`);
  const days = Math.ceil((new Date(m.endDate) - Date.now())/86400000);
  const hz = horizonBucket(days);
  if (hz === feats.horizon_pref) out.push('matches your usual horizon');
  const bid = Number(m.bestBid) || 0;
  const ask = Number(m.bestAsk) || 0;
  const mid = (bid + ask) / 2 || 0.5;
  const dist = Math.abs(mid - 0.5);
  if (Math.abs(dist - feats.price_dist_avg) < 0.12) out.push('priced for your risk taste');
  const vol = Number(m.volume24hr) || 0;
  if (vol > 10000) out.push('good recent volume');
  return out.slice(0, 3);
}
