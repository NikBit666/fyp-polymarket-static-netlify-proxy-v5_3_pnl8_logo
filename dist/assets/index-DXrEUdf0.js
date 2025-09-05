(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function S(){return`
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
  `}function P(){return`
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
        <strong>💡 Tip:</strong> This demo uses Netlify redirects to proxy Polymarket APIs and avoid CORS issues.
        For production, you'd need a backend proxy server.
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
  `}function _(){return`
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
  `}function T(){return`
    <div id="feed" class="grid gap-4">
      <!-- Market cards will be injected here -->
    </div>
    
    <div id="emptyState" class="text-center text-muted hidden" style="padding: 3rem;">
      <p>No recommendations yet. Try demo mode or adjust filters.</p>
    </div>
  `}function A(){return`
    <div id="statusBar" class="status-bar hidden">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span id="statusDot" style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
          <span id="statusText">Connecting…</span>
        </div>
        <div id="statusExtra" class="text-muted"></div>
      </div>
    </div>
  `}const F="/gamma",E="/pdata";class ${async getMarketsCandidate(){const e=`${F}/markets?closed=false&limit=1000&order=-volume24hr&include_tag=true`,t=await fetch(e,{credentials:"omit"});if(!t.ok)throw new Error("Gamma markets failed");return t.json()}async getPositions(e){const t=`${E}/positions?user=${e}`,s=await fetch(t,{credentials:"omit"});if(!s.ok)throw new Error("Positions failed");return s.json()}async getActivity(e,t=1e3){const s=`${E}/activity?user=${e}&limit=${t}`,n=await fetch(s,{credentials:"omit"});if(!n.ok)throw new Error("Activity failed");return n.json()}async getValue(e){const t=`${E}/value?user=${e}`,s=await fetch(t,{credentials:"omit"});if(!s.ok)throw new Error("Value failed");return s.json()}resolveProxyFromActivity(e){var n,a,u,p,l;const t=new Set;try{const f=(e==null?void 0:e.data)||e||[];for(const i of f){i.proxyWallet&&t.add(i.proxyWallet),(n=i==null?void 0:i.walletInfo)!=null&&n.proxyWallet&&t.add(i.walletInfo.proxyWallet),i!=null&&i.userProxy&&t.add(i.userProxy),(a=i==null?void 0:i.account)!=null&&a.proxy&&t.add(i.account.proxy),(u=i==null?void 0:i.account)!=null&&u.address&&t.add(i.account.address),(p=i==null?void 0:i.maker)!=null&&p.proxy&&t.add(i.maker.proxy),(l=i==null?void 0:i.taker)!=null&&l.proxy&&t.add(i.taker.proxy),i!=null&&i.maker&&t.add(i.maker),i!=null&&i.taker&&t.add(i.taker),i!=null&&i.wallet&&t.add(i.wallet),i!=null&&i.address&&t.add(i.address);for(const r in i){const o=i[r];if(typeof o=="string"&&o.startsWith("0x")&&o.length===42&&t.add(o),o&&typeof o=="object")for(const d in o){const h=o[d];typeof h=="string"&&h.startsWith("0x")&&h.length===42&&t.add(h)}}}}catch{}const s=[...t].filter(f=>/^0x[0-9a-fA-F]{40}$/.test(f));return{list:s,bestGuess:s[0]||null}}marketLink(e){return e?String(e).startsWith("0x")?`https://polymarket.com/market/${e}`:`https://polymarket.com/event/${e}`:"https://polymarket.com/"}async getPositionsCount(e){var t;try{const s=await this.getPositions(e);return{n:((t=s==null?void 0:s.data)==null?void 0:t.length)??(s==null?void 0:s.length)??0,raw:s}}catch{return{n:0,raw:null}}}async getSampleMarkets(){return(await fetch("./data/sample_markets.json")).json()}async getSamplePositions(){return(await fetch("./data/sample_positions.json")).json()}async getSampleActivity(){return(await fetch("./data/sample_activity.json")).json()}async getSampleValue(){return(await fetch("./data/sample_value.json")).json()}}const x=new $,v={isHexAddress(c){return typeof c!="string"||!c.startsWith("0x")?!1:c.length===42&&/^0x[0-9a-fA-F]{40}$/.test(c)},niceUsd(c,e=0){return c==null||Number.isNaN(c)?"—":Number(c).toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})},nicePct(c,e=0){return c==null||Number.isNaN(c)?"—":(Number(c)*100).toFixed(e)+"%"},clamp(c,e,t){return Math.max(e,Math.min(t,c))},daysTo(c){if(!c)return null;const e=new Date,t=new Date(c);if(isNaN(t.getTime()))return null;const s=t.getTime()-e.getTime(),n=Math.ceil(s/(1e3*60*60*24));return Math.max(0,n)},horizonBucket(c){return c===null?"unknown":c<=7?"short":c<=45?"medium":"long"},since(c){if(!c)return"";const e=new Date(c),t=(Date.now()-e.getTime())/1e3;return t<60?`${Math.floor(t)}s ago`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:e.toLocaleDateString()}};class L{buildUserFeatures(e=[],t=[]){const s={avg_usdc_size:0,median_usdc_size:0,size_std:0,cat_counts:{},tag_counts:{},yes_share:.5,price_dist_avg:0,horizon_pref:"medium",liq_pref_decile:5},n=[];let a=0,u=0;const p=[],l=[],f=(t==null?void 0:t.data)||t||[];for(const r of f){const o=Number(r.usdcSize||r.size_usdc||r.value_usd||0);!isNaN(o)&&o>0&&n.push(o);const d=String(r.side||"").toUpperCase(),h=r.outcomeIndex;d&&(h===0||h===1)&&(u+=1,h===1&&(a+=1));const y=Number(r.price||0);isNaN(y)||p.push(Math.abs(y-.5));const m=r.endDate||r.marketEndDate;if(m&&r.timestamp){const g=Math.ceil((new Date(m)-new Date(r.timestamp))/864e5);Number.isFinite(g)&&l.push(g)}}if(n.length){n.sort((o,d)=>o-d),s.avg_usdc_size=n.reduce((o,d)=>o+d,0)/n.length,s.median_usdc_size=n[Math.floor(n.length/2)];const r=s.avg_usdc_size;s.size_std=Math.sqrt(n.reduce((o,d)=>o+(d-r)*(d-r),0)/n.length)}s.yes_share=u?a/u:.5,s.price_dist_avg=p.length?p.reduce((r,o)=>r+o,0)/p.length:.1;const i=(e==null?void 0:e.data)||e||[];for(const r of i){const o=r.category||r.marketCategory;o&&(s.cat_counts[o]=(s.cat_counts[o]||0)+1);const d=r.tags||[];for(const m of d)m&&(s.tag_counts[m]=(s.tag_counts[m]||0)+1);const h=r.endDate,y=r.timestamp||r.openedAt;if(h&&y){const m=Math.ceil((new Date(h)-new Date(y))/864e5);Number.isFinite(m)&&l.push(m)}}if(l.length){l.sort((o,d)=>o-d);const r=l[Math.floor(l.length/2)];s.horizon_pref=v.horizonBucket(r)}return s}scoreMarkets(e,t){return e.map((n,a)=>{const u=this.scoreMarket(n,t),p=this.reasonsFor(n,t),f=(this.hashSeed("fyp")^a)%7/1e3;return{market:n,score:u+f,reasons:p}}).sort((n,a)=>a.score-n.score)}scoreMarket(e,t){const s=e.tags||[],n=this.simFromCounts(s,t.tag_counts),a=t.cat_counts[e.category||""]?1:0,u=Math.ceil((new Date(e.endDate)-Date.now())/864e5),p=v.horizonBucket(u),l=t.horizon_pref===p?1:p==="unknown"?.5:.2,f=Number(e.bestBid)||0,i=Number(e.bestAsk)||0,r=(f+i)/2||.5,o=Math.abs(r-.5),d=1-Math.abs(o-t.price_dist_avg),h=this.decileFromLiquidity(e.liquidityNum),y=1-Math.abs(h/10-t.liq_pref_decile/10),m=Number(e.volume24hr)||0,g=Math.tanh(m/2e4),b=.25*n+.15*a+.2*l+.15*d+.1*y+.1*g+.05;return v.clamp(b,0,1)}reasonsFor(e,t){const s=[];(e.tags||[]).some(l=>t.tag_counts[l])&&s.push("tags you favor"),t.cat_counts[e.category||""]&&s.push(`${e.category} you trade often`);const a=Math.ceil((new Date(e.endDate)-Date.now())/864e5);return v.horizonBucket(a)===t.horizon_pref&&s.push("matches your usual horizon"),(Number(e.volume24hr)||0)>1e4&&s.push("good recent volume"),s.slice(0,3)}simFromCounts(e=[],t={}){if(!e||!e.length)return 0;const s=e.reduce((n,a)=>n+(t[a]?Math.log(1+t[a]):0),0);return Math.min(1,s/10)}decileFromLiquidity(e){if(e==null)return 0;const t=Number(e)||0;return t<=10?1:t<=20?2:t<=30?3:t<=40?4:t<=50?5:t<=60?6:t<=70?7:t<=80?8:t<=90?9:10}hashSeed(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}}const N=new L;class z{createChip(e,t){const s=document.createElement("span");return s.className="chip",s.textContent=t,e.appendChild(s),s}createMarketCard(e,t,s){const n=document.createElement("div");n.className="card market-card";const a=v.daysTo(e.endDate),u=((Number(e.bestBid)||0)+(Number(e.bestAsk)||0))/2,p=Array.isArray(e.tags)?e.tags:[];return n.innerHTML=`
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
            ${u.toFixed(2)}¢
          </div>
          <div class="text-xs text-muted mt-1">
            bid ${(Number(e.bestBid)||0).toFixed(2)} | ask ${(Number(e.bestAsk)||0).toFixed(2)}
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center mb-3 text-sm">
        <div class="text-muted">
          Ends in ${a!==null?`${a}d`:"—"}
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
    `,n}}const C=new z;class j{constructor(){this.state={wallet:null,proxy:null,features:null,portfolio:0,pnl:null,markets:[],recs:[],live:!1},this.elements={}}initialize(){this.bindElements(),this.bindEvents()}bindElements(){this.elements={walletInput:document.getElementById("walletInput"),seeFeedBtn:document.getElementById("seeFeedBtn"),inputError:document.getElementById("inputError"),mockToggle:document.getElementById("mockToggle"),liveToggle:document.getElementById("liveToggle"),profileCard:document.getElementById("profileCard"),bankroll:document.getElementById("bankroll"),pnl:document.getElementById("pnl"),topCats:document.getElementById("topCats"),topTags:document.getElementById("topTags"),feed:document.getElementById("feed"),emptyState:document.getElementById("emptyState"),statusBar:document.getElementById("statusBar"),statusDot:document.getElementById("statusDot"),statusText:document.getElementById("statusText"),statusExtra:document.getElementById("statusExtra"),filterCategory:document.getElementById("filterCategory"),filterHorizon:document.getElementById("filterHorizon"),filterLiquidity:document.getElementById("filterLiquidity"),applyFilters:document.getElementById("applyFilters"),proxyDisp:document.getElementById("proxyDisp"),proxyOverride:document.getElementById("proxyOverride"),applyProxy:document.getElementById("applyProxy"),historyNote:document.getElementById("historyNote"),matchNote:document.getElementById("matchNote")}}bindEvents(){var e,t,s;(e=this.elements.seeFeedBtn)==null||e.addEventListener("click",()=>this.onSeeFeed()),(t=this.elements.applyFilters)==null||t.addEventListener("click",()=>this.applyFilters()),(s=this.elements.applyProxy)==null||s.addEventListener("click",()=>this.applyProxy())}async onSeeFeed(){var s,n,a,u,p,l;const e=((n=(s=this.elements.walletInput)==null?void 0:s.value)==null?void 0:n.trim())||"",t=((a=this.elements.mockToggle)==null?void 0:a.checked)||!1;if((u=this.elements.inputError)==null||u.classList.add("hidden"),!t&&!v.isHexAddress(e)){(p=this.elements.inputError)==null||p.classList.remove("hidden");return}this.setStatus("loading","Fetching your data…");try{let f,i,r,o;if(t)[f,i,r,o]=await Promise.all([x.getSamplePositions(),x.getSampleActivity(),x.getSampleValue(),x.getSampleMarkets()]),this.state.wallet="0xDEMO...";else{this.state.wallet=e;const m=await x.getActivity(e,1e3),g=x.resolveProxyFromActivity(m);let b=[];(l=g==null?void 0:g.list)!=null&&l.length&&(b=g.list),b=[e,...b.filter(k=>k.toLowerCase()!==e.toLowerCase())].slice(0,6);let w=null,B=null;for(const k of b){const{n:D,raw:M}=await x.getPositionsCount(k);if(D>0){w=k,B=M;break}}w&&w.toLowerCase()!==e.toLowerCase()&&(this.state.proxy=w),f=B||await x.getPositions(this.state.proxy||e),r=await x.getValue(this.state.proxy||e),i=m,o=await x.getMarketsCandidate(),this.updateDiagnostics(this.state.proxy||e,r,f,i,o)}const d=N.buildUserFeatures(f,i);this.state.features=d,this.updateProfile(r,d,f,i);const h=(o==null?void 0:o.data)||o||[];h.forEach(m=>{m.tags=this.normTags(m.tags)}),this.state.markets=h.filter(m=>(m==null?void 0:m.endDate)&&(m==null?void 0:m.question));const y=N.scoreMarkets(this.state.markets,d);this.state.recs=y.slice(0,24),this.renderFeed(),this.clearStatus()}catch(f){console.error("Error fetching data:",f),this.setStatus("error","Failed to fetch data. Try Demo mode.")}}normTags(e){return e?e.map(t=>typeof t=="string"?t:t?t.name||t.tag||t.slug||t.id||String(t):"").filter(Boolean):[]}updateDiagnostics(e,t,s,n,a){var h,y,m;const u=document.getElementById("diagBox");u&&u.classList.remove("hidden");const p=`${x.DATA_BASE}/value?user=${encodeURIComponent(e)}`,l=document.getElementById("diagValueUrl");l&&(l.textContent=p);const f=document.getElementById("diagValueOk");f&&(f.textContent=t?"yes":"no");const i=document.getElementById("diagPosOk");if(i){const g=((h=s==null?void 0:s.data)==null?void 0:h.length)??(s==null?void 0:s.length)??0;i.textContent=g>0?"yes":"no"}const r=document.getElementById("diagActOk");if(r){const g=((y=n==null?void 0:n.data)==null?void 0:y.length)??(n==null?void 0:n.length)??0;r.textContent=g>0?"yes":"no"}const o=document.getElementById("diagMarketsOk");if(o){const g=((m=a==null?void 0:a.data)==null?void 0:m.length)||(a==null?void 0:a.length)||0;o.textContent=g>0?`yes (${g})`:"no"}const d=document.getElementById("diagValueRaw");d&&(d.textContent=JSON.stringify(t,null,2))}updateProfile(e,t,s,n){var l,f,i;(l=this.elements.profileCard)==null||l.classList.remove("hidden");const a=this.extractPortfolioValue(e);this.elements.bankroll&&(this.elements.bankroll.textContent="$"+v.niceUsd(a,0)),this.elements.pnl&&(this.elements.pnl.textContent="—"),this.elements.proxyDisp&&(this.elements.proxyDisp.textContent=this.state.proxy||"(none)"),this.elements.topCats&&(this.elements.topCats.innerHTML="",Object.entries(t.cat_counts).sort((o,d)=>d[1]-o[1]).slice(0,5).forEach(([o,d])=>{C.createChip(this.elements.topCats,`${o} (${d})`)})),this.elements.topTags&&(this.elements.topTags.innerHTML="",Object.entries(t.tag_counts).sort((o,d)=>d[1]-o[1]).slice(0,8).forEach(([o,d])=>{C.createChip(this.elements.topTags,`#${o}`)}));const u=((f=s==null?void 0:s.data)==null?void 0:f.length)||(s==null?void 0:s.length)||0,p=((i=n==null?void 0:n.data)==null?void 0:i.length)||(n==null?void 0:n.length)||0;this.elements.historyNote&&(this.elements.historyNote.textContent=`positions: ${u} • activity: ${p}`),this.elements.matchNote&&(this.elements.matchNote.textContent="Using sample data for demonstration")}extractPortfolioValue(e){return e?typeof e=="number"?e:e.data&&typeof e.data.total<"u"?Number(e.data.total)||0:typeof e.total<"u"&&Number(e.total)||0:0}renderFeed(){var a,u,p;if(!this.elements.feed)return;const e=((a=this.elements.filterCategory)==null?void 0:a.value)||"",t=((u=this.elements.filterHorizon)==null?void 0:u.value)||"",s=Number(((p=this.elements.filterLiquidity)==null?void 0:p.value)||0);this.elements.feed.innerHTML="";let n=0;for(const{market:l,score:f,reasons:i}of this.state.recs){if(e&&l.category!==e)continue;const r=v.daysTo(l.endDate),o=v.horizonBucket(r);if(t&&o!==t)continue;const d=Number(l.liquidityNum||0);if(s&&Math.round(d/10)<s)continue;const h=C.createMarketCard(l,f,i);this.elements.feed.appendChild(h),n++}this.elements.emptyState&&this.elements.emptyState.classList.toggle("hidden",n>0)}applyFilters(){this.renderFeed()}async applyProxy(){var t,s;const e=((s=(t=this.elements.proxyOverride)==null?void 0:t.value)==null?void 0:s.trim())||"";e&&v.isHexAddress(e)&&(this.state.proxy=e,await this.onSeeFeed())}setStatus(e,t){if(this.elements.statusBar&&(this.elements.statusBar.classList.remove("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=t||""),this.elements.statusDot)){const s={live:"#22c55e",warn:"#f59e0b",error:"#ef4444",loading:"#f59e0b"};this.elements.statusDot.style.backgroundColor=s[e]||s.loading}}clearStatus(){var e;(e=this.elements.statusBar)==null||e.classList.add("hidden"),this.elements.statusText&&(this.elements.statusText.textContent=""),this.elements.statusExtra&&(this.elements.statusExtra.textContent="")}}const O=new j;function q(){O.initialize()}function V(){return setTimeout(()=>{q()},0),`
    <div class="app">
      ${S()}
      
      <main class="container">
        <div class="grid grid-3">
          <!-- Left Column -->
          <div class="sidebar">
            ${P()}
            ${I()}
            ${_()}
            
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
            ${A()}
            ${T()}
          </div>
        </div>
      </main>
    </div>
  `}document.querySelector("#app").innerHTML=V();
