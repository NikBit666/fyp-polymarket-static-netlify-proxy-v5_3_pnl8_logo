export function FiltersCard() {
  return `
    <div class="card">
      <h3 class="font-semibold mb-4">Filters</h3>
      
      <div class="grid grid-2 gap-4">
        <div>
          <label class="text-xs text-muted">Category</label>
          <select id="filterCategory" class="select">
            <option value="">Any</option>
            <option>Politics</option>
            <option>Crypto</option>
            <option>Sports</option>
            <option>Tech</option>
            <option>Entertainment</option>
          </select>
        </div>
        
        <div>
          <label class="text-xs text-muted">Horizon</label>
          <select id="filterHorizon" class="select">
            <option value="">Any</option>
            <option value="short">≤ 7d</option>
            <option value="medium">8–45d</option>
            <option value="long">> 45d</option>
          </select>
        </div>
        
        <div>
          <label class="text-xs text-muted">Min liquidity</label>
          <select id="filterLiquidity" class="select">
            <option value="0">No min</option>
            <option value="3">Decile ≥ 3</option>
            <option value="5">Decile ≥ 5</option>
            <option value="7">Decile ≥ 7</option>
            <option value="9">Decile ≥ 9</option>
          </select>
        </div>
        
        <div style="display: flex; align-items: end;">
          <button id="applyFilters" class="btn-secondary" style="width: 100%;">
            Apply
          </button>
        </div>
      </div>
    </div>
  `
}