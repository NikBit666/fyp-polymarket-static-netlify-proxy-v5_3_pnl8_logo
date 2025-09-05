export function Header() {
  return `
    <header style="padding: 2rem 0;">
      <div class="container">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #16a34a, #22c55e); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">
                FYP
              </div>
              <h1 class="text-lg font-bold">FYP for Polymarket</h1>
            </div>
            <span class="chip">demo • read-only • educational</span>
          </div>
          <a href="https://docs.polymarket.com" target="_blank" class="link text-sm">
            Polymarket Docs
          </a>
        </div>
      </div>
    </header>
  `
}