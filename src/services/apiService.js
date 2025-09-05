// API service with proper error handling and fallbacks
const GAMMA_BASE = '/gamma';
const DATA_BASE = '/pdata';

class ApiService {
  constructor() {
    this.isProduction = window.location.hostname !== 'localhost';
  }

  async makeRequest(url, options = {}) {
    try {
      console.log(`🌐 Attempting API call: ${url}`);
      const response = await fetch(url, {
        ...options,
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`✅ API call successful: ${url}`, data);
      return data;
    } catch (error) {
      console.error(`❌ API call failed: ${url}`, error);
      throw error;
    }
  }

  async getMarketsCandidate() {
    const url = `${GAMMA_BASE}/markets?closed=false&limit=100&order=-volume24hr`;
    try {
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Markets API failed, using sample data');
      return this.getSampleMarkets();
    }
  }

  async getPositions(addr) {
    const url = `${DATA_BASE}/positions?user=${addr}`;
    try {
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Positions API failed, using sample data');
      return this.getSamplePositions();
    }
  }

  async getActivity(addr, limit = 100) {
    const url = `${DATA_BASE}/activity?user=${addr}&limit=${limit}`;
    try {
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Activity API failed, using sample data');
      return this.getSampleActivity();
    }
  }

  async getValue(addr) {
    const url = `${DATA_BASE}/value?user=${addr}`;
    try {
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Value API failed, using sample data');
      return this.getSampleValue();
    }
  }

  resolveProxyFromActivity(activity) {
    const candidates = new Set();
    try {
      const arr = activity?.data || activity || [];
      for (const ev of arr) {
        // Extract potential proxy addresses
        if (ev.proxyWallet) candidates.add(ev.proxyWallet);
        if (ev?.walletInfo?.proxyWallet) candidates.add(ev.walletInfo.proxyWallet);
        if (ev?.userProxy) candidates.add(ev.userProxy);
        if (ev?.account?.proxy) candidates.add(ev.account.proxy);
        if (ev?.account?.address) candidates.add(ev.account.address);
        
        // Scan for 0x addresses in nested objects
        for (const k in ev) {
          const v = ev[k];
          if (typeof v === 'string' && v.startsWith('0x') && v.length === 42) {
            candidates.add(v);
          }
          if (v && typeof v === 'object') {
            for (const kk in v) {
              const vv = v[kk];
              if (typeof vv === 'string' && vv.startsWith('0x') && vv.length === 42) {
                candidates.add(vv);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error resolving proxy:', error);
    }
    
    const list = [...candidates].filter(x => /^0x[0-9a-fA-F]{40}$/.test(x));
    return { list, bestGuess: list[0] || null };
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

  // Sample data methods
  async getSampleMarkets() {
    try {
      const response = await fetch('./data/sample_markets.json');
      return response.json();
    } catch (error) {
      console.error('Failed to load sample markets:', error);
      return { data: [] };
    }
  }

  async getSamplePositions() {
    try {
      const response = await fetch('./data/sample_positions.json');
      return response.json();
    } catch (error) {
      console.error('Failed to load sample positions:', error);
      return { data: [] };
    }
  }

  async getSampleActivity() {
    try {
      const response = await fetch('./data/sample_activity.json');
      return response.json();
    } catch (error) {
      console.error('Failed to load sample activity:', error);
      return { data: [] };
    }
  }

  async getSampleValue() {
    try {
      const response = await fetch('./data/sample_value.json');
      return response.json();
    } catch (error) {
      console.error('Failed to load sample value:', error);
      return { data: { total: 0 } };
    }
  }

  marketLink(slugOrCondition) {
    if (!slugOrCondition) return 'https://polymarket.com/';
    if (String(slugOrCondition).startsWith('0x')) {
      return `https://polymarket.com/market/${slugOrCondition}`;
    }
    return `https://polymarket.com/event/${slugOrCondition}`;
  }
}

export const apiService = new ApiService();