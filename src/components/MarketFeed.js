export function MarketFeed() {
  return `
    <div id="feed" class="grid gap-4">
      <!-- Market cards will be injected here -->
    </div>
    
    <div id="emptyState" class="text-center text-muted hidden" style="padding: 3rem;">
      <p>No recommendations yet. Try demo mode or adjust filters.</p>
    </div>
  `
}