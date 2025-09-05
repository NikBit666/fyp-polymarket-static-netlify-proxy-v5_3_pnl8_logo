// Netlify-proxied client for Polymarket public endpoints
// _redirects maps /gamma/* -> https://gamma-api.polymarket.com/:splat
// and /pdata/* -> https://data-api.polymarket.com/:splat

const GAMMA = '/gamma';
const DATA = '/pdata';

class ApiService {
  async getMarketsCandidate() {
    const url = `${GAMMA}/markets?closed=false&limit=1000&order=-volume24hr&include_tag=true`;
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error('Gamma markets failed');
    return r.json();
  }

  async getPositions(addr) {
    const url = `${DATA}/positions?user=${addr}`;
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error('Positions failed');
    return r.json();
  }

  async getActivity(addr, limit = 1000) {
    const url = `${DATA}/activity?user=${addr}&limit=${limit}`;
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error('Activity failed');
    return r.json();
  }

  async getValue(addr) {
    const url = `${DATA}/value?user=${addr}`;
    const r = await fetch(url, { credentials: 'omit' });
    if (!r.ok) throw new Error('Value failed');
    return r.json();
  }

  resolveProxyFromActivity(activity) {
    const candidates = new Set();
    try {
      const arr = activity?.data || activity || [];
      for (const ev of arr) {
        // common fields
        if (ev.proxyWallet) candidates.add(ev.proxyWallet);
        if (ev?.walletInfo?.proxyWallet) candidates.add(ev.walletInfo.proxyWallet);
        if (ev?.userProxy) candidates.add(ev.userProxy);
        if (ev?.account?.proxy) candidates.add(ev.account.proxy);
        if (ev?.account?.address) candidates.add(ev.account.address);
        if (ev?.maker?.proxy) candidates.add(ev.maker.proxy);
        if (ev?.taker?.proxy) candidates.add(ev.taker.proxy);
        if (ev?.maker) candidates.add(ev.maker);
        if (ev?.taker) candidates.add(ev.taker);
        if (ev?.wallet) candidates.add(ev.wallet);
        if (ev?.address) candidates.add(ev.address);
        // scan nested objects for 0x fields
        for (const k in ev) {
          const v = ev[k];
          if (typeof v === 'string' && v.startsWith('0x') && v.length === 42) candidates.add(v);
          if (v && typeof v === 'object') {
            for (const kk in v) {
              const vv = v[kk];
              if (typeof vv === 'string' && vv.startsWith('0x') && vv.length === 42) candidates.add(vv);
            }
          }
        }
      }
    } catch {}
    // return a deduped array plus a "bestGuess" (first one that isn't obviously the input EOA)
    const list = [...candidates].filter(x => /^0x[0-9a-fA-F]{40}$/.test(x));
    return { list, bestGuess: list[0] || null };
  }

  marketLink(slugOrCondition) {
    if (!slugOrCondition) return 'https://polymarket.com/';
    if (String(slugOrCondition).startsWith('0x')) {
      return `https://polymarket.com/market/${slugOrCondition}`;
    }
    return `https://polymarket.com/event/${slugOrCondition}`;
  }

  async getPositionsCount(addr) {
    try {
      const r = await this.getPositions(addr);
      const n = (r?.data?.length ?? r?.length ?? 0);
      return { n, raw: r };
    } catch {
      return { n: 0, raw: null };
    }
  }

  // Sample data fallbacks
  async getSampleMarkets() {
    const response = await fetch('./data/sample_markets.json')
    return response.json()
  }

  async getSamplePositions() {
    const response = await fetch('./data/sample_positions.json')
    return response.json()
  }

  async getSampleActivity() {
    const response = await fetch('./data/sample_activity.json')
    return response.json()
  }

  async getSampleValue() {
    const response = await fetch('./data/sample_value.json')
    return response.json()
  }
}

export const apiService = new ApiService()