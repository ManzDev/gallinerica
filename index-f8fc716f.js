(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --width: 192px;
        --height: 96px;
        --speed: 800ms;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: url("images/belt-sprite.png");
        animation: belt-animate var(--speed) steps(4) infinite;
      }

      @keyframes belt-animate {
        0% { background-position: 0; }
        100% { background-position: -768px; }
      }

      :host([stop]) .container {
        animation-play-state: paused;
      }
    `}connectedCallback(){this.render()}toggle(){this.toggleAttribute("stop")}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">

    </div>`}}customElements.define("belt-machine",p);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --width: 96px;
        --height: 192px;

        position: relative;
        z-index: 10;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: url("images/cabin-sprite.png");
      }
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">
    </div>`}}customElements.define("home-cabin",m);let l="easy";const M={easy:{TIME_TO_SPAWN_NEW_CHECK:6e3,TIME_TO_TRANSLATE:6e3,TIME_TO_WAIT:4e3},normal:{TIME_TO_SPAWN_NEW_CHECK:4e3,TIME_TO_TRANSLATE:5e3,TIME_TO_WAIT:2500},hard:{TIME_TO_SPAWN_NEW_CHECK:2500,TIME_TO_TRANSLATE:4e3,TIME_TO_WAIT:1500},extreme:{TIME_TO_SPAWN_NEW_CHECK:2e3,TIME_TO_TRANSLATE:3e3,TIME_TO_WAIT:1e3}},C={1:"easy",2:"normal",3:"hard",4:"extreme"},L=o=>l=C[o],c=()=>M[l];class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.isChickenified=!1,this.isMove=!0}static get styles(){return`
      :host {
        --image: url("images/chicken-sprite.png");
        --width: 96px;
        --height: 96px;
      }

      :host(.radioactive) { --image: url("images/radioactive-sprite.png"); }
      :host(.voltage) { --image: url("images/voltage-sprite.png"); }
      :host(.package) { --image: url("images/package-sprite.png"); }
      :host(.beer) { --image: url("images/beer-sprite.png"); }
      :host(.fire) { --image: url("images/fire-sprite.png"); }
      :host(.crown) { --image: url("images/crown-sprite.png"); }
      :host(.rocket) { --image: url("images/rocket-sprite.png"); }
      :host(.ice) { --image: url("images/ice-sprite.png"); }
      :host(.briefcase) { --image: url("images/briefcase-sprite.png"); }
      :host(.magic) { --image: url("images/magic-sprite.png"); }

      .username {
        position: absolute;
        top: -25px;
        color: #fff;
        z-index: 20;
        font-family: EnterCommand, sans-serif;
        font-size: 35px;
        width: var(--width);
        display: flex;
        justify-content: center;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background: var(--image);
        animation: idle 400ms steps(4) infinite;
        transform: translateX(-100%);
        position: relative;
      }

      :host([is-podium]) {
        transform: scale(50%);
      }

      :host([is-podium]) .container {
        transform: none;
      }

      @keyframes idle {
        0% { background-position: 0; }
        100% { background-position: -384px; }
      }
    `}getType(){return this.classList.item(0)}spawn(){const e=[{transform:"translateX(350%)"}],t={duration:c().TIME_TO_TRANSLATE,fill:"forwards"};this.container.animate(e,t).finished.then(()=>this.onStop())}leave(){this.isMove=!0;const e=[{transform:"translateX(350%)"},{transform:"translateX(800%)"}],t={duration:c().TIME_TO_TRANSLATE,fill:"forwards"};this.container.animate(e,t).finished.then(()=>this.onExit())}onStop(){this.isMove=!1,setTimeout(()=>this.leave(),c().TIME_TO_WAIT)}sanitize(e){this.isChickenified=!0;const t=[{filter:"brightness(0) invert(1) drop-shadow(0 0 0 gold)"},{filter:"brightness(0) invert(1) drop-shadow(0 0 10px gold)"},{filter:"brightness(0) invert(1) drop-shadow(0 0 0 gold)"}];this.addName(e),this.container.animate(t,1e3).finished.then(()=>this.restore())}addName(e){const t=document.createElement("div");t.textContent=e,t.classList.add("username"),this.container.prepend(t);const s=[{transform:"translate(0, 0)",opacity:1},{transform:"translate(0, -25px)",opacity:0}],i={duration:1e3,delay:1e3,fill:"forwards"};t.animate(s,i)}restore(){this.classList.remove(this.getType())}onExit(){this.remove()}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container")}render(){this.shadowRoot.innerHTML=`
    <style>${g.styles}</style>
    <div class="container">
    </div>`}}customElements.define("chicken-npc",g);const S=o=>{let e=o.length,t,s;for(;e;)s=Math.floor(Math.random()*e--),t=o[e],o[e]=o[s],o[s]=t;return o},h=["beer","briefcase","crown","fire","ice","magic","package","radioactive","rocket","voltage"],_=()=>{const e=S(h).map((t,s)=>[s,t]);return Object.fromEntries(e)};class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.isWaiting=!1}static get styles(){return`
      :host {
        display: inline-block;
        width: 100%;
      }

      .container {
        width: 100%;
        height: 150px;
        overflow-x: hidden;
        position: relative;
        display: flex;
        align-items: end;
      }

      chicken-npc {
        position: absolute;
      }
    `}connectedCallback(){this.render(),this.startSpawnChicken()}startSpawnChicken(){this.isWaiting=!1,this.timer=setInterval(()=>this.spawnChicken(),c().TIME_TO_SPAWN_NEW_CHECK)}getMainChicken(){return[...this.shadowRoot.querySelectorAll(".container > *")].find(s=>s.isMove===!1)}resetAndWait(e){this.isWaiting=!0,clearInterval(this.timer),this.timer=null,setTimeout(()=>this.startSpawnChicken(),e)}spawnChicken(){if(document.hidden)return;const e=document.createElement("chicken-npc"),t=Math.floor(Math.random()*h.length);e.classList.add(h[t]),this.shadowRoot.querySelector(".container").append(e),e.spawn()}render(){this.shadowRoot.innerHTML=`
    <style>${u.styles}</style>
    <div class="container">
    </div>`}}customElements.define("chicken-pool",u);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {

      }

      .container {
        border-top: 4px solid #000;
        background: #fff;
        height: 100%;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        box-sizing: border-box;
      }

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .circle {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
      }

      .item img {
        --size: 48px;

        image-rendering: crisp-edges;
        width: var(--size);
        height: var(--size);

        filter:
          drop-shadow(0 0 0 #000a)
          drop-shadow(1px 0 0 #000a)
          drop-shadow(0 1px 0 #000a)
          drop-shadow(-1px 0 0 #000a)
          drop-shadow(0 -1px 0 #000a)
          drop-shadow(0 0 2px #000a);
      }

      .item span {
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        text-shadow: 0 0 2px #0006;
      }
    `}getNumber(e){return Object.values(this.icons).findIndex(i=>e===i)}getIcon(e){return this.icons[e]}renderIcons(){return this.icons=_(),Object.values(this.icons).map((s,i)=>`
    <div class="item">
      <div class="circle">
        <img src="images/icons-old/${s}.png">
      </div>
      <span>${i}</span>
    </div>`).join("")}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${f.styles}</style>
    <div class="container">
      ${this.renderIcons()}
    </div>`}}customElements.define("number-list",f);const I={0:"url(images/avatars/king.png)",1:"url(images/avatars/silver.png)",2:"url(images/avatars/bronze.png)",3:"url(images/avatars/normal.png)",4:"url(images/avatars/normal.png)"};class v extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.init()}init(){this.table={},this.lastWinner=null}static get styles(){return`
      :host {
        --color: #ffd700;
      }

      .container {
        width: 250px;
        height: 155px;
        padding: 6px;
      }

      .box {
        background: #13122e;
      }

      .box:nth-child(2) {
        padding: 0 4px;
      }

      .box:nth-child(3) {
        text-align: center;
      }

      .streak {
        --color: lime;
      }

      .user {
        display: grid;
        grid-template-columns: 20px 1fr 35px;
        gap: 0 6px;
        font-family: EnterCommand, sans-serif;
        font-size: 28px;
        color: var(--color);
        padding: 3px;
      }

      .avatar {
        background-image: var(--image);
        width: 20px;
        height: 24px;
        animation: animate 1s steps(4) infinite;
      }

      @keyframes animate {
        0% { background-position: 0; }
        100% { background-position: -80px; }
      }
    `}connectedCallback(){this.render()}addPoint(e){this.lastWinner=e,this.table[e]=(this.table[e]||0)+1,this.render()}getLeaderBoard(){return Object.entries(this.table).map(([i,n])=>({username:i,points:n})).sort((i,n)=>n.points-i.points).slice(0,5)}renderTable(){return this.getLeaderBoard().map(({username:s,points:i},n)=>{const a=this.lastWinner===s?"streak":"";return`
      <div class="user user-${s} ${a}">
        <div class="avatar" style="--image: ${I[n]}"></div>
        <div class="box">${s}</div>
        <div class="box">${i}</div>
      </div>`}).join("")}render(){this.shadowRoot.innerHTML=`
    <style>${v.styles}</style>
    <div class="container">
      ${this.renderTable()}
    </div>`}}customElements.define("chicken-board",v);class y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --size: 32px;
      }

      .container {
        width: var(--size);
        height: var(--size);
        background: url("images/chicken.png");
        animation: animated 400ms steps(4) infinite;
        transform: translate(var(--x, 0), 0);
      }

      @keyframes animated {
        0% { background-position: 0px; }
        100% { background-position: -256px; }
      }
    `}init(){this.x=0}update(){const e=-1+Math.floor(Math.random()*3),t=this.x+e;this.style.setProperty("--x",`${t}px`)}connectedCallback(){this.init(),this.render(),setInterval(()=>this.update(),500)}render(){this.shadowRoot.innerHTML=`
    <style>${y.styles}</style>
    <div class="container">
    </div>`}}customElements.define("chicken-podium",y);const A=10;class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.lastStreak=null}static get styles(){return`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
      }
    `}addChicken(){if(this.container.querySelectorAll("chicken-podium").length<A){const t=document.createElement("chicken-podium");this.container.append(t)}}removeChickens(){[...this.container.querySelectorAll("chicken-podium")].forEach(t=>t.remove())}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container")}render(){this.shadowRoot.innerHTML=`
    <style>${b.styles}</style>
    <div class="container">
    </div>`}}customElements.define("flag-system",b);class x extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --goal-container-height: 1fr;
        --pool-container-height: 100px;
        --belt-container-height: 96px;
        --opts-container-height: 110px;

        display: inline-block;
        border: 2px solid #fff;
      }

      .container {
        width: var(--game-width);
        min-height: var(--game-height);
        background: transparent;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: var(--goal-container-height) var(--pool-container-height) var(--belt-container-height) var(--opts-container-height);
      }

      .goal-container {
        background:
          var(--level) no-repeat top 210px center,
          url("images/gallinerica-logo.png") no-repeat top 64px center;
        display: grid;
        grid-template-columns: 96px 1fr;
      }

      .chicken-board-container {
        display: flex;
        justify-content: end;
      }

      .pool-container {
        display: flex;
        align-items: end;
      }

      .belt-container {
        display: flex;
        align-items: end;
      }
    `}showLevel(e){this.style.setProperty("--level",`url("images/levels/${e}-x2.png")`)}connectedCallback(){this.render(),this.tmiManager(),this.showLevel(l);const e=this.shadowRoot.querySelector("chicken-pool");document.addEventListener("keydown",({key:t})=>{console.log(t),/^1|2|3|4$/.test(t)&&!e.isWaiting&&(L(t),this.showLevel(l),e.resetAndWait(5e3))})}tmiManager(){const e=new tmi.Client({channels:["manzdev"]});e.connect();const t=this.shadowRoot.querySelector("number-list"),s=this.shadowRoot.querySelector("chicken-pool"),i=this.shadowRoot.querySelector("chicken-board"),n=this.shadowRoot.querySelector("flag-system");e.on("message",(a,E,k,O)=>{const d=E.username;if(/^[0-9]$/.test(k)){const r=s.getMainChicken(),w=r?r.getType():null;let T=null;w&&(T=t.getNumber(w)),k==T&&(console.log("OK!!!!!!"),r.isChickenified||(i.lastWinner===d?n.addChicken():n.removeChickens(),r.sanitize(d),i.addPoint(d)))}})}render(){this.shadowRoot.innerHTML=`
    <style>${x.styles}</style>
    <div class="container">
      <div class="goal-container">
        <flag-system></flag-system>
        <div class="chicken-board-container">
          <chicken-board></chicken-board>
        </div>
      </div>
      <div class="pool-container">
        <chicken-pool></chicken-pool>
      </div>
      <div class="belt-container">
        <home-cabin></home-cabin>
        <belt-machine></belt-machine>
        <belt-machine></belt-machine>
        <belt-machine></belt-machine>
        <home-cabin></home-cabin>
      </div>
      <div class="opts-container">
        <number-list></number-list>
      </div>
    </div>`}}customElements.define("game-screen",x);
