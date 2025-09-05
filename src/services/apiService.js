// Simplified API service that handles CORS gracefully
class ApiService {
  constructor() {
    // Try direct API calls first, fallback to samples on CORS
    this.GAMMA_BASE = 'https://gamma-api.polymarket.com'
    this.DATA_BASE = 'https://data-api.polymarket.com'
  }

  async fetchWithFallback(url, sampleMethod) {
    try {
      console.log(`🔄 Attempting API call: ${url}`)
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'Origin': window.location.origin
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`✅ API success:`, data)
      return data
    } catch (error) {
      console.warn(`❌ API failed (${error.message}), using sample data`)
      return await sampleMethod()
    }
  }

  async getMarketsCandidate() {
    const url = `${this.GAMMA_BASE}/markets?closed=false&limit=50&order=-volume24hr`
    return this.fetchWithFallback(url, () => this.getSampleMarkets())
  }

  async getPositions(addr) {
    const url = `${this.DATA_BASE}/positions?user=${addr}`
    return this.fetchWithFallback(url, () => this.getSamplePositions())
  }

  async getActivity(addr, limit = 1000) {
    const url = `${this.DATA_BASE}/activity?user=${addr}&limit=${limit}`
    return this.fetchWithFallback(url, () => this.getSampleActivity())
  }

  async getValue(addr) {
    const url = `${this.DATA_BASE}/value?user=${addr}`
    return this.fetchWithFallback(url, () => this.getSampleValue())
  }

  resolveProxyFromActivity(activity) {
    const candidates = new Set()
    try {
      const arr = activity?.data || activity || []
      for (const ev of arr) {
        // Common proxy fields
        if (ev.proxyWallet) candidates.add(ev.proxyWallet)
        if (ev?.walletInfo?.proxyWallet) candidates.add(ev.walletInfo.proxyWallet)
        if (ev?.userProxy) candidates.add(ev.userProxy)
        if (ev?.account?.proxy) candidates.add(ev.account.proxy)
        if (ev?.maker?.proxy) candidates.add(ev.maker.proxy)
        if (ev?.taker?.proxy) candidates.add(ev.taker.proxy)
        
        // Scan for 0x addresses
        for (const k in ev) {
          const v = ev[k]
          if (typeof v === 'string' && v.startsWith('0x') && v.length === 42) {
            candidates.add(v)
          }
          if (v && typeof v === 'object') {
            for (const kk in v) {
              const vv = v[kk]
              if (typeof vv === 'string' && vv.startsWith('0x') && vv.length === 42) {
                candidates.add(vv)
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Error parsing activity for proxy detection:', e)
    }
    
    const list = [...candidates].filter(x => /^0x[0-9a-fA-F]{40}$/.test(x))
    return { list, bestGuess: list[0] || null }
  }

  async getPositionsCount(addr) {
    try {
      const positions = await this.getPositions(addr)
      const count = positions?.data?.length ?? positions?.length ?? 0
      return { count, raw: positions }
    } catch (error) {
      return { count: 0, raw: null }
    }
  }

  // Sample data methods
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

  marketLink(slugOrCondition) {
    if (!slugOrCondition) return 'https://polymarket.com/'
    if (String(slugOrCondition).startsWith('0x')) {
      return `https://polymarket.com/market/${slugOrCondition}`
    }
    return `https://polymarket.com/event/${slugOrCondition}`
  }
}

export const apiService = new ApiService()