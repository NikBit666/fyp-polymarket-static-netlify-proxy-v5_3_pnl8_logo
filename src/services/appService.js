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
      live: false
    }
    
    this.elements = {}
  }

  initialize() {
    this.bindElements()
    this.bindEvents()
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

    this.elements.inputError?.classList.add('hidden')

    if (!demo && !utils.isHexAddress(addr)) {
      this.elements.inputError?.classList.remove('hidden')
      return
    }

    this.setStatus('loading', 'Fetching data (may use samples due to CORS)…')

    try {
      let positions, activity, value, markets

      if (demo) {
        // Use sample data for demo
        [positions, activity, value, markets] = await Promise.all([
          apiService.getSamplePositions(),
          apiService.getSampleActivity(),
          apiService.getSampleValue(),
          apiService.getSampleMarkets(),
        ])
        this.state.wallet = '0xDEMO...'
        console.log('📊 Using demo data')
      } else {
        // Try real API calls, fallback to samples on CORS
        this.state.wallet = addr
        console.log('🔍 Attempting real API calls for:', addr)
        
        // 1) Always try activity first to find proxy
        const activityTmp = await apiService.getActivity(addr, 1000)
        const res = apiService.resolveProxyFromActivity(activityTmp)
        
        let probeList = []
        if (res?.list?.length) probeList = res.list
        // Put addr at front for completeness
        probeList = [addr, ...probeList.filter(x => x.toLowerCase() !== addr.toLowerCase())].slice(0, 6)
        
        // 2) Probe candidates and pick the first with non-empty positions
        let foundProxy = null, foundPositions = null
        for (const cand of probeList) {
          const { count, raw } = await apiService.getPositionsCount(cand)
          if (count > 0) {
            foundProxy = cand
            foundPositions = raw
            break
          }
        }
        
        if (foundProxy && foundProxy.toLowerCase() !== addr.toLowerCase()) {
          this.state.proxy = foundProxy
          console.log('🔍 Found proxy:', foundProxy)
        }
        
        positions = foundPositions || await apiService.getPositions(this.state.proxy || addr)
        value = await apiService.getValue(this.state.proxy || addr)
        activity = activityTmp
        
        markets = await apiService.getMarketsCandidate()
        
        // Update diagnostics
        this.updateDiagnostics(this.state.proxy || addr, value, positions, activity, markets)
      }

      // Extract features
      const features = rankerService.buildUserFeatures(positions, activity)
      this.state.features = features
      console.log('📈 Extracted features:', features)

      // Update profile UI
      this.updateProfile(value, features, positions, activity)

      // Rank markets
      const raw = (markets?.data || markets || [])
      console.log('🎯 Processing markets:', raw.length)
      
      // Normalize tags like original
      raw.forEach(m => { 
        m.tags = this.normTags(m.tags) 
      })
      this.state.markets = raw.filter(m => m?.endDate && m?.question)
      console.log('✅ Valid markets after filtering:', this.state.markets.length)
      
      const scored = rankerService.scoreMarkets(this.state.markets, features)
      this.state.recs = scored.slice(0, 24)
      console.log('🏆 Top recommendations:', this.state.recs.slice(0, 3).map(r => ({
        question: r.market.question,
        score: r.score,
        category: r.market.category
      })))

      // Render feed
      this.renderFeed()

      this.clearStatus()
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setStatus('error', 'CORS blocked APIs. Using sample data. Try Demo mode for full experience.')
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
    // Show diagnostic information
    const diagBox = document.getElementById('diagBox')
    if (diagBox) diagBox.classList.remove('hidden')
    
    const valueUrl = `${apiService.DATA_BASE}/value?user=${encodeURIComponent(addr)}`
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
      
      topCats.forEach(([cat, count]) => {
        uiService.createChip(this.elements.topCats, `${cat} (${count})`)
      })
    }

    // Top tags
    if (this.elements.topTags) {
      this.elements.topTags.innerHTML = ''
      const topTags = Object.entries(features.tag_counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
      
      topTags.forEach(([tag, count]) => {
        uiService.createChip(this.elements.topTags, `#${tag}`)
      })
    }

    // History note
    const posCount = (positions?.data?.length || positions?.length || 0)
    const actCount = (activity?.data?.length || activity?.length || 0)
    if (this.elements.historyNote) {
      this.elements.historyNote.textContent = `positions: ${posCount} • activity: ${actCount}`
    }

    // Match note
    if (this.elements.matchNote) {
      this.elements.matchNote.textContent = 'Using sample data for demonstration'
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
  appService.initialize()
}