export function ProfileCard() {
  return `
    <div id="profileCard" class="card hidden">
      <h3 class="font-semibold mb-4">Profile</h3>
      
      <div class="grid grid-2 gap-4 mb-4">
        <div style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem;">
          <div class="text-xs text-muted mb-1">Portfolio</div>
          <div id="bankroll" class="text-lg font-semibold">—</div>
        </div>
        <div style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem;">
          <div class="text-xs text-muted mb-1">PnL (overall)</div>
          <div id="pnl" class="text-lg font-semibold">—</div>
        </div>
      </div>
      
      <div style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem;">
        <div class="text-xs text-muted mb-2">Detected proxy</div>
        <div id="proxyDisp" class="text-sm font-mono" style="word-break: break-all;">—</div>
        <div class="flex gap-2 mt-2">
          <input id="proxyOverride" class="input text-xs" placeholder="paste proxy 0x... (optional)" style="flex: 1;"/>
          <button id="applyProxy" class="btn-secondary" style="padding: 0.5rem;">Use</button>
        </div>
      </div>
      
      <div style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem;">
        <div class="text-xs text-muted mb-2">Top categories</div>
        <div id="topCats" class="flex" style="flex-wrap: wrap; gap: 0.25rem;"></div>
      </div>
      
      <div style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem;">
        <div class="text-xs text-muted mb-2">Top tags</div>
        <div id="topTags" class="flex" style="flex-wrap: wrap; gap: 0.25rem;"></div>
        <div id="historyNote" class="text-xs text-muted mt-2"></div>
        <div id="matchNote" class="text-xs text-muted mt-1"></div>
      </div>
    </div>
  `
}