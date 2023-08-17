(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();let o="easy";const I={easy:{TIME_TO_SPAWN_NEW_CHECK:6e3,TIME_TO_TRANSLATE:6e3,TIME_TO_WAIT:4e3},normal:{TIME_TO_SPAWN_NEW_CHECK:4e3,TIME_TO_TRANSLATE:5e3,TIME_TO_WAIT:2500},hard:{TIME_TO_SPAWN_NEW_CHECK:2500,TIME_TO_TRANSLATE:4e3,TIME_TO_WAIT:1500},extreme:{TIME_TO_SPAWN_NEW_CHECK:2e3,TIME_TO_TRANSLATE:3e3,TIME_TO_WAIT:1e3}},S={1:"easy",2:"normal",3:"hard",4:"extreme"},N=Object.fromEntries(Object.entries(S).map(([a,e])=>[e,a])),M=a=>{o=S[a],(o==="hard"||o==="extreme")&&_();const e=new CustomEvent("CHANGE_DIFFICULTY",{composed:!0,bubbles:!0,detail:o});document.dispatchEvent(e)},_=()=>{setInterval(()=>{const a=new CustomEvent("RANDOMIZE_NUMBER",{composed:!0,bubbles:!0});document.dispatchEvent(a)},6e4)},l=()=>I[o],R={0:"0ms",1:"800ms",2:"600ms",3:"400ms",4:"200ms"};class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --width: 192px;
        --height: 96px;
        --speed: 0ms;
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
    `}connectedCallback(){this.name=this.getAttribute("name"),this.render(),document.addEventListener("CHANGE_DIFFICULTY",e=>{const t=Number(N[e.detail]);this.setSpeed(t)}),document.addEventListener("TOGGLE_MACHINE",e=>this.toggle(e.detail.name))}toggle(e){e===this.name&&this.toggleAttribute("stop")}setSpeed(e){this.style.setProperty("--speed",R[e])}render(){this.shadowRoot.innerHTML=`
    <style>${m.styles}</style>
    <div class="container">

    </div>`}}customElements.define("belt-machine",m);const H=5*6e4;class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --time: 5s;

        position: absolute;
        width: var(--game-width);
        height: var(--game-height);
        z-index: -1;
      }

      .container {
        position: absolute;
        background-color: #0098dc;
        background-image: radial-gradient(transparent 20%, #0009 90%);
        width: 100%;
        height: 100%;
        transition: background-color var(--time);
      }

      .moon,
      .sun {
        position: absolute;
      }

      .moon {
        --size: 64px;

        width: var(--size);
        height: var(--size);
        background: url("images/moon-sprite.png");
        translate: 575px 200px;
        transform: translateY(350px);
        transition: transform var(--time);
      }

      .sun {
        --size: 64px;

        width: var(--size);
        height: var(--size);
        background: url("images/sun-sprite.png");
        translate: 125px 200px;
        transition: transform var(--time);
      }

      :host(.night) .sun { transform: translateY(350px); }
      :host(.night) .moon { transform: translateY(0px); }

      :host(.night) .container { background-color: #0e071b }
    `}connectedCallback(){this.render()}start(){setInterval(()=>this.classList.toggle("night"),H)}render(){this.shadowRoot.innerHTML=`
    <style>${u.styles}</style>
    <div class="container">
      <div class="sun"></div>
      <div class="moon"></div>
    </div>`}}customElements.define("chicken-background",u);class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${g.styles}</style>
    <div class="container">
    </div>`}}customElements.define("home-cabin",g);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.isChickenified=!1,this.isMove=!0,this.animation=null,this.sanitizeAnimation=null}static get styles(){return`
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
        width: 250px;
        background: indigo;
        transform: translateX(-100px);
      }

      .username-container {
        position: absolute;
        top: -50px;
        padding: 10px 20px;
        color: #fff;
        z-index: 20;
        font-family: EnterCommand, sans-serif;
        font-size: 35px;
        text-align: center;
        width: var(--width);
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
    `}getType(){return this.classList.item(0)}spawn(){const e=[{transform:"translateX(350%)"}],t={duration:l().TIME_TO_TRANSLATE,fill:"forwards"};this.animation=this.container.animate(e,t),this.animation.finished.then(()=>this.onStop())}leave(){this.isMove=!0;const e=[{transform:"translateX(350%)"},{transform:"translateX(800%)"}],t={duration:l().TIME_TO_TRANSLATE,fill:"forwards"};this.animation=this.container.animate(e,t),this.animation.finished.then(()=>this.onExit())}onStop(){this.sendToggle("bm2"),this.isMove=!1,setTimeout(()=>this.onContinue(),l().TIME_TO_WAIT)}onContinue(){this.sendToggle("bm2"),this.leave()}sendToggle(e){const t=new CustomEvent("TOGGLE_MACHINE",{composed:!0,bubbles:!0,detail:{name:e}});document.dispatchEvent(t)}sanitize(e){this.isChickenified=!0;const t=[{filter:"brightness(0) invert(1) drop-shadow(0 0 0 gold)"},{filter:"brightness(0) invert(1) drop-shadow(0 0 10px gold)"},{filter:"brightness(0) invert(1) drop-shadow(0 0 0 gold)"}];this.addName(e),this.sanitizeAnimation=this.container.animate(t,1e3),this.sanitizeAnimation.finished.then(()=>this.restore())}addName(e){const t=document.createElement("div");t.classList.add("username-container");const n=document.createElement("div");t.append(n),n.textContent=e,n.classList.add("username"),this.container.prepend(t);const i=[{transform:"translate(0, 0)",opacity:1},{transform:"translate(0, -25px)",opacity:0}],s={duration:1e3,delay:1e3,fill:"forwards"};t.animate(i,s)}restore(){this.classList.remove(this.getType())}onExit(){const e=this.classList.item(0)===null,t=new CustomEvent("CHICKEN_EXIT",{detail:{isChickenify:e},composed:!0,bubbles:!0});document.dispatchEvent(t),this.remove()}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container"),document.addEventListener("visibilitychange",e=>{document.hidden?this.pause():this.unpause()})}pause(){this.animation&&this.animation.playState==="running"&&this.animation.pause(),this.sanitizeAnimation&&this.sanitizeAnimation.playState==="running"&&this.sanitizeAnimation.pause()}unpause(){this.animation&&this.animation.playState==="paused"&&this.animation.play(),this.sanitizeAnimation&&this.sanitizeAnimation.playState==="paused"&&this.sanitizeAnimation.play()}render(){this.shadowRoot.innerHTML=`
    <style>${f.styles}</style>
    <div class="container">
    </div>`}}customElements.define("chicken-npc",f);class v extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --size: 192px;
      }

      .container {
        width: var(--size);
        height: var(--size);
        background: url("images/stop-sprite.png");
        transform: translate(290px, 0px);
      }
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${v.styles}</style>
    <div class="container">
    </div>`}}customElements.define("stop-platform",v);const O=a=>{let e=a.length,t,n;for(;e;)n=Math.floor(Math.random()*e--),t=a[e],a[e]=a[n],a[n]=t;return a},p=["beer","briefcase","crown","fire","ice","magic","package","radioactive","rocket","voltage"],$=()=>{const e=O(p).map((t,n)=>[n,t]);return Object.fromEntries(e)};class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.isWaiting=!1}static get styles(){return`
      :host {
        display: inline-block;
        width: 100%;
      }

      .container {
        width: 100%;
        height: 200px;
        overflow-x: hidden;
        position: relative;
        display: flex;
        align-items: end;
      }

      /*
      stop-platform {
        position: relative;
        z-index: 10;
      }
      */

      chicken-npc {
        position: absolute;
      }
    `}connectedCallback(){this.render()}startSpawnChicken(){this.isWaiting=!1,this.timer=setInterval(()=>this.spawnChicken(),l().TIME_TO_SPAWN_NEW_CHECK)}getMainChicken(){return[...this.shadowRoot.querySelectorAll(".container > *")].find(n=>n.isMove===!1)}resetAndWait(e){this.isWaiting=!0,clearInterval(this.timer),this.timer=null,setTimeout(()=>this.startSpawnChicken(),e)}spawnChicken(){if(document.hidden)return;const e=document.createElement("chicken-npc"),t=Math.floor(Math.random()*p.length);e.classList.add(p[t]),this.shadowRoot.querySelector(".container").append(e),e.spawn()}render(){this.shadowRoot.innerHTML=`
    <style>${b.styles}</style>
    <div class="container">
      <stop-platform></stop-platform>
    </div>`}}customElements.define("chicken-pool",b);class x extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}getNumber(e){return Object.values(this.icons).findIndex(i=>e===i)}getIcon(e){return this.icons[e]}renderIcons(){return this.icons=$(),Object.values(this.icons).map((n,i)=>`
    <div class="item">
      <div class="circle">
        <img src="images/icons-old/${n}.png">
      </div>
      <span>${i}</span>
    </div>`).join("")}connectedCallback(){this.render(),document.addEventListener("RANDOMIZE_NUMBER",()=>this.render())}render(){this.shadowRoot.innerHTML=`
    <style>${x.styles}</style>
    <div class="container">
      ${this.renderIcons()}
    </div>`}}customElements.define("number-list",x);const W={0:"url(images/avatars/king.png)",1:"url(images/avatars/silver.png)",2:"url(images/avatars/bronze.png)",3:"url(images/avatars/normal.png)",4:"url(images/avatars/normal.png)"};class y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.init()}init(){this.table={},this.lastWinner=null}static get styles(){return`
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
    `}connectedCallback(){this.render()}addPoint(e){this.lastWinner=e,this.table[e]=(this.table[e]||0)+1,this.render()}subPoint(e){this.table[e]=(this.table[e]||0)-1,this.render()}getLeaderBoard(){return Object.entries(this.table).map(([i,s])=>({username:i,points:s})).sort((i,s)=>s.points-i.points).slice(0,5)}renderTable(){return this.getLeaderBoard().map(({username:n,points:i},s)=>{const r=this.lastWinner===n?"streak":"";return`
      <div class="user user-${n} ${r}">
        <div class="avatar" style="--image: ${W[s]}"></div>
        <div class="box">${n}</div>
        <div class="box">${i}</div>
      </div>`}).join("")}render(){this.shadowRoot.innerHTML=`
    <style>${y.styles}</style>
    <div class="container">
      ${this.renderTable()}
    </div>`}}customElements.define("chicken-board",y);class k extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.stats={chickenify:0,doomed:0}}static get styles(){return`
      :host {
        --color: #ffd700;
        position: absolute;
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
        background-size: 96px;
        width: 24px;
        height: 24px;
      }

      .user:nth-child(2) .avatar {
        scale: 1 -1;
      }
    `}connectedCallback(){this.render(),document.addEventListener("CHICKEN_EXIT",e=>this.counterChicken(e.detail.isChickenify))}counterChicken(e){e?this.addChickenify():this.addDoomed(),this.render()}renderTable(){return`
      <div class="user">
        <div class="avatar" style="--image: url(images/chicken.png)"></div>
        <div class="box">Gallinificados</div>
        <div class="box">${this.stats.chickenify}</div>
      </div>
      <div class="user">
        <div class="avatar" style="--image: url(images/chicken.png)"></div>
        <div class="box">Condenados</div>
        <div class="box">${this.stats.doomed}</div>
      </div>`}addChickenify(){this.stats.chickenify++}addDoomed(){this.stats.doomed++}render(){this.shadowRoot.innerHTML=`
    <style>${k.styles}</style>
    <div class="container">
      ${this.renderTable()}
    </div>`}}customElements.define("chicken-counter",k);class w extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    <style>${w.styles}</style>
    <div class="container">
    </div>`}}customElements.define("chicken-podium",w);const P=10;class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.lastStreak=null}static get styles(){return`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
      }
    `}addChicken(){if(this.container.querySelectorAll("chicken-podium").length<P){const t=document.createElement("chicken-podium");this.container.append(t)}}removeChickens(){[...this.container.querySelectorAll("chicken-podium")].forEach(t=>t.remove())}connectedCallback(){this.render(),this.container=this.shadowRoot.querySelector(".container")}render(){this.shadowRoot.innerHTML=`
    <style>${E.styles}</style>
    <div class="container">
    </div>`}}customElements.define("flag-system",E);class T extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --goal-container-height: 1fr;
        --pool-container-height: 100px;
        --belt-container-height: 96px;
        --opts-container-height: 110px;

        display: inline-block;
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
          var(--level, none) no-repeat top 172px center,
          url("images/gallinerica-logo.png") no-repeat top 32px center;
        display: grid;
        grid-template-columns: 96px 1fr;
      }

      .chicken-board-container {
        display: flex;
        justify-content: end;
      }

      .twitch {
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: end;
        text-align: center;
        position: relative;
        height: 115px;
        transform: translate(30px, 190px);
        z-index: 15;
        padding: 35px;
        border-radius: 2px;
        left: -25px;
        top: -15px;
        background: #000;
        box-shadow: 5px 5px 0 #0004;
      }

      .twitch span {
        color: gold;
      }

      .twitch input {
        margin-top: 5px;
        padding: 4px;
        border: 2px solid #fff;
        color: #fff;
        background: transparent;
        z-index: 10;
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: gold;
        max-width: 175px;
        text-align: center;
      }

      .twitch button {
        border: 0;
        border-radius: 2px;
        padding: 6px 0;
        margin-top: 6px;
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: #eee;
        background: linear-gradient(#0863a5, #1283d1);
        box-shadow: 0 7px 0 #0b5a92,0 8px 3px #0000004d;
        z-index: 15;
        transition: all 0.15s;
        cursor: pointer;
      }

      .twitch button:active {
        color: #888;
        background: linear-gradient(to bottom, #0006, #0008), linear-gradient(#0863a5, #1283d1);
        transform: translateY(5px);
        box-shadow: 0 2px 0 #0b5a92,0 3px 3px #0000004d;
      }

      .pool-container {
        display: flex;
        align-items: end;
      }

      chicken-board {
        transform: translateY(90px);
      }

      .belt-container {
        display: flex;
        align-items: end;
      }
    `}showLevel(e){this.style.setProperty("--level",`url("images/levels/${e}-x2.png")`)}connectedCallback(){this.render();const e=this.shadowRoot.querySelector(".twitch button");e.addEventListener("click",()=>this.connectToTwitch()),this.shadowRoot.querySelector(".twitch input").addEventListener("keydown",n=>{n.key.toLowerCase()==="enter"&&e.click()})}startGame(){M(1),this.showLevel(o);const e=this.shadowRoot.querySelector("chicken-pool"),t=this.shadowRoot.querySelector("chicken-background");e.startSpawnChicken(),t.start(),document.addEventListener("keydown",({key:n})=>{/^1|2|3|4$/.test(n)&&!e.isWaiting&&(M(n),this.showLevel(o),e.resetAndWait(5e3))})}connectToTwitch(){const e=this.shadowRoot.querySelector(".twitch input").value.trim().toLowerCase().replace("#","");if(!e)return;this.shadowRoot.querySelector(".twitch").remove(),this.client=new tmi.Client({channels:[e]}),this.client.connect();const t=this.shadowRoot.querySelector("number-list"),n=this.shadowRoot.querySelector("chicken-pool"),i=this.shadowRoot.querySelector("chicken-board"),s=this.shadowRoot.querySelector("flag-system");this.startGame(),this.client.on("message",(r,A,C,q)=>{const z=Number(C),c=A.username;if(/^[0-9]$/.test(C)){const d=n.getMainChicken(),L=d?d.getType():null;let h=null;L&&(h=t.getNumber(L)),z===h?d.isChickenified||(i.lastWinner===c?s.addChicken():s.removeChickens(),d.sanitize(c),i.addPoint(c)):h&&o!=="easy"&&i.subPoint(c)}})}render(){this.shadowRoot.innerHTML=`
    <style>${T.styles}</style>
    <div class="container">
      <chicken-background></chicken-background>
      <div class="goal-container">
        <flag-system></flag-system>
        <div class="chicken-board-container">
          <div class="twitch">
            <span>Conectar al canal:</span>
            <input type="text" placeholder="manzdev">
            <button>Conectar</button>
          </div>
          <chicken-counter></chicken-counter>
          <chicken-board></chicken-board>
        </div>
      </div>
      <div class="pool-container">
        <chicken-pool></chicken-pool>
      </div>
      <div class="belt-container">
        <home-cabin></home-cabin>
        <belt-machine name="bm1"></belt-machine>
        <belt-machine name="bm2"></belt-machine>
        <belt-machine name="bm3"></belt-machine>
        <home-cabin></home-cabin>
      </div>
      <div class="opts-container">
        <number-list></number-list>
      </div>
    </div>`}}customElements.define("game-screen",T);
