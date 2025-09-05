# FYP for Polymarket — Static Demo (No Build, No Backend)

This is a **drag-and-drop** static site you can deploy on **Netlify** (or open locally) with no installs.

## What it does
- Lets you paste a Polymarket wallet address and shows a **For You** feed of markets.
- Pulls **public** data (positions, activity, value, markets) directly from Polymarket APIs.
- Computes a simple **profile** and ranks live markets client-side.
- Optional **Demo mode** with sample data if APIs throttle or CORS blocks.
- Optional **Live** toggle to attempt a WebSocket connection. If it fails, the app remains usable.

## Deploy (Netlify, 1–click)
1. Go to https://app.netlify.com/drop
2. Drag the **entire folder** or the **ZIP** file into the window.
3. Done. You’ll get a public URL instantly.

## Local preview
- Double-click `index.html` (most browsers will load it fine).
- If your browser blocks local JSON fetch, use Netlify Drop above.

## Notes
- This is **read-only**. It never asks to sign or trade.
- CORS is controlled by the API servers; if an endpoint blocks, use **Demo mode**.
- The ranking logic is a minimal approximation you can extend.

## Files
- `index.html` — UI (Tailwind via CDN)
- `js/api.js` — calls Gamma + Data APIs
- `js/ranker.js` — feature extraction + scoring
- `js/utils.js` — helpers
- `js/wss.js` — best-effort WebSocket client
- `data/*.json` — demo payloads if needed

## Disclaimer
Not affiliated with Polymarket. Informational only. No financial advice.


## Netlify proxy
This build uses Netlify `_redirects` to proxy Polymarket APIs and avoid CORS. No code changes needed on deploy.