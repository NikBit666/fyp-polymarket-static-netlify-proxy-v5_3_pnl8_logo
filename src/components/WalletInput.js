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
        <strong>💡 Tip:</strong> Try Demo mode for a quick preview, or enter a real wallet address to see personalized recommendations.
        The app will automatically fall back to sample data if APIs are unavailable.
      </p>
    </div>
  `
}