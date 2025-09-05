// Real Polymarket API client with CORS handling
class ApiService {
  constructor() {
    // Try direct API calls first, fallback to sample data if CORS blocks
    this.GAMMA_BASE = 'https://gamma-api.polymarket.com'
    this.DATA_BASE = 'https://data-api.polymarket.com'
  }

  async getMarketsCandidate() {
    try {
      console.log('🔄 Attempting to fetch markets from Polymarket API...')
      const url = `${this.GAMMA_BASE}/markets?closed=false&limit=100&order=-volume24hr`
      console.log('📡 URL:', url)
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
        }
      })
      
      if (!response.ok) {
        console.warn('❌ API Response not OK:', response.status, response.statusText)
        throw new Error(`Gamma markets failed: ${response.status}`)
      }
      console.log('✅ Markets API successful!')
      const data = await response.json()
      console.log('📊 Markets data received:', data?.data?.length || 0, 'markets')
      return data
    } catch (error) {
      console.warn('❌ Live Markets API failed, using sample data:', error.message)
      console.warn('🔍 This is likely due to CORS restrictions in browser environment')
      return this.getSampleMarkets()
    }
  }

  async getPositions(addr) {
    try {
      console.log('🔄 Attempting to fetch positions for:', addr)
      const url = `${this.DATA_BASE}/positions?user=${addr}`
      console.log('📡 URL:', url)
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; FYP-Demo/1.0)',
        }
      })
      
      if (!response.ok) {
        console.warn('❌ Positions API Response not OK:', response.status, response.statusText)
        throw new Error(`Positions failed: ${response.status}`)
      }
      console.log('✅ Positions API successful!')
      return await response.json()
    } catch (error) {
      console.warn('❌ Live Positions API failed, using sample data:', error.message)
      console.warn('🔍 This is likely due to CORS restrictions in browser environment')
      return this.getSamplePositions()
    }
  }

  async getActivity(addr, limit = 1000) {
    try {
      console.log('🔄 Attempting to fetch activity for:', addr)
      const url = `${this.DATA_BASE}/activity?user=${addr}&limit=${limit}`
      console.log('📡 URL:', url)
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; FYP-Demo/1.0)',
        }
      })
      
      if (!response.ok) {
        console.warn('❌ Activity API Response not OK:', response.status, response.statusText)
        throw new Error(`Activity failed: ${response.status}`)
      }
      console.log('✅ Activity API successful!')
      return await response.json()
    } catch (error) {
      console.warn('❌ Live Activity API failed, using sample data:', error.message)
      console.warn('🔍 This is likely due to CORS restrictions in browser environment')
      return this.getSampleActivity()
    }
  }

  async getValue(addr) {
    try {
      console.log('🔄 Attempting to fetch portfolio value for:', addr)
      const url = `${this.DATA_BASE}/value?user=${addr}`
      console.log('📡 URL:', url)
      const response = await fetch(url, { 
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; FYP-Demo/1.0)',
        }
      })
      
      if (!response.ok) {
        console.warn('❌ Value API Response not OK:', response.status, response.statusText)
        throw new Error(`Value failed: ${response.status}`)
      }
      console.log('✅ Value API successful!')
      return await response.json()
    } catch (error) {
      console.warn('❌ Live Value API failed, using sample data:', error.message)
      console.warn('🔍 This is likely due to CORS restrictions in browser environment')
      return this.getSampleValue()
    }
  }

  resolveProxyFromActivity(activity) {
    const candidates = new Set()
    try {
      const arr = activity?.data || activity || []
      for (const ev of arr) {
        // Common fields where proxy addresses might be found
        if (ev.proxyWallet) candidates.add(ev.proxyWallet)
        if (ev?.walletInfo?.proxyWallet) candidates.add(ev.walletInfo.proxyWallet)
        if (ev?.userProxy) candidates.add(ev.userProxy)
        if (ev?.account?.proxy) candidates.add(ev.account.proxy)
        if (ev?.account?.address) candidates.add(ev.account.address)
        if (ev?.maker?.proxy) candidates.add(ev.maker.proxy)
        if (ev?.taker?.proxy) candidates.add(ev.taker.proxy)
        if (ev?.maker) candidates.add(ev.maker)
        if (ev?.taker) candidates.add(ev.taker)
        if (ev?.wallet) candidates.add(ev.wallet)
        if (ev?.address) candidates.add(ev.address)
        
        // Scan nested objects for 0x fields
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
    
    // Return deduplicated list and best guess
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

  // Fallback sample data methods
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