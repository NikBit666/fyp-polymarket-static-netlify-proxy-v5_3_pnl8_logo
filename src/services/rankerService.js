import { utils } from '../utils/index.js'

class RankerService {
  buildUserFeatures(positions = [], activity = []) {
    const features = {
      avg_usdc_size: 0,
      median_usdc_size: 0,
      size_std: 0,
      cat_counts: {},
      tag_counts: {},
      yes_share: 0.5,
      price_dist_avg: 0.0,
      horizon_pref: 'medium',
      liq_pref_decile: 5,
    }

    // Extract sizes from activity
    const sizes = []
    let yesTrades = 0, totalYN = 0
    const priceDistances = []
    const horizons = []

    const activityData = activity?.data || activity || []
    for (const ev of activityData) {
      const usdc = Number(ev.usdcSize || ev.size_usdc || ev.value_usd || 0)
      if (!isNaN(usdc) && usdc > 0) sizes.push(usdc)

      const side = String(ev.side || '').toUpperCase()
      const outcome = ev.outcomeIndex
      if (side && (outcome === 0 || outcome === 1)) {
        totalYN += 1
        if (outcome === 1) yesTrades += 1
      }

      const price = Number(ev.price || 0)
      if (!isNaN(price)) priceDistances.push(Math.abs(price - 0.5))

      const end = ev.endDate || ev.marketEndDate
      if (end && ev.timestamp) {
        const dDays = Math.ceil((new Date(end) - new Date(ev.timestamp)) / 86400000)
        if (Number.isFinite(dDays)) horizons.push(dDays)
      }
    }

    // Calculate size statistics
    if (sizes.length) {
      sizes.sort((a, b) => a - b)
      features.avg_usdc_size = sizes.reduce((a, b) => a + b, 0) / sizes.length
      features.median_usdc_size = sizes[Math.floor(sizes.length / 2)]
      const mu = features.avg_usdc_size
      features.size_std = Math.sqrt(sizes.reduce((s, x) => s + (x - mu) * (x - mu), 0) / sizes.length)
    }

    features.yes_share = totalYN ? yesTrades / totalYN : 0.5
    features.price_dist_avg = priceDistances.length ? 
      priceDistances.reduce((a, b) => a + b, 0) / priceDistances.length : 0.1

    // Extract categories and tags from positions
    const positionsData = positions?.data || positions || []
    for (const p of positionsData) {
      const cat = p.category || p.marketCategory
      if (cat) features.cat_counts[cat] = (features.cat_counts[cat] || 0) + 1

      const tags = p.tags || []
      for (const t of tags) {
        if (t) features.tag_counts[t] = (features.tag_counts[t] || 0) + 1
      }

      // Horizon from positions
      const end = p.endDate
      const ts = p.timestamp || p.openedAt
      if (end && ts) {
        const dDays = Math.ceil((new Date(end) - new Date(ts)) / 86400000)
        if (Number.isFinite(dDays)) horizons.push(dDays)
      }
    }

    // Determine horizon preference
    if (horizons.length) {
      horizons.sort((a, b) => a - b)
      const med = horizons[Math.floor(horizons.length / 2)]
      features.horizon_pref = utils.horizonBucket(med)
    }

    return features
  }

  scoreMarkets(markets, features) {
    const scored = markets.map((market, index) => {
      const score = this.scoreMarket(market, features)
      const reasons = this.reasonsFor(market, features)
      
      // Add some randomness for demo purposes
      const seed = this.hashSeed('fyp')
      const randomness = ((seed ^ index) % 7) / 1000
      
      return {
        market,
        score: score + randomness,
        reasons
      }
    })

    return scored.sort((a, b) => b.score - a.score)
  }

  scoreMarket(market, features) {
    const tags = market.tags || []
    const tagSim = this.simFromCounts(tags, features.tag_counts)
    const catMatch = features.cat_counts[market.category || ''] ? 1 : 0

    // Horizon scoring
    const days = Math.ceil((new Date(market.endDate) - Date.now()) / 86400000)
    const hz = utils.horizonBucket(days)
    const horizonScore = (features.horizon_pref === hz) ? 1 : (hz === 'unknown' ? 0.5 : 0.2)

    // Risk scoring
    const bid = Number(market.bestBid) || 0
    const ask = Number(market.bestAsk) || 0
    const mid = (bid + ask) / 2 || 0.5
    const dist = Math.abs(mid - 0.5)
    const riskScore = 1 - Math.abs(dist - features.price_dist_avg)

    // Liquidity scoring
    const liqDec = this.decileFromLiquidity(market.liquidityNum)
    const liqScore = 1 - Math.abs((liqDec / 10) - (features.liq_pref_decile / 10))

    // Volume scoring
    const vol = Number(market.volume24hr) || 0
    const volScore = Math.tanh(vol / 20000)

    const score = 0.25 * tagSim + 0.15 * catMatch + 0.20 * horizonScore + 
                  0.15 * riskScore + 0.10 * liqScore + 0.10 * volScore + 0.05

    return utils.clamp(score, 0, 1)
  }

  reasonsFor(market, features) {
    const reasons = []
    const tags = market.tags || []
    
    if (tags.some(t => features.tag_counts[t])) {
      reasons.push('tags you favor')
    }
    
    if (features.cat_counts[market.category || '']) {
      reasons.push(`${market.category} you trade often`)
    }
    
    const days = Math.ceil((new Date(market.endDate) - Date.now()) / 86400000)
    const hz = utils.horizonBucket(days)
    if (hz === features.horizon_pref) {
      reasons.push('matches your usual horizon')
    }
    
    const vol = Number(market.volume24hr) || 0
    if (vol > 10000) {
      reasons.push('good recent volume')
    }

    return reasons.slice(0, 3)
  }

  simFromCounts(itemTags = [], countsObj = {}) {
    if (!itemTags || !itemTags.length) return 0
    const sum = itemTags.reduce((s, t) => s + (countsObj[t] ? Math.log(1 + countsObj[t]) : 0), 0)
    return Math.min(1, sum / 10)
  }

  decileFromLiquidity(liq) {
    if (liq === null || liq === undefined) return 0
    const n = Number(liq) || 0
    if (n <= 10) return 1
    if (n <= 20) return 2
    if (n <= 30) return 3
    if (n <= 40) return 4
    if (n <= 50) return 5
    if (n <= 60) return 6
    if (n <= 70) return 7
    if (n <= 80) return 8
    if (n <= 90) return 9
    return 10
  }

  hashSeed(str) {
    let h = 2166136261 >>> 0
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    return h >>> 0
  }
}

export const rankerService = new RankerService()