import { apiService } from './apiService.js'
import { rankerService } from './rankerService.js'
import { uiService } from './uiService.js'
import { utils } from '../utils/index.js'

class AppService {
  constructor() {
    this.state = {
      wallet: null,
      proxy: null,
      features: null,
      portfolio: 0,
      pnl: null,
      markets: [],
      recs: [],
      live: false,
      isDemo: false
    }
    
    this.elements = {}
  }

  initialize() {
    console.log('🚀 Initializing FYP for Polymarket app...');
    this.bindElements()
    this.bindEvents()
    console.log('✅ App initialized successfully');
  }

  bindElements() {
    this.elements = {
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
      emptyState: document.getElementById('emptyState'),
      statusBar: document.getElementById('statusBar'),
      statusDot: document.getElementById('statusDot'),
      statusText: document.getElementById('statusText'),
      statusExtra: document.getElementById('statusExtra'),
      filterCategory: document.getElementById('filterCategory'),
      filterHorizon: document.getElementById('filterHorizon'),
      filterLiquidity: document.getElementById('filterLiquidity'),
      applyFilters: document.getElementById('applyFilters'),
      proxyDisp: document.getElementById('proxyDisp'),
      proxyOverride: document.getElementById('proxyOverride'),
      applyProxy: document.getElementById('applyProxy'),
      historyNote: document.getElementById('historyNote'),
      matchNote: document.getElementById('matchNote')
    }
  }

  bindEvents() {
    this.elements.seeFeedBtn?.addEventListener('click', () => this.onSeeFeed())
    this.elements.applyFilters?.addEventListener('click', () => this.applyFilters())
    this.elements.applyProxy?.addEventListener('click', () => this.applyProxy())
  }

  async onSeeFeed() {
    const addr = this.elements.walletInput?.value?.trim() || ''
    const demo = this.elements.mockToggle?.checked || false

    console.log(`🎯 Starting feed generation - Demo: ${demo}, Address: ${addr}`);

    this.elements.inputError?.classList.add('hidden')

    if (!demo && !utils.isHexAddress(addr)) {
      this.elements.inputError?.classList.remove('hidden')
      return
    }

    this.setStatus('loading', 'Fetching your data…')

    try {
      let positions, activity, value, markets
      this.state.isDemo = demo

      if (demo) {
        console.log('📊 Using demo mode with sample data');
        [positions, activity, value, markets] = await Promise.all([
          apiService.getSamplePositions(),
          apiService.getSampleActivity(),
          apiService.getSampleValue(),
          apiService.getSampleMarkets(),
        ])
        this.state.wallet = '0xDEMO...'
      } else {
        console.log('🔍 Fetching real data for wallet:', addr);
        this.state.wallet = addr
        
        // Try to get activity first to find proxy
        console.log('📈 Fetching activity data...');
        const activityTmp = await apiService.getActivity(addr, 1000)
        const res = apiService.resolveProxyFromActivity(activityTmp)
        
        let probeList = []
        if (res?.list?.length) probeList = res.list
        probeList = [addr, ...probeList.filter(x => x.toLowerCase() !== addr.toLowerCase())].slice(0, 6)
        
        console.log('🔍 Probing addresses for positions:', probeList);
        
        // Find the address with positions
        let foundProxy = null, foundPositions = null
        for (const cand of probeList) {
          const { n, raw } = await apiService.getPositionsCount(cand)
          if (n > 0) {
            foundProxy = cand
            foundPositions = raw
            console.log(`✅ Found positions at address: ${cand} (${n} positions)`);
            break
          }
        }
        
        if (foundProxy && foundProxy.toLowerCase() !== addr.toLowerCase()) {
          this.state.proxy = foundProxy
        }
        
        positions = foundPositions || await apiService.getPositions(this.state.proxy || addr)
        value = await apiService.getValue(this.state.proxy || addr)
        activity = activityTmp
        
        console.log('📊 Fetching markets data...');
        markets = await apiService.getMarketsCandidate()
        
        this.updateDiagnostics(this.state.proxy || addr, value, positions, activity, markets)
      }

      console.log('🧠 Building user features...');
      const features = rankerService.buildUserFeatures(positions, activity)
      this.state.features = features

      console.log('👤 Updating profile UI...');
      this.updateProfile(value, features, positions, activity)

      // Process and rank markets
      console.log('🎯 Processing and ranking markets...');
      const raw = (markets?.data || markets || [])
      
      // Normalize tags
      raw.forEach(m => { 
        m.tags = this.normTags(m.tags) 
      })
      
      this.state.markets = raw.filter(m => m?.endDate && m?.question)
      console.log(`📈 Found ${this.state.markets.length} valid markets`);
      
      const scored = rankerService.scoreMarkets(this.state.markets, features)
      this.state.recs = scored.slice(0, 24)
      console.log(`🏆 Generated ${this.state.recs.length} recommendations`);

      this.renderFeed()
      this.clearStatus()
      
      console.log('✅ Feed generation completed successfully');
    } catch (error) {
      console.error('❌ Error fetching data:', error)
      this.setStatus('error', 'Failed to fetch data. Try Demo mode.')
    }
  }

  normTags(tags) {
    if (!tags) return []
    return tags.map(t => {
      if (typeof t === 'string') return t
      if (!t) return ''
      return t.name || t.tag || t.slug || t.id || String(t)
    }).filter(Boolean)
  }

  updateDiagnostics(addr, value, positions, activity, markets) {
    const diagBox = document.getElementById('diagBox')
    if (diagBox) diagBox.classList.remove('hidden')
    
    const valueUrl = `/pdata/value?user=${encodeURIComponent(addr)}`
    const elUrl = document.getElementById('diagValueUrl')
    if (elUrl) elUrl.textContent = valueUrl
    
    const elVOk = document.getElementById('diagValueOk')
    if (elVOk) elVOk.textContent = value ? 'yes' : 'no'
    
    const elPOk = document.getElementById('diagPosOk')
    if (elPOk) {
      const posCount = positions?.data?.length ?? positions?.length ?? 0
      elPOk.textContent = posCount > 0 ? 'yes' : 'no'
    }
    
    const elAOk = document.getElementById('diagActOk')
    if (elAOk) {
      const actCount = activity?.data?.length ?? activity?.length ?? 0
      elAOk.textContent = actCount > 0 ? 'yes' : 'no'
    }
    
    const elMOk = document.getElementById('diagMarketsOk')
    if (elMOk) {
      const marketCount = markets?.data?.length || markets?.length || 0
      elMOk.textContent = marketCount > 0 ? `yes (${marketCount})` : 'no'
    }
    
    const elVRaw = document.getElementById('diagValueRaw')
    if (elVRaw) elVRaw.textContent = JSON.stringify(value, null, 2)
  }

  updateProfile(value, features, positions, activity) {
    this.elements.profileCard?.classList.remove('hidden')
    
    // Portfolio value
    const portfolioValue = this.extractPortfolioValue(value)
    if (this.elements.bankroll) {
      this.elements.bankroll.textContent = '$' + utils.niceUsd(portfolioValue, 0)
    }

    // PnL (simplified)
    if (this.elements.pnl) {
      this.elements.pnl.textContent = '—'
    }

    // Proxy
    if (this.elements.proxyDisp) {
      this.elements.proxyDisp.textContent = this.state.proxy || '(none)'
    }

    // Top categories
    if (this.elements.topCats) {
      this.elements.topCats.innerHTML = ''
      const topCats = Object.entries(features.cat_counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
      
      if (topCats.length === 0) {
        uiService.createChip(this.elements.topCats, 'No categories yet')
      } else {
        topCats.forEach(([cat, count]) => {
          uiService.createChip(this.elements.topCats, `${cat} (${count})`)
        })
      }
    }

    // Top tags
    if (this.elements.topTags) {
      this.elements.topTags.innerHTML = ''
      const topTags = Object.entries(features.tag_counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
      
      if (topTags.length === 0) {
        uiService.createChip(this.elements.topTags, 'No tags yet')
      } else {
        topTags.forEach(([tag, count]) => {
          uiService.createChip(this.elements.topTags, `#${tag}`)
        })
      }
    }

    // History note
    const posCount = (positions?.data?.length || positions?.length || 0)
    const actCount = (activity?.data?.length || activity?.length || 0)
    if (this.elements.historyNote) {
      this.elements.historyNote.textContent = `positions: ${posCount} • activity: ${actCount}`
    }

    // Match note
    if (this.elements.matchNote) {
      const mode = this.state.isDemo ? 'demo' : 'live'
      this.elements.matchNote.textContent = `Using ${mode} data`
    }
  }

  extractPortfolioValue(value) {
    if (!value) return 0
    if (typeof value === 'number') return value
    if (value.data && typeof value.data.total !== 'undefined') return Number(value.data.total) || 0
    if (typeof value.total !== 'undefined') return Number(value.total) || 0
    return 0
  }

  renderFeed() {
    if (!this.elements.feed) return

    const cat = this.elements.filterCategory?.value || ''
    const hz = this.elements.filterHorizon?.value || ''
    const liqMin = Number(this.elements.filterLiquidity?.value || 0)

    this.elements.feed.innerHTML = ''
    let used = 0

    for (const { market, score, reasons } of this.state.recs) {
      if (cat && market.category !== cat) continue
      
      const days = utils.daysTo(market.endDate)
      const hb = utils.horizonBucket(days)
      if (hz && hb !== hz) continue
      
      const liq = Number(market.liquidityNum || 0)
      if (liqMin && Math.round(liq / 10) < liqMin) continue

      const card = uiService.createMarketCard(market, score, reasons)
      this.elements.feed.appendChild(card)
      used++
    }

    if (this.elements.emptyState) {
      this.elements.emptyState.classList.toggle('hidden', used > 0)
    }
  }

  applyFilters() {
    this.renderFeed()
  }

  async applyProxy() {
    const input = this.elements.proxyOverride?.value?.trim() || ''
    if (input && utils.isHexAddress(input)) {
      this.state.proxy = input
      await this.onSeeFeed()
    }
  }

  setStatus(kind, text) {
    if (!this.elements.statusBar) return
    
    this.elements.statusBar.classList.remove('hidden')
    if (this.elements.statusText) {
      this.elements.statusText.textContent = text || ''
    }
    
    if (this.elements.statusDot) {
      const colors = {
        live: '#22c55e',
        warn: '#f59e0b',
        error: '#ef4444',
        loading: '#f59e0b'
      }
      this.elements.statusDot.style.backgroundColor = colors[kind] || colors.loading
    }
  }

  clearStatus() {
    this.elements.statusBar?.classList.add('hidden')
    if (this.elements.statusText) this.elements.statusText.textContent = ''
    if (this.elements.statusExtra) this.elements.statusExtra.textContent = ''
  }
}

export const appService = new AppService()

export function initializeApp() {
  // Wrap in try-catch to prevent any initialization errors
  try {
    appService.initialize()
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }
}