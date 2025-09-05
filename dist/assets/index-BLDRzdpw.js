(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();function P(){return`
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
  `}function D(){return`
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
  `}function I(){return`
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
    
    <div id="diagBox" class="hidden" style="background: rgba(255,255,255,0.04); border-radius: 0.75rem; padding: 1rem; margin-top: 1rem;">
      <div class="text-xs text-muted mb-2">API Diagnostics</div>
      <div class="text-xs" style="font-family: monospace;">
        <div>Value API: <span id="diagValueOk">—</span></div>
        <div>Positions API: <span id="diagPosOk">—</span></div>
        <div>Activity API: <span id="diagActOk">—</span></div>
        <div>Markets API: <span id="diagMarketsOk">—</span></div>
        <div class="mt-2">
          <div>URL: <span id="diagValueUrl" style="word-break: break-all;">—</span></div>
        </div>
        <details class="mt-2">
          <summary>Raw Value Response</summary>
          <pre id="diagValueRaw" style="font-size: 10px; max-height: 200px; overflow: auto;">—</pre>
        </details>
      </div>
    </div>
  `}function M(){return`
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
  `}function _(){return`
    <div id="feed" class="grid gap-4">
      <!-- Market cards will be injected here -->
    </div>
    
    <div id="emptyState" class="text-center text-muted hidden" style="padding: 3rem;">
      <p>No recommendations yet. Try demo mode or adjust filters.</p>
    </div>
  `}function N(){return`
    <div id="statusBar" class="status-bar hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span id="statusDot" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
          <span id="statusText">Connecting…</span>
        </div>
        <div id="statusExtra" class="text-muted"></div>
      </div>
    </div>
  `}class T{constructor(){this.GAMMA_BASE="https://gamma-api.polymarket.com",this.DATA_BASE="https://data-api.polymarket.com"}async fetchWithFallback(e,t){try{console.log(`🔄 Attempting API call: ${e}`);const s=await fetch(e,{mode:"cors",credentials:"omit",headers:{Accept:"application/json",Origin:window.location.origin}});if(!s.ok)throw new Error(`HTTP ${s.status}`);const n=await s.json();return console.log("✅ API success:",n),n}catch(s){return console.warn(`❌ API failed (${s.message}), using sample data`),await t()}}async getMarketsCandidate(){const e=`${this.GAMMA_BASE}/markets?closed=false&limit=50&order=-volume24hr`;return this.fetchWithFallback(e,()=>this.getSampleMarkets())}async getPositions(e){const t=`${this.DATA_BASE}/positions?user=${e}`;return this.fetchWithFallback(t,()=>this.getSamplePositions())}async getActivity(e,t=1e3){const s=`${this.DATA_BASE}/activity?user=${e}&limit=${t}`;return this.fetchWithFallback(s,()=>this.getSampleActivity())}async getValue(e){const t=`${this.DATA_BASE}/value?user=${e}`;return this.fetchWithFallback(t,()=>this.getSampleValue())}resolveProxyFromActivity(e){var n,o,m,p;const t=new Set;try{const d=(e==null?void 0:e.data)||e||[];for(const a of d){a.proxyWallet&&t.add(a.proxyWallet),(n=a==null?void 0:a.walletInfo)!=null&&n.proxyWallet&&t.add(a.walletInfo.proxyWallet),a!=null&&a.userProxy&&t.add(a.userProxy),(o=a==null?void 0:a.account)!=null&&o.proxy&&t.add(a.account.proxy),(m=a==null?void 0:a.maker)!=null&&m.proxy&&t.add(a.maker.proxy),(p=a==null?void 0:a.taker)!=null&&p.proxy&&t.add(a.taker.proxy);for(const h in a){const i=a[h];if(typeof i=="string"&&i.startsWith("0x")&&i.length===42&&t.add(i),i&&typeof i=="object")for(const r in i){const l=i[r];typeof l=="string"&&l.startsWith("0x")&&l.length===42&&t.add(l)}}}}catch(d){console.warn("Error parsing activity for proxy detection:",d)}const s=[...t].filter(d=>/^0x[0-9a-fA-F]{40}$/.test(d));return{list:s,bestGuess:s[0]||null}}async getPositionsCount(e){var t;try{const s=await this.getPositions(e);return{count:((t=s==null?void 0:s.data)==null?void 0:t.length)??(s==null?void 0:s.length)??0,raw:s}}catch{return{count:0,raw:null}}}async getSampleMarkets(){return(await fetch("./data/sample_markets.json")).json()}async getSamplePositions(){return(await fetch("./data/sample_positions.json")).json()}async getSampleActivity(){return(await fetch("./data/sample_activity.json")).json()}async getSampleValue(){return(await fetch("./data/sample_value.json")).json()}marketLink(e){return e?String(e).startsWith("0x")?`https://polymarket.com/market/${e}`:`https://polymarket.com/event/${e}`:"https://polymarket.com/"}}const x=new T,v={isHexAddress(c){return typeof c!="string"||!c.startsWith("0x")?!1:c.length===42&&/^0x[0-9a-fA-F]{40}$/.test(c)},niceUsd(c,e=0){return c==null||Number.isNaN(c)?"—":Number(c).toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})},nicePct(c,e=0){return c==null||Number.isNaN(c)?"—":(Number(c)*100).toFixed(e)+"%"},clamp(c,e,t){return Math.max(e,Math.min(t,c))},daysTo(c){if(!c)return null;const e=new Date,t=new Date(c);if(isNaN(t.getTime()))return null;const s=t.getTime()-e.getTime(),n=Math.ceil(s/(1e3*60*60*24));return Math.max(0,n)},horizonBucket(c){return c===null?"unknown":c<=7?"short":c<=45?"medium":"long"},since(c){if(!c)return"";const e=new Date(c),t=(Date.now()-e.getTime())/1e3;return t<60?`${Math.floor(t)}s ago`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:e.toLocaleDateString()}};class F{buildUserFeatures(e=[],t=[]){const s={avg_usdc_size:0,median_usdc_size:0,size_std:0,cat_counts:{},tag_counts:{},yes_share:.5,price_dist_avg:0,horizon_pref:"medium",liq_pref_decile:5},n=[];let o=0,m=0;const p=[],d=[],a=(t==null?void 0:t.data)||t||[];for(const i of a){const r=Number(i.usdcSize||i.size_usdc||i.value_usd||0);!isNaN(r)&&r>0&&n.push(r);const l=String(i.side||"").toUpperCase(),g=i.outcomeIndex;l&&(g===0||g===1)&&(m+=1,g===1&&(o+=1));const y=Number(i.price||0);isNaN(y)||p.push(Math.abs(y-.5));const u=i.endDate||i.marketEndDate;if(u&&i.timestamp){const f=Math.ceil((new Date(u)-new Date(i.timestamp))/864e5);Number.isFinite(f)&&d.push(f)}}if(n.length){n.sort((r,l)=>r-l),s.avg_usdc_size=n.reduce((r,l)=>r+l,0)/n.length,s.median_usdc_size=n[Math.floor(n.length/2)];const i=s.avg_usdc_size;s.size_std=Math.sqrt(n.reduce((r,l)=>r+(l-i)*(l-i),0)/n.length)}s.yes_share=m?o/m:.5,s.price_dist_avg=p.length?p.reduce((i,r)=>i+r,0)/p.length:.1;const h=(e==null?void 0:e.data)||e||[];for(const i of h){const r=i.category||i.marketCategory;r&&(s.cat_counts[r]=(s.cat_counts[r]||0)+1);const l=i.tags||[];for(const u of l)u&&(s.tag_counts[u]=(s.tag_counts[u]||0)+1);const g=i.endDate,y=i.timestamp||i.openedAt;if(g&&y){const u=Math.ceil((new Date(g)-new Date(y))/864e5);Number.isFinite(u)&&d.push(u)}}if(d.length){d.sort((r,l)=>r-l);const i=d[Math.floor(d.length/2)];s.horizon_pref=v.horizonBucket(i)}return s}scoreMarkets(e,t){return e.map((n,o)=>{const m=this.scoreMarket(n,t),p=this.reasonsFor(n,t),a=(this.hashSeed("fyp")^o)%7/1e3;return{market:n,score:m+a,reasons:p}}).sort((n,o)=>o.score-n.score)}scoreMarket(e,t){const s=e.tags||[],n=this.simFromCounts(s,t.tag_counts),o=t.cat_counts[e.category||""]?1:0,m=Math.ceil((new Date(e.endDate)-Date.now())/864e5),p=v.horizonBucket(m),d=t.horizon_pref===p?1:p==="unknown"?.5:.2,a=Number(e.bestBid)||0,h=Number(e.bestAsk)||0,i=(a+h)/2||.5,r=Math.abs(i-.5),l=1-Math.abs(r-t.price_dist_avg),g=this.decileFromLiquidity(e.liquidityNum),y=1-Math.abs(g/10-t.liq_pref_decile/10),u=Number(e.volume24hr)||0,f=Math.tanh(u/2e4),b=.25*n+.15*o+.2*d+.15*l+.1*y+.1*f+.05;return v.clamp(b,0,1)}reasonsFor(e,t){const s=[];(e.tags||[]).some(d=>t.tag_counts[d])&&s.push("tags you favor"),t.cat_counts[e.category||""]&&s.push(`${e.category} you trade often`);const o=Math.ceil((new Date(e.endDate)-Date.now())/864e5);return v.horizonBucket(o)===t.horizon_pref&&s.push("matches your usual horizon"),(Number(e.volume24hr)||0)>1e4&&s.push("good recent volume"),s.slice(0,3)}simFromCounts(e=[],t={}){if(!e||!e.length)return 0;const s=e.reduce((n,o)=>n+(t[o]?Math.log(1+t[o]):0),0);return Math.min(1,s/10)}decileFromLiquidity(e){if(e==null)return 0;const t=Number(e)||0;return t<=10?1:t<=20?2:t<=30?3:t<=40?4:t<=50?5:t<=60?6:t<=70?7:t<=80?8:t<=90?9:10}hashSeed(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}}const C=new F;class ${createChip(e,t){const s=document.createElement("span");return s.className="chip",s.textContent=t,e.appendChild(s),s}createMarketCard(e,t,s){const n=document.createElement("div");n.className="card market-card";const o=v.daysTo(e.endDate),m=((Number(e.bestBid)||0)+(Number(e.bestAsk)||0))/2,p=Array.isArray(e.tags)?e.tags:[];return n.innerHTML=`
      <div class="flex justify-between items-start gap-4 mb-4">
        <div style="flex: 1;">
          <a href="https://polymarket.com/market/${e.slug||e.conditionId}" 
             target="_blank" 
             class="link font-semibold text-lg" 
             style="display: block; margin-bottom: 0.5rem;">
            ${e.question}
          </a>
          <div class="flex gap-2" style="flex-wrap: wrap;">
            ${p.slice(0,5).map(d=>`<span class="chip">#${d}</span>`).join("")}
          </div>
        </div>
        <div style="text-align: right;">
          <div class="pill">
            ${m.toFixed(2)}¢
          </div>
          <div class="text-xs text-muted mt-1">
            bid ${(Number(e.bestBid)||0).toFixed(2)} | ask ${(Number(e.bestAsk)||0).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mb-3 text-sm">
        <div class="text-muted">
          Ends in ${o!==null?`${o}d`:"—"}
        </div>
        <div class="text-muted">
          24h vol ${Number(e.volume24hr||0).toLocaleString()}
        </div>
      </div>
      
      <div class="flex gap-2 mb-3" style="flex-wrap: wrap;">
        ${(s||[]).map(d=>`<span class="chip">${d}</span>`).join("")}
      </div>
      
      <div class="text-xs text-muted">
        Rank ${Math.round(t*100)}/100
      </div>
    `,n}}const E=new $;class L{constructor(){this.state={wallet:null,proxy:null,features:null,portfolio:0,pnl:null,markets:[],recs:[],live:!1},this.elements={}}initialize(){this.bindElements(),this.bindEvents()}bindElements(){this.elements={walletInput:document.getElementById("walletInput"),seeFeedBtn:document.getElementById("seeFeedBtn"),inputError:document.getElementById("inputError"),mockToggle:document.getElementById("mockToggle"),liveToggle:document.getElementById("liveToggle"),profileCard:document.getElementById("profileCard"),bankroll:document.getElementById("bankroll"),pnl:document.getElementById("pnl"),topCats:document.getElementById("topCats"),topTags:document.getElementById("topTags"),feed:document.getElementById("feed"),emptyState:document.getElementById("emptyState"),statusBar:document.getElementById("statusBar"),statusDot:document.getElementById("statusDot"),statusText:document.getElementById("statusText"),statusExtra:document.getElementById("statusExtra"),filterCategory:document.getElementById("filterCategory"),filterHorizon:document.getElementById("filterHorizon"),filterLiquidity:document.getElementById("filterLiquidity"),applyFilters:document.getElementById("applyFilters"),proxyDisp:document.getElementById("proxyDisp"),proxyOverride:document.getElementById("proxyOverride"),applyProxy:document.getElementById("applyProxy"),historyNote:document.getElementById("historyNote"),matchNote:document.getElementById("matchNote")}}bindEvents(){var e,t,s;(e=this.elements.seeFeedBtn)==null||e.addEventListener("click",()=>this.onSeeFeed()),(t=this.elements.applyFilters)==null||t.addEventListener("click",()=>this.applyFilters()),(s=this.elements.applyProxy)==null||s.addEventListener("click",()=>this.applyProxy())}async onSeeFeed(){var s,n,o,m,p,d;const e=((n=(s=this.elements.walletInput)==null?void 0:s.value)==null?void 0:n.trim())||"",t=((o=this.elements.mockToggle)==null?void 0:o.checked)||!1;if((m=this.elements.inputError)==null||m.classList.add("hidden"),!t&&!v.isHexAddress(e)){(p=this.elements.inputError)==null||p.classList.remove("hidden");return}this.setStatus("loading","Fetching data (may use samples due to CORS)…");try{let a,h,i,r;if(t)[a,h,i,r]=await Promise.all([x.getSamplePositions(),x.getSampleActivity(),x.getSampleValue(),x.getSampleMarkets()]),this.state.wallet="0xDEMO...",console.log("📊 Using demo data");else{this.state.wallet=e,console.log("🔍 Attempting real API calls for:",e);const u=await x.getActivity(e,1e3),f=x.resolveProxyFromActivity(u);let b=[];(d=f==null?void 0:f.list)!=null&&d.length&&(b=f.list),b=[e,...b.filter(k=>k.toLowerCase()!==e.toLowerCase())].slice(0,6);let w=null,A=null;for(const k of b){const{count:S,raw:B}=await x.getPositionsCount(k);if(S>0){w=k,A=B;break}}w&&w.toLowerCase()!==e.toLowerCase()&&(this.state.proxy=w,console.log("🔍 Found proxy:",w)),a=A||await x.getPositions(this.state.proxy||e),i=await x.getValue(this.state.proxy||e),h=u,r=await x.getMarketsCandidate(),this.updateDiagnostics(this.state.proxy||e,i,a,h,r)}const l=C.buildUserFeatures(a,h);this.state.features=l,console.log("📈 Extracted features:",l),this.updateProfile(i,l,a,h);const g=(r==null?void 0:r.data)||r||[];console.log("🎯 Processing markets:",g.length),g.forEach(u=>{u.tags=this.normTags(u.tags)}),this.state.markets=g.filter(u=>(u==null?void 0:u.endDate)&&(u==null?void 0:u.question)),console.log("✅ Valid markets after filtering:",this.state.markets.length);const y=C.scoreMarkets(this.state.markets,l);this.state.recs=y.slice(0,24),console.log("🏆 Top recommendations:",this.state.recs.slice(0,3).map(u=>({question:u.market.question,score:u.score,category:u.market.category}))),this.renderFeed(),this.clearStatus()}catch(a){console.error("Error fetching data:",a),this.setStatus("error","CORS blocked APIs. Using sample data. Try Demo mode for full experience.")}}normTags(e){return e?e.map(t=>typeof t=="string"?t:t?t.name||t.tag||t.slug||t.id||String(t):"").filter(Boolean):[]}updateDiagnostics(e,t,s,n,o){var g,y,u;const m=document.getElementById("diagBox");m&&m.classList.remove("hidden");const p=`${x.DATA_BASE}/value?user=${encodeURIComponent(e)}`,d=document.getElementById("diagValueUrl");d&&(d.textContent=p);const a=document.getElementById("diagValueOk");a&&(a.textContent=t?"yes":"no");const h=document.getElementById("diagPosOk");if(h){const f=((g=s==null?void 0:s.data)==null?void 0:g.length)??(s==null?void 0:s.length)??0;h.textContent=f>0?"yes":"no"}const i=document.getElementById("diagActOk");if(i){const f=((y=n==null?void 0:n.data)==null?void 0:y.length)??(n==null?void 0:n.length)??0;i.textContent=f>0?"yes":"no"}const r=document.getElementById("diagMarketsOk");if(r){const f=((u=o==null?void 0:o.data)==null?void 0:u.length)||(o==null?void 0:o.length)||0;r.textContent=f>0?`yes (${f})`:"no"}const l=document.getElementById("diagValueRaw");l&&(l.textContent=JSON.stringify(t,null,2))}updateProfile(e,t,s,n){var d,a,h;(d=this.elements.profileCard)==null||d.classList.remove("hidden");const o=this.extractPortfolioValue(e);this.elements.bankroll&&(this.elements.bankroll.textContent="$"+v.niceUsd(o,0)),this.elements.pnl&&(this.elements.pnl.textContent="—"),this.elements.proxyDisp&&(this.elements.proxyDisp.textContent=this.state.proxy||"(none)"),this.elements.topCats&&(this.elements.topCats.innerHTML="",Object.entries(t.cat_counts).sort((r,l)=>l[1]-r[1]).slice(0,5).forEach(([r,l])=>{E.createChip(this.elements.topCats,`${r} (${l})`)})),this.elements.topTags&&(this.elements.topTags.innerHTML="",Object.entries(t.tag_counts).sort((r,l)=>l[1]-r[1]).slice(0,8).forEach(([r,l])=>{E.createChip(this.elements.topTags,`#${r}`)}));const m=((a=s==null?void 0:s.data)==null?void 0:a.length)||(s==null?void 0:s.length)||0,p=((h=n==null?void 0:n.data)==null?void 0:h.length)||(n==null?void 0:n.length)||0;this.elements.historyNote&&(this.elements.historyNote.textContent=`positions: ${m} • activity: ${p}`),this.elements.matchNote&&(this.elements.matchNote.textContent="Using sample data for demonstration")}extractPortfolioValue(e){return e?typeof e=="number"?e:e.data&&typeof e.data.total<"u"?Number(e.data.total)||0:typeof e.total<"u"&&Number(e.total)||0:0}renderFeed(){var o,m,p;if(!this.elements.feed)return;const e=((o=this.elements.filterCategory)==null?void 0:o.value)||"",t=((m=this.elements.filterHorizon)==null?void 0:m.value)||"",s=Number(((p=this.elements.filterLiquidity)==null?void 0:p.value)||0);this.elements.feed.innerHTML="";let n=0;for(const{market:d,score:a,reasons:h}of this.state.recs){if(e&&d.category!==e)continue;const i=v.daysTo(d.endDate),r=v.horizonBucket(i);if(t&&r!==t)continue;const l=Number(d.liquidityNum||0);if(s&&Math.round(l/10)<s)continue;const g=E.createMarketCard(d,a,h);this.elements.feed.appendChild(g),n++}this.elements.emptyState&&this.elements.emptyState.classList.toggle("hidden",n>0)}applyFilters(){this.renderFeed()}async applyProxy(){var t,s;const e=((s=(t=this.elements.proxyOverride)==null?void 0:t.value)==null?void 0:s.trim())||"";e&&v.isHexAddress(e)&&(this.state.proxy=e,await this.onSeeFeed())}setStatus(e,t){if(this.elements.statusBar&&(this.elements.statusBar.classList.remove("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=t||""),this.elements.statusDot)){const s={live:"#22c55e",warn:"#f59e0b",error:"#ef4444",loading:"#f59e0b"};this.elements.statusDot.style.backgroundColor=s[e]||s.loading}}clearStatus(){var e;(e=this.elements.statusBar)==null||e.classList.add("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=""),this.elements.statusExtra&&(this.elements.statusExtra.textContent="")}}const z=new L;function O(){z.initialize()}function j(){return setTimeout(()=>{O()},0),`
    <div class="app">
      ${P()}
      
      <main class="container">
        <div class="grid grid-3">
          <!-- Left Column -->
          <div class="sidebar">
            ${D()}
            ${I()}
            ${M()}
            
            <div class="card">
              <h3 class="font-semibold mb-2">About</h3>
              <p class="text-sm text-muted">
                This is a read-only demo that shows personalized market recommendations 
                based on trading patterns. Uses sample data for demonstration purposes.
              </p>
            </div>
          </div>
          
          <!-- Right Column -->
          <div class="main-content" style="grid-column: span 2;">
            ${N()}
            ${_()}
          </div>
        </div>
      </main>
    </div>
  `}document.querySelector("#app").innerHTML=j();
