import { utils } from '../utils/index.js'

class UiService {
  createChip(container, text) {
    const chip = document.createElement('span')
    chip.className = 'chip'
    chip.textContent = text
    container.appendChild(chip)
    return chip
  }

  createMarketCard(market, score, reasons) {
    console.log('🎨 Creating card for market:', market.question)
    
    const card = document.createElement('div')
    card.className = 'card market-card'
    
    const days = utils.daysTo(market.endDate)
    const mid = ((Number(market.bestBid) || 0) + (Number(market.bestAsk) || 0)) / 2
    
    // Ensure we have tags array
    const tags = Array.isArray(market.tags) ? market.tags : []
    console.log('🏷️ Market tags:', tags)
    
    card.innerHTML = `
      <div class="flex justify-between items-start gap-4 mb-4">
        <div style="flex: 1;">
          <a href="https://polymarket.com/market/${market.slug || market.conditionId}" 
             target="_blank" 
             class="link font-semibold text-lg" 
             style="display: block; margin-bottom: 0.5rem;">
            ${market.question}
          </a>
          <div class="flex gap-2" style="flex-wrap: wrap;">
            ${tags.slice(0, 5).map(tag => 
              `<span class="chip">#${tag}</span>`
            ).join('')}
          </div>
        </div>
        <div style="text-align: right;">
          <div class="pill">
            ${mid.toFixed(2)}¢
          </div>
          <div class="text-xs text-muted mt-1">
            bid ${(Number(market.bestBid) || 0).toFixed(2)} | ask ${(Number(market.bestAsk) || 0).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mb-3 text-sm">
        <div class="text-muted">
          Ends in ${days !== null ? `${days}d` : '—'}
        </div>
        <div class="text-muted">
          24h vol ${Number(market.volume24hr || 0).toLocaleString()}
        </div>
      </div>
      
      <div class="flex gap-2 mb-3" style="flex-wrap: wrap;">
        ${(reasons || []).map(reason => 
          `<span class="chip">${reason}</span>`
        ).join('')}
      </div>
      
      <div class="text-xs text-muted">
        Rank ${Math.round(score * 100)}/100
      </div>
    `
    
    return card
  }
}

export const uiService = new UiService()