(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();function S(){return`
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
  `}function A(){return`
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
  `}function F(){return`
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
  `}function N(){return`
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
  `}function $(){return`
    <div id="feed" class="grid gap-4">
      <!-- Market cards will be injected here -->
    </div>
    
    <div id="emptyState" class="text-center text-muted hidden" style="padding: 3rem;">
      <p>No recommendations yet. Try demo mode or adjust filters.</p>
    </div>
  `}function M(){return`
    <div id="statusBar" class="status-bar hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span id="statusDot" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
          <span id="statusText">Connecting…</span>
        </div>
        <div id="statusExtra" class="text-muted"></div>
      </div>
    </div>
  `}const T="/gamma",E="/pdata";class _{constructor(){this.isProduction=window.location.hostname!=="localhost"}async makeRequest(e,t={}){try{console.log(`🌐 Attempting API call: ${e}`);const s=await fetch(e,{...t,credentials:"omit",headers:{Accept:"application/json","Content-Type":"application/json",...t.headers}});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const n=await s.json();return console.log(`✅ API call successful: ${e}`,n),n}catch(s){throw console.error(`❌ API call failed: ${e}`,s),s}}async getMarketsCandidate(){const e=`${T}/markets?closed=false&limit=100&order=-volume24hr`;try{return await this.makeRequest(e)}catch{return console.warn("Markets API failed, using sample data"),this.getSampleMarkets()}}async getPositions(e){const t=`${E}/positions?user=${e}`;try{return await this.makeRequest(t)}catch{return console.warn("Positions API failed, using sample data"),this.getSamplePositions()}}async getActivity(e,t=100){const s=`${E}/activity?user=${e}&limit=${t}`;try{return await this.makeRequest(s)}catch{return console.warn("Activity API failed, using sample data"),this.getSampleActivity()}}async getValue(e){const t=`${E}/value?user=${e}`;try{return await this.makeRequest(t)}catch{return console.warn("Value API failed, using sample data"),this.getSampleValue()}}resolveProxyFromActivity(e){var n,i,c;const t=new Set;try{const u=(e==null?void 0:e.data)||e||[];for(const o of u){o.proxyWallet&&t.add(o.proxyWallet),(n=o==null?void 0:o.walletInfo)!=null&&n.proxyWallet&&t.add(o.walletInfo.proxyWallet),o!=null&&o.userProxy&&t.add(o.userProxy),(i=o==null?void 0:o.account)!=null&&i.proxy&&t.add(o.account.proxy),(c=o==null?void 0:o.account)!=null&&c.address&&t.add(o.account.address);for(const h in o){const p=o[h];if(typeof p=="string"&&p.startsWith("0x")&&p.length===42&&t.add(p),p&&typeof p=="object")for(const a in p){const r=p[a];typeof r=="string"&&r.startsWith("0x")&&r.length===42&&t.add(r)}}}}catch(u){console.error("Error resolving proxy:",u)}const s=[...t].filter(u=>/^0x[0-9a-fA-F]{40}$/.test(u));return{list:s,bestGuess:s[0]||null}}async getPositionsCount(e){var t;try{const s=await this.getPositions(e);return{n:((t=s==null?void 0:s.data)==null?void 0:t.length)??(s==null?void 0:s.length)??0,raw:s}}catch{return{n:0,raw:null}}}async getSampleMarkets(){try{return(await fetch("./data/sample_markets.json")).json()}catch(e){return console.error("Failed to load sample markets:",e),{data:[]}}}async getSamplePositions(){try{return(await fetch("./data/sample_positions.json")).json()}catch(e){return console.error("Failed to load sample positions:",e),{data:[]}}}async getSampleActivity(){try{return(await fetch("./data/sample_activity.json")).json()}catch(e){return console.error("Failed to load sample activity:",e),{data:[]}}}async getSampleValue(){try{return(await fetch("./data/sample_value.json")).json()}catch(e){return console.error("Failed to load sample value:",e),{data:{total:0}}}}marketLink(e){return e?String(e).startsWith("0x")?`https://polymarket.com/market/${e}`:`https://polymarket.com/event/${e}`:"https://polymarket.com/"}}const v=new _,x={isHexAddress(l){return typeof l!="string"||!l.startsWith("0x")?!1:l.length===42&&/^0x[0-9a-fA-F]{40}$/.test(l)},niceUsd(l,e=0){return l==null||Number.isNaN(l)?"—":Number(l).toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})},nicePct(l,e=0){return l==null||Number.isNaN(l)?"—":(Number(l)*100).toFixed(e)+"%"},clamp(l,e,t){return Math.max(e,Math.min(t,l))},daysTo(l){if(!l)return null;const e=new Date,t=new Date(l);if(isNaN(t.getTime()))return null;const s=t.getTime()-e.getTime(),n=Math.ceil(s/(1e3*60*60*24));return Math.max(0,n)},horizonBucket(l){return l===null?"unknown":l<=7?"short":l<=45?"medium":"long"},since(l){if(!l)return"";const e=new Date(l),t=(Date.now()-e.getTime())/1e3;return t<60?`${Math.floor(t)}s ago`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:e.toLocaleDateString()}};class z{buildUserFeatures(e=[],t=[]){const s={avg_usdc_size:0,median_usdc_size:0,size_std:0,cat_counts:{},tag_counts:{},yes_share:.5,price_dist_avg:0,horizon_pref:"medium",liq_pref_decile:5},n=[];let i=0,c=0;const u=[],o=[],h=(t==null?void 0:t.data)||t||[];for(const a of h){const r=Number(a.usdcSize||a.size_usdc||a.value_usd||0);!isNaN(r)&&r>0&&n.push(r);const d=String(a.side||"").toUpperCase(),g=a.outcomeIndex;d&&(g===0||g===1)&&(c+=1,g===1&&(i+=1));const y=Number(a.price||0);isNaN(y)||u.push(Math.abs(y-.5));const m=a.endDate||a.marketEndDate;if(m&&a.timestamp){const f=Math.ceil((new Date(m)-new Date(a.timestamp))/864e5);Number.isFinite(f)&&o.push(f)}}if(n.length){n.sort((r,d)=>r-d),s.avg_usdc_size=n.reduce((r,d)=>r+d,0)/n.length,s.median_usdc_size=n[Math.floor(n.length/2)];const a=s.avg_usdc_size;s.size_std=Math.sqrt(n.reduce((r,d)=>r+(d-a)*(d-a),0)/n.length)}s.yes_share=c?i/c:.5,s.price_dist_avg=u.length?u.reduce((a,r)=>a+r,0)/u.length:.1;const p=(e==null?void 0:e.data)||e||[];for(const a of p){const r=a.category||a.marketCategory;r&&(s.cat_counts[r]=(s.cat_counts[r]||0)+1);const d=a.tags||[];for(const m of d)m&&(s.tag_counts[m]=(s.tag_counts[m]||0)+1);const g=a.endDate,y=a.timestamp||a.openedAt;if(g&&y){const m=Math.ceil((new Date(g)-new Date(y))/864e5);Number.isFinite(m)&&o.push(m)}}if(o.length){o.sort((r,d)=>r-d);const a=o[Math.floor(o.length/2)];s.horizon_pref=x.horizonBucket(a)}return s}scoreMarkets(e,t){return e.map((n,i)=>{const c=this.scoreMarket(n,t),u=this.reasonsFor(n,t),h=(this.hashSeed("fyp")^i)%7/1e3;return{market:n,score:c+h,reasons:u}}).sort((n,i)=>i.score-n.score)}scoreMarket(e,t){const s=e.tags||[],n=this.simFromCounts(s,t.tag_counts),i=t.cat_counts[e.category||""]?1:0,c=Math.ceil((new Date(e.endDate)-Date.now())/864e5),u=x.horizonBucket(c),o=t.horizon_pref===u?1:u==="unknown"?.5:.2,h=Number(e.bestBid)||0,p=Number(e.bestAsk)||0,a=(h+p)/2||.5,r=Math.abs(a-.5),d=1-Math.abs(r-t.price_dist_avg),g=this.decileFromLiquidity(e.liquidityNum),y=1-Math.abs(g/10-t.liq_pref_decile/10),m=Number(e.volume24hr)||0,f=Math.tanh(m/2e4),b=.25*n+.15*i+.2*o+.15*d+.1*y+.1*f+.05;return x.clamp(b,0,1)}reasonsFor(e,t){const s=[];(e.tags||[]).some(o=>t.tag_counts[o])&&s.push("tags you favor"),t.cat_counts[e.category||""]&&s.push(`${e.category} you trade often`);const i=Math.ceil((new Date(e.endDate)-Date.now())/864e5);return x.horizonBucket(i)===t.horizon_pref&&s.push("matches your usual horizon"),(Number(e.volume24hr)||0)>1e4&&s.push("good recent volume"),s.slice(0,3)}simFromCounts(e=[],t={}){if(!e||!e.length)return 0;const s=e.reduce((n,i)=>n+(t[i]?Math.log(1+t[i]):0),0);return Math.min(1,s/10)}decileFromLiquidity(e){if(e==null)return 0;const t=Number(e)||0;return t<=10?1:t<=20?2:t<=30?3:t<=40?4:t<=50?5:t<=60?6:t<=70?7:t<=80?8:t<=90?9:10}hashSeed(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}}const B=new z;class L{createChip(e,t){const s=document.createElement("span");return s.className="chip",s.textContent=t,e.appendChild(s),s}createMarketCard(e,t,s){const n=document.createElement("div");n.className="card market-card";const i=x.daysTo(e.endDate),c=((Number(e.bestBid)||0)+(Number(e.bestAsk)||0))/2,u=Array.isArray(e.tags)?e.tags:[];return n.innerHTML=`
      <div class="flex justify-between items-start gap-4 mb-4">
        <div style="flex: 1;">
          <a href="https://polymarket.com/market/${e.slug||e.conditionId}" 
             target="_blank" 
             class="link font-semibold text-lg" 
             style="display: block; margin-bottom: 0.5rem;">
            ${e.question}
          </a>
          <div class="flex gap-2" style="flex-wrap: wrap;">
            ${u.slice(0,5).map(o=>`<span class="chip">#${o}</span>`).join("")}
          </div>
        </div>
        <div style="text-align: right;">
          <div class="pill">
            ${c.toFixed(2)}¢
          </div>
          <div class="text-xs text-muted mt-1">
            bid ${(Number(e.bestBid)||0).toFixed(2)} | ask ${(Number(e.bestAsk)||0).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mb-3 text-sm">
        <div class="text-muted">
          Ends in ${i!==null?`${i}d`:"—"}
        </div>
        <div class="text-muted">
          24h vol ${Number(e.volume24hr||0).toLocaleString()}
        </div>
      </div>
      
      <div class="flex gap-2 mb-3" style="flex-wrap: wrap;">
        ${(s||[]).map(o=>`<span class="chip">${o}</span>`).join("")}
      </div>
      
      <div class="text-xs text-muted">
        Rank ${Math.round(t*100)}/100
      </div>
    `,n}}const k=new L;class q{constructor(){this.state={wallet:null,proxy:null,features:null,portfolio:0,pnl:null,markets:[],recs:[],live:!1,isDemo:!1},this.elements={}}initialize(){console.log("🚀 Initializing FYP for Polymarket app..."),this.bindElements(),this.bindEvents(),console.log("✅ App initialized successfully")}bindElements(){this.elements={walletInput:document.getElementById("walletInput"),seeFeedBtn:document.getElementById("seeFeedBtn"),inputError:document.getElementById("inputError"),mockToggle:document.getElementById("mockToggle"),liveToggle:document.getElementById("liveToggle"),profileCard:document.getElementById("profileCard"),bankroll:document.getElementById("bankroll"),pnl:document.getElementById("pnl"),topCats:document.getElementById("topCats"),topTags:document.getElementById("topTags"),feed:document.getElementById("feed"),emptyState:document.getElementById("emptyState"),statusBar:document.getElementById("statusBar"),statusDot:document.getElementById("statusDot"),statusText:document.getElementById("statusText"),statusExtra:document.getElementById("statusExtra"),filterCategory:document.getElementById("filterCategory"),filterHorizon:document.getElementById("filterHorizon"),filterLiquidity:document.getElementById("filterLiquidity"),applyFilters:document.getElementById("applyFilters"),proxyDisp:document.getElementById("proxyDisp"),proxyOverride:document.getElementById("proxyOverride"),applyProxy:document.getElementById("applyProxy"),historyNote:document.getElementById("historyNote"),matchNote:document.getElementById("matchNote")}}bindEvents(){var e,t,s;(e=this.elements.seeFeedBtn)==null||e.addEventListener("click",()=>this.onSeeFeed()),(t=this.elements.applyFilters)==null||t.addEventListener("click",()=>this.applyFilters()),(s=this.elements.applyProxy)==null||s.addEventListener("click",()=>this.applyProxy())}async onSeeFeed(){var s,n,i,c,u,o;const e=((n=(s=this.elements.walletInput)==null?void 0:s.value)==null?void 0:n.trim())||"",t=((i=this.elements.mockToggle)==null?void 0:i.checked)||!1;if(console.log(`🎯 Starting feed generation - Demo: ${t}, Address: ${e}`),(c=this.elements.inputError)==null||c.classList.add("hidden"),!t&&!x.isHexAddress(e)){(u=this.elements.inputError)==null||u.classList.remove("hidden");return}this.setStatus("loading","Fetching your data…");try{let h,p,a,r;if(this.state.isDemo=t,t)console.log("📊 Using demo mode with sample data"),[h,p,a,r]=await Promise.all([v.getSamplePositions(),v.getSampleActivity(),v.getSampleValue(),v.getSampleMarkets()]),this.state.wallet="0xDEMO...";else{console.log("🔍 Fetching real data for wallet:",e),this.state.wallet=e,console.log("📈 Fetching activity data...");const m=await v.getActivity(e,1e3),f=v.resolveProxyFromActivity(m);let b=[];(o=f==null?void 0:f.list)!=null&&o.length&&(b=f.list),b=[e,...b.filter(w=>w.toLowerCase()!==e.toLowerCase())].slice(0,6),console.log("🔍 Probing addresses for positions:",b);let C=null,P=null;for(const w of b){const{n:I,raw:D}=await v.getPositionsCount(w);if(I>0){C=w,P=D,console.log(`✅ Found positions at address: ${w} (${I} positions)`);break}}C&&C.toLowerCase()!==e.toLowerCase()&&(this.state.proxy=C),h=P||await v.getPositions(this.state.proxy||e),a=await v.getValue(this.state.proxy||e),p=m,console.log("📊 Fetching markets data..."),r=await v.getMarketsCandidate(),this.updateDiagnostics(this.state.proxy||e,a,h,p,r)}console.log("🧠 Building user features...");const d=B.buildUserFeatures(h,p);this.state.features=d,console.log("👤 Updating profile UI..."),this.updateProfile(a,d,h,p),console.log("🎯 Processing and ranking markets...");const g=(r==null?void 0:r.data)||r||[];g.forEach(m=>{m.tags=this.normTags(m.tags)}),this.state.markets=g.filter(m=>(m==null?void 0:m.endDate)&&(m==null?void 0:m.question)),console.log(`📈 Found ${this.state.markets.length} valid markets`);const y=B.scoreMarkets(this.state.markets,d);this.state.recs=y.slice(0,24),console.log(`🏆 Generated ${this.state.recs.length} recommendations`),this.renderFeed(),this.clearStatus(),console.log("✅ Feed generation completed successfully")}catch(h){console.error("❌ Error fetching data:",h),this.setStatus("error","Failed to fetch data. Try Demo mode.")}}normTags(e){return e?e.map(t=>typeof t=="string"?t:t?t.name||t.tag||t.slug||t.id||String(t):"").filter(Boolean):[]}updateDiagnostics(e,t,s,n,i){var g,y,m;const c=document.getElementById("diagBox");c&&c.classList.remove("hidden");const u=`/pdata/value?user=${encodeURIComponent(e)}`,o=document.getElementById("diagValueUrl");o&&(o.textContent=u);const h=document.getElementById("diagValueOk");h&&(h.textContent=t?"yes":"no");const p=document.getElementById("diagPosOk");if(p){const f=((g=s==null?void 0:s.data)==null?void 0:g.length)??(s==null?void 0:s.length)??0;p.textContent=f>0?"yes":"no"}const a=document.getElementById("diagActOk");if(a){const f=((y=n==null?void 0:n.data)==null?void 0:y.length)??(n==null?void 0:n.length)??0;a.textContent=f>0?"yes":"no"}const r=document.getElementById("diagMarketsOk");if(r){const f=((m=i==null?void 0:i.data)==null?void 0:m.length)||(i==null?void 0:i.length)||0;r.textContent=f>0?`yes (${f})`:"no"}const d=document.getElementById("diagValueRaw");d&&(d.textContent=JSON.stringify(t,null,2))}updateProfile(e,t,s,n){var o,h,p;(o=this.elements.profileCard)==null||o.classList.remove("hidden");const i=this.extractPortfolioValue(e);if(this.elements.bankroll&&(this.elements.bankroll.textContent="$"+x.niceUsd(i,0)),this.elements.pnl&&(this.elements.pnl.textContent="—"),this.elements.proxyDisp&&(this.elements.proxyDisp.textContent=this.state.proxy||"(none)"),this.elements.topCats){this.elements.topCats.innerHTML="";const a=Object.entries(t.cat_counts).sort((r,d)=>d[1]-r[1]).slice(0,5);a.length===0?k.createChip(this.elements.topCats,"No categories yet"):a.forEach(([r,d])=>{k.createChip(this.elements.topCats,`${r} (${d})`)})}if(this.elements.topTags){this.elements.topTags.innerHTML="";const a=Object.entries(t.tag_counts).sort((r,d)=>d[1]-r[1]).slice(0,8);a.length===0?k.createChip(this.elements.topTags,"No tags yet"):a.forEach(([r,d])=>{k.createChip(this.elements.topTags,`#${r}`)})}const c=((h=s==null?void 0:s.data)==null?void 0:h.length)||(s==null?void 0:s.length)||0,u=((p=n==null?void 0:n.data)==null?void 0:p.length)||(n==null?void 0:n.length)||0;if(this.elements.historyNote&&(this.elements.historyNote.textContent=`positions: ${c} • activity: ${u}`),this.elements.matchNote){const a=this.state.isDemo?"demo":"live";this.elements.matchNote.textContent=`Using ${a} data`}}extractPortfolioValue(e){return e?typeof e=="number"?e:e.data&&typeof e.data.total<"u"?Number(e.data.total)||0:typeof e.total<"u"&&Number(e.total)||0:0}renderFeed(){var i,c,u;if(!this.elements.feed)return;const e=((i=this.elements.filterCategory)==null?void 0:i.value)||"",t=((c=this.elements.filterHorizon)==null?void 0:c.value)||"",s=Number(((u=this.elements.filterLiquidity)==null?void 0:u.value)||0);this.elements.feed.innerHTML="";let n=0;for(const{market:o,score:h,reasons:p}of this.state.recs){if(e&&o.category!==e)continue;const a=x.daysTo(o.endDate),r=x.horizonBucket(a);if(t&&r!==t)continue;const d=Number(o.liquidityNum||0);if(s&&Math.round(d/10)<s)continue;const g=k.createMarketCard(o,h,p);this.elements.feed.appendChild(g),n++}this.elements.emptyState&&this.elements.emptyState.classList.toggle("hidden",n>0)}applyFilters(){this.renderFeed()}async applyProxy(){var t,s;const e=((s=(t=this.elements.proxyOverride)==null?void 0:t.value)==null?void 0:s.trim())||"";e&&x.isHexAddress(e)&&(this.state.proxy=e,await this.onSeeFeed())}setStatus(e,t){if(this.elements.statusBar&&(this.elements.statusBar.classList.remove("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=t||""),this.elements.statusDot)){const s={live:"#22c55e",warn:"#f59e0b",error:"#ef4444",loading:"#f59e0b"};this.elements.statusDot.style.backgroundColor=s[e]||s.loading}}clearStatus(){var e;(e=this.elements.statusBar)==null||e.classList.add("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=""),this.elements.statusExtra&&(this.elements.statusExtra.textContent="")}}const j=new q;function O(){try{j.initialize()}catch(l){console.error("Failed to initialize app:",l)}}function V(){return setTimeout(()=>{O()},0),`
    <div class="app">
      ${S()}
      
      <main class="container">
        <div class="grid grid-3">
          <!-- Left Column -->
          <div class="sidebar">
            ${A()}
            ${F()}
            ${N()}
            
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
            ${M()}
            ${$()}
          </div>
        </div>
      </main>
    </div>
  `}document.querySelector("#app").innerHTML=V();
