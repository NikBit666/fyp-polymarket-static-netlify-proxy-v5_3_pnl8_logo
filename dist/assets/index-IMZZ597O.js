(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();function _(){return`
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
  `}function N(){return`
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
        <strong>⚠️ CORS Limitation:</strong> Browser security blocks direct API calls to Polymarket. 
        Check browser console for API attempt details. Currently showing sample data for demo.
        <br><br>
        <strong>💡 For production:</strong> This would need a backend proxy server to bypass CORS restrictions.
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
  `}function L(){return`
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
  `}function z(){return`
    <div id="statusBar" class="status-bar hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span id="statusDot" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
          <span id="statusText">Connecting…</span>
        </div>
        <div id="statusExtra" class="text-muted"></div>
      </div>
    </div>
  `}class O{constructor(){this.GAMMA_BASE="https://gamma-api.polymarket.com",this.DATA_BASE="https://data-api.polymarket.com"}async getMarketsCandidate(){var e;try{console.log("🔄 Attempting to fetch markets from Polymarket API...");const t=`${this.GAMMA_BASE}/markets?closed=false&limit=100&order=-volume24hr`;console.log("📡 URL:",t);const s=await fetch(t,{mode:"cors",credentials:"omit",headers:{Accept:"application/json"}});if(!s.ok)throw console.warn("❌ API Response not OK:",s.status,s.statusText),new Error(`Gamma markets failed: ${s.status}`);console.log("✅ Markets API successful!");const o=await s.json();return console.log("📊 Markets data received:",((e=o==null?void 0:o.data)==null?void 0:e.length)||0,"markets"),o}catch(t){return console.warn("❌ Live Markets API failed, using sample data:",t.message),console.warn("🔍 This is likely due to CORS restrictions in browser environment"),this.getSampleMarkets()}}async getPositions(e){try{console.log("🔄 Attempting to fetch positions for:",e);const t=`${this.DATA_BASE}/positions?user=${e}`;console.log("📡 URL:",t);const s=await fetch(t,{mode:"cors",credentials:"omit",headers:{Accept:"application/json","User-Agent":"Mozilla/5.0 (compatible; FYP-Demo/1.0)"}});if(!s.ok)throw console.warn("❌ Positions API Response not OK:",s.status,s.statusText),new Error(`Positions failed: ${s.status}`);return console.log("✅ Positions API successful!"),await s.json()}catch(t){return console.warn("❌ Live Positions API failed, using sample data:",t.message),console.warn("🔍 This is likely due to CORS restrictions in browser environment"),this.getSamplePositions()}}async getActivity(e,t=1e3){try{console.log("🔄 Attempting to fetch activity for:",e);const s=`${this.DATA_BASE}/activity?user=${e}&limit=${t}`;console.log("📡 URL:",s);const o=await fetch(s,{mode:"cors",credentials:"omit",headers:{Accept:"application/json","User-Agent":"Mozilla/5.0 (compatible; FYP-Demo/1.0)"}});if(!o.ok)throw console.warn("❌ Activity API Response not OK:",o.status,o.statusText),new Error(`Activity failed: ${o.status}`);return console.log("✅ Activity API successful!"),await o.json()}catch(s){return console.warn("❌ Live Activity API failed, using sample data:",s.message),console.warn("🔍 This is likely due to CORS restrictions in browser environment"),this.getSampleActivity()}}async getValue(e){try{console.log("🔄 Attempting to fetch portfolio value for:",e);const t=`${this.DATA_BASE}/value?user=${e}`;console.log("📡 URL:",t);const s=await fetch(t,{mode:"cors",credentials:"omit",headers:{Accept:"application/json","User-Agent":"Mozilla/5.0 (compatible; FYP-Demo/1.0)"}});if(!s.ok)throw console.warn("❌ Value API Response not OK:",s.status,s.statusText),new Error(`Value failed: ${s.status}`);return console.log("✅ Value API successful!"),await s.json()}catch(t){return console.warn("❌ Live Value API failed, using sample data:",t.message),console.warn("🔍 This is likely due to CORS restrictions in browser environment"),this.getSampleValue()}}resolveProxyFromActivity(e){var o,r,m,p,l;const t=new Set;try{const g=(e==null?void 0:e.data)||e||[];for(const n of g){n.proxyWallet&&t.add(n.proxyWallet),(o=n==null?void 0:n.walletInfo)!=null&&o.proxyWallet&&t.add(n.walletInfo.proxyWallet),n!=null&&n.userProxy&&t.add(n.userProxy),(r=n==null?void 0:n.account)!=null&&r.proxy&&t.add(n.account.proxy),(m=n==null?void 0:n.account)!=null&&m.address&&t.add(n.account.address),(p=n==null?void 0:n.maker)!=null&&p.proxy&&t.add(n.maker.proxy),(l=n==null?void 0:n.taker)!=null&&l.proxy&&t.add(n.taker.proxy),n!=null&&n.maker&&t.add(n.maker),n!=null&&n.taker&&t.add(n.taker),n!=null&&n.wallet&&t.add(n.wallet),n!=null&&n.address&&t.add(n.address);for(const a in n){const i=n[a];if(typeof i=="string"&&i.startsWith("0x")&&i.length===42&&t.add(i),i&&typeof i=="object")for(const d in i){const c=i[d];typeof c=="string"&&c.startsWith("0x")&&c.length===42&&t.add(c)}}}}catch(g){console.warn("Error parsing activity for proxy detection:",g)}const s=[...t].filter(g=>/^0x[0-9a-fA-F]{40}$/.test(g));return{list:s,bestGuess:s[0]||null}}async getPositionsCount(e){var t;try{const s=await this.getPositions(e);return{count:((t=s==null?void 0:s.data)==null?void 0:t.length)??(s==null?void 0:s.length)??0,raw:s}}catch{return{count:0,raw:null}}}async getSampleMarkets(){return(await fetch("./data/sample_markets.json")).json()}async getSamplePositions(){return(await fetch("./data/sample_positions.json")).json()}async getSampleActivity(){return(await fetch("./data/sample_activity.json")).json()}async getSampleValue(){return(await fetch("./data/sample_value.json")).json()}marketLink(e){return e?String(e).startsWith("0x")?`https://polymarket.com/market/${e}`:`https://polymarket.com/event/${e}`:"https://polymarket.com/"}}const v=new O,x={isHexAddress(u){return typeof u!="string"||!u.startsWith("0x")?!1:u.length===42&&/^0x[0-9a-fA-F]{40}$/.test(u)},niceUsd(u,e=0){return u==null||Number.isNaN(u)?"—":Number(u).toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})},nicePct(u,e=0){return u==null||Number.isNaN(u)?"—":(Number(u)*100).toFixed(e)+"%"},clamp(u,e,t){return Math.max(e,Math.min(t,u))},daysTo(u){if(!u)return null;const e=new Date,t=new Date(u);if(isNaN(t.getTime()))return null;const s=t.getTime()-e.getTime(),o=Math.ceil(s/(1e3*60*60*24));return Math.max(0,o)},horizonBucket(u){return u===null?"unknown":u<=7?"short":u<=45?"medium":"long"},since(u){if(!u)return"";const e=new Date(u),t=(Date.now()-e.getTime())/1e3;return t<60?`${Math.floor(t)}s ago`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:e.toLocaleDateString()}};class j{buildUserFeatures(e=[],t=[]){const s={avg_usdc_size:0,median_usdc_size:0,size_std:0,cat_counts:{},tag_counts:{},yes_share:.5,price_dist_avg:0,horizon_pref:"medium",liq_pref_decile:5},o=[];let r=0,m=0;const p=[],l=[],g=(t==null?void 0:t.data)||t||[];for(const a of g){const i=Number(a.usdcSize||a.size_usdc||a.value_usd||0);!isNaN(i)&&i>0&&o.push(i);const d=String(a.side||"").toUpperCase(),c=a.outcomeIndex;d&&(c===0||c===1)&&(m+=1,c===1&&(r+=1));const f=Number(a.price||0);isNaN(f)||p.push(Math.abs(f-.5));const h=a.endDate||a.marketEndDate;if(h&&a.timestamp){const w=Math.ceil((new Date(h)-new Date(a.timestamp))/864e5);Number.isFinite(w)&&l.push(w)}}if(o.length){o.sort((i,d)=>i-d),s.avg_usdc_size=o.reduce((i,d)=>i+d,0)/o.length,s.median_usdc_size=o[Math.floor(o.length/2)];const a=s.avg_usdc_size;s.size_std=Math.sqrt(o.reduce((i,d)=>i+(d-a)*(d-a),0)/o.length)}s.yes_share=m?r/m:.5,s.price_dist_avg=p.length?p.reduce((a,i)=>a+i,0)/p.length:.1;const n=(e==null?void 0:e.data)||e||[];for(const a of n){const i=a.category||a.marketCategory;i&&(s.cat_counts[i]=(s.cat_counts[i]||0)+1);const d=a.tags||[];for(const h of d)h&&(s.tag_counts[h]=(s.tag_counts[h]||0)+1);const c=a.endDate,f=a.timestamp||a.openedAt;if(c&&f){const h=Math.ceil((new Date(c)-new Date(f))/864e5);Number.isFinite(h)&&l.push(h)}}if(l.length){l.sort((i,d)=>i-d);const a=l[Math.floor(l.length/2)];s.horizon_pref=x.horizonBucket(a)}return s}scoreMarkets(e,t){var r,m,p;console.log("🔍 Scoring markets:",e.length),console.log("📊 Sample market structure:",e[0]);const o=e.map((l,g)=>{const n=this.scoreMarket(l,t),a=this.reasonsFor(l,t),d=(this.hashSeed((t.wallet||"demo")+"::fyp")^g)%7/1e3;return{market:l,score:n+d,reasons:a}}).sort((l,g)=>g.score-l.score);return console.log("🏅 Top scored market:",(m=(r=o[0])==null?void 0:r.market)==null?void 0:m.question,"Score:",(p=o[0])==null?void 0:p.score),o}scoreMarket(e,t){const s=e.tags||[],o=this.simFromCounts(s,t.tag_counts),r=t.cat_counts[e.category||""]?1:0,m=Math.ceil((new Date(e.endDate)-Date.now())/864e5),p=x.horizonBucket(m),l=t.horizon_pref===p?1:p==="unknown"?.5:.2,g=Number(e.bestBid)||0,n=Number(e.bestAsk)||0,a=(g+n)/2||.5,i=Math.abs(a-.5),d=1-Math.abs(i-t.price_dist_avg),c=this.decileFromLiquidity(e.liquidityNum),f=1-Math.abs(c/10-t.liq_pref_decile/10),h=Number(e.volume24hr)||0,w=Math.tanh(h/2e4),P=.25*o+.15*r+.2*l+.15*d+.1*f+.1*w+.05;return x.clamp(P,0,1)}reasonsFor(e,t){const s=[];(e.tags||[]).some(l=>t.tag_counts[l])&&s.push("tags you favor"),t.cat_counts[e.category||""]&&s.push(`${e.category} you trade often`);const r=Math.ceil((new Date(e.endDate)-Date.now())/864e5);return x.horizonBucket(r)===t.horizon_pref&&s.push("matches your usual horizon"),(Number(e.volume24hr)||0)>1e4&&s.push("good recent volume"),s.slice(0,3)}simFromCounts(e=[],t={}){if(!e||!e.length)return 0;const s=e.reduce((o,r)=>o+(t[r]?Math.log(1+t[r]):0),0);return Math.min(1,s/10)}decileFromLiquidity(e){if(e==null)return 0;const t=Number(e)||0;return t<=10?1:t<=20?2:t<=30?3:t<=40?4:t<=50?5:t<=60?6:t<=70?7:t<=80?8:t<=90?9:10}hashSeed(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}}const B=new j;class U{createChip(e,t){const s=document.createElement("span");return s.className="chip",s.textContent=t,e.appendChild(s),s}createMarketCard(e,t,s){console.log("🎨 Creating card for market:",e.question);const o=document.createElement("div");o.className="card market-card";const r=x.daysTo(e.endDate),m=((Number(e.bestBid)||0)+(Number(e.bestAsk)||0))/2,p=Array.isArray(e.tags)?e.tags:[];return console.log("🏷️ Market tags:",p),o.innerHTML=`
      <div class="flex justify-between items-start gap-4 mb-4">
        <div style="flex: 1;">
          <a href="https://polymarket.com/market/${e.slug||e.conditionId}" 
             target="_blank" 
             class="link font-semibold text-lg" 
             style="display: block; margin-bottom: 0.5rem;">
            ${e.question}
          </a>
          <div class="flex gap-2" style="flex-wrap: wrap;">
            ${p.slice(0,5).map(l=>`<span class="chip">#${l}</span>`).join("")}
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
          Ends in ${r!==null?`${r}d`:"—"}
        </div>
        <div class="text-muted">
          24h vol ${Number(e.volume24hr||0).toLocaleString()}
        </div>
      </div>
      
      <div class="flex gap-2 mb-3" style="flex-wrap: wrap;">
        ${(s||[]).map(l=>`<span class="chip">${l}</span>`).join("")}
      </div>
      
      <div class="text-xs text-muted">
        Rank ${Math.round(t*100)}/100
      </div>
    `,o}}const E=new U;class R{constructor(){this.state={wallet:null,proxy:null,features:null,portfolio:0,pnl:null,markets:[],recs:[],live:!1},this.elements={}}initialize(){this.bindElements(),this.bindEvents()}bindElements(){this.elements={walletInput:document.getElementById("walletInput"),seeFeedBtn:document.getElementById("seeFeedBtn"),inputError:document.getElementById("inputError"),mockToggle:document.getElementById("mockToggle"),liveToggle:document.getElementById("liveToggle"),profileCard:document.getElementById("profileCard"),bankroll:document.getElementById("bankroll"),pnl:document.getElementById("pnl"),topCats:document.getElementById("topCats"),topTags:document.getElementById("topTags"),feed:document.getElementById("feed"),emptyState:document.getElementById("emptyState"),statusBar:document.getElementById("statusBar"),statusDot:document.getElementById("statusDot"),statusText:document.getElementById("statusText"),statusExtra:document.getElementById("statusExtra"),filterCategory:document.getElementById("filterCategory"),filterHorizon:document.getElementById("filterHorizon"),filterLiquidity:document.getElementById("filterLiquidity"),applyFilters:document.getElementById("applyFilters"),proxyDisp:document.getElementById("proxyDisp"),proxyOverride:document.getElementById("proxyOverride"),applyProxy:document.getElementById("applyProxy"),historyNote:document.getElementById("historyNote"),matchNote:document.getElementById("matchNote")}}bindEvents(){var e,t,s;(e=this.elements.seeFeedBtn)==null||e.addEventListener("click",()=>this.onSeeFeed()),(t=this.elements.applyFilters)==null||t.addEventListener("click",()=>this.applyFilters()),(s=this.elements.applyProxy)==null||s.addEventListener("click",()=>this.applyProxy())}async onSeeFeed(){var s,o,r,m,p,l,g,n;const e=((o=(s=this.elements.walletInput)==null?void 0:s.value)==null?void 0:o.trim())||"",t=((r=this.elements.mockToggle)==null?void 0:r.checked)||!1;if((m=this.elements.liveToggle)!=null&&m.checked,(p=this.elements.inputError)==null||p.classList.add("hidden"),!t&&!x.isHexAddress(e)){(l=this.elements.inputError)==null||l.classList.remove("hidden");return}this.setStatus("loading","Fetching your data…");try{let a,i,d,c;if(t)a=await v.getSamplePositions(),i=await v.getSampleActivity(),d=await v.getSampleValue(),c=await v.getSampleMarkets(),this.state.wallet="0xDEMO...",console.log("📋 Using demo data");else{this.state.wallet=e;const y=await v.getActivity(e,1e3),k=v.resolveProxyFromActivity(y);let S=[e];(g=k==null?void 0:k.list)!=null&&g.length&&(S=[e,...k.list.filter(b=>b.toLowerCase()!==e.toLowerCase())].slice(0,6));let A=null,M=null;for(const b of S){const{count:D,raw:T}=await v.getPositionsCount(b);if(D>0){A=b,M=T;break}}A&&A.toLowerCase()!==e.toLowerCase()&&(this.state.proxy=A);const C=this.state.proxy||e;a=M||await v.getPositions(C),d=await v.getValue(C),i=y,console.log("🔄 Fetching real markets data..."),c=await v.getMarketsCandidate(),console.log("📊 Markets response:",c),this.updateDiagnostics(C,d,a,i);const I=document.getElementById("diagMarketsOk");if(I){const b=((n=c==null?void 0:c.data)==null?void 0:n.length)||(c==null?void 0:c.length)||0;I.textContent=b>0?`yes (${b})`:"no"}}console.log("🧠 Building user features from positions/activity...");const f=B.buildUserFeatures(a,i);this.state.features=f,console.log("✨ User features:",f),this.updateProfile(d,f,a,i);const h=(c==null?void 0:c.data)||c||[];console.log("🎯 Processing markets data:",h),console.log("📈 Market count:",h.length);const w=h.filter(y=>y&&y.question&&y.endDate);console.log("✅ Valid markets for ranking:",w.length);const P=B.scoreMarkets(h,f);this.state.recs=P.slice(0,24),console.log("🏆 Generated recommendations:",this.state.recs.length),console.log("🎯 Sample recommendations:",this.state.recs.slice(0,3).map(y=>({question:y.market.question,score:y.score,category:y.market.category}))),this.renderFeed(),this.clearStatus()}catch(a){console.error("Error fetching data:",a),this.setStatus("error","Failed to fetch data. Try Demo mode.")}}updateDiagnostics(e,t,s,o){var i,d;const r=document.getElementById("diagBox");r&&r.classList.remove("hidden");const m=`https://data-api.polymarket.com/value?user=${encodeURIComponent(e)}`,p=document.getElementById("diagValueUrl");p&&(p.textContent=m);const l=document.getElementById("diagValueOk");l&&(l.textContent=t?"yes":"no");const g=document.getElementById("diagPosOk");if(g){const c=((i=s==null?void 0:s.data)==null?void 0:i.length)??(s==null?void 0:s.length)??0;g.textContent=c>0?"yes":"no"}const n=document.getElementById("diagActOk");if(n){const c=((d=o==null?void 0:o.data)==null?void 0:d.length)??(o==null?void 0:o.length)??0;n.textContent=c>0?"yes":"no"}const a=document.getElementById("diagValueRaw");a&&(a.textContent=JSON.stringify(t,null,2))}updateProfile(e,t,s,o){var l,g,n;(l=this.elements.profileCard)==null||l.classList.remove("hidden");const r=this.extractPortfolioValue(e);this.elements.bankroll&&(this.elements.bankroll.textContent="$"+x.niceUsd(r,0)),this.elements.pnl&&(this.elements.pnl.textContent="—"),this.elements.proxyDisp&&(this.elements.proxyDisp.textContent=this.state.proxy||"(none)"),this.elements.topCats&&(this.elements.topCats.innerHTML="",Object.entries(t.cat_counts).sort((i,d)=>d[1]-i[1]).slice(0,5).forEach(([i,d])=>{E.createChip(this.elements.topCats,`${i} (${d})`)})),this.elements.topTags&&(this.elements.topTags.innerHTML="",Object.entries(t.tag_counts).sort((i,d)=>d[1]-i[1]).slice(0,8).forEach(([i,d])=>{E.createChip(this.elements.topTags,`#${i}`)}));const m=((g=s==null?void 0:s.data)==null?void 0:g.length)||(s==null?void 0:s.length)||0,p=((n=o==null?void 0:o.data)==null?void 0:n.length)||(o==null?void 0:o.length)||0;this.elements.historyNote&&(this.elements.historyNote.textContent=`positions: ${m} • activity: ${p}`),this.elements.matchNote&&(this.elements.matchNote.textContent="Using sample data for demonstration")}extractPortfolioValue(e){return e?typeof e=="number"?e:e.data&&typeof e.data.total<"u"?Number(e.data.total)||0:typeof e.total<"u"&&Number(e.total)||0:0}renderFeed(){var r,m,p;if(!this.elements.feed)return;const e=((r=this.elements.filterCategory)==null?void 0:r.value)||"",t=((m=this.elements.filterHorizon)==null?void 0:m.value)||"",s=Number(((p=this.elements.filterLiquidity)==null?void 0:p.value)||0);this.elements.feed.innerHTML="";let o=0;for(const{market:l,score:g,reasons:n}of this.state.recs){if(e&&l.category!==e)continue;const a=x.daysTo(l.endDate),i=x.horizonBucket(a);if(t&&i!==t)continue;const d=Number(l.liquidityNum||0);if(s&&Math.round(d/10)<s)continue;const c=E.createMarketCard(l,g,n);this.elements.feed.appendChild(c),o++}this.elements.emptyState&&this.elements.emptyState.classList.toggle("hidden",o>0)}applyFilters(){this.renderFeed()}async applyProxy(){var t,s;const e=((s=(t=this.elements.proxyOverride)==null?void 0:t.value)==null?void 0:s.trim())||"";e&&x.isHexAddress(e)&&(this.state.proxy=e,await this.onSeeFeed())}setStatus(e,t){if(this.elements.statusBar&&(this.elements.statusBar.classList.remove("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=t||""),this.elements.statusDot)){const s={live:"#22c55e",warn:"#f59e0b",error:"#ef4444",loading:"#f59e0b"};this.elements.statusDot.style.backgroundColor=s[e]||s.loading}}clearStatus(){var e;(e=this.elements.statusBar)==null||e.classList.add("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=""),this.elements.statusExtra&&(this.elements.statusExtra.textContent="")}}const V=new R;function q(){V.initialize()}function H(){return setTimeout(()=>{q()},0),`
    <div class="app">
      ${_()}
      
      <main class="container">
        <div class="grid grid-3">
          <!-- Left Column -->
          <div class="sidebar">
            ${N()}
            ${F()}
            ${L()}
            
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
            ${z()}
            ${$()}
          </div>
        </div>
      </main>
    </div>
  `}document.querySelector("#app").innerHTML=H();
