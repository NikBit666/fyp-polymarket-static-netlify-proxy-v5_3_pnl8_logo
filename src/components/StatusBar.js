export function StatusBar() {
  return `
    <div id="statusBar" class="status-bar hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span id="statusDot" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
          <span id="statusText">Connecting…</span>
        </div>
        <div id="statusExtra" class="text-muted"></div>
      </div>
    </div>
  `
}