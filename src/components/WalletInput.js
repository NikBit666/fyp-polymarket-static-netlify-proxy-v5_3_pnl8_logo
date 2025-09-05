export function WalletInput() {
  return `
    <div class="card">
      <h3 class="font-semibold mb-4">1) Enter Wallet or Try Demo</h3>
      <div class="flex-col gap-4" style="display: flex;">
        <input 
          id="walletInput" 
          class="input" 
          placeholder="0xabc... or proxy wallet"
          value=""
        />
        
        <div class="flex items-center justify-between gap-4">
          <label class="flex items-center gap-2 text-sm">
            <input id="liveToggle" type="checkbox" style="accent-color: var(--accent);">
            Live updates
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input id="mockToggle" type="checkbox" style="accent-color: var(--accent);">
            Demo mode
          </label>
        </div>
        
        <button id="seeFeedBtn" class="btn">
          See my For You feed
        </button>
        
        <div id="inputError" class="text-red text-sm hidden">
          Invalid address. Please enter a valid 0x... wallet address.
        </div>
      </div>
      
      <p class="text-xs text-muted mt-4">
        <strong>⚠️ CORS Notice:</strong> Browser security may block direct API calls to Polymarket. 
        The app will attempt real API calls and fallback to sample data if blocked.
        <br><br>
        <strong>💡 Tip:</strong> Check browser console to see which data sources are being used.
      </p>
    </div>
  `
}