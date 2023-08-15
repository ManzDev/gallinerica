import { getLevels } from "@/modules/difficulty.js";

class ChickenNPC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isChickenified = false;
    this.isMove = true;
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  getType() {
    return this.classList.item(0);
  }

  spawn() {
    const keyframes = [{ transform: "translateX(350%)" }];
    const options = {
      duration: getLevels().TIME_TO_TRANSLATE,
      fill: "forwards"
    };
    const animation = this.container.animate(keyframes, options);

    animation.finished.then(() => this.onStop());
  }

  leave() {
    this.isMove = true;
    const keyframes = [
      { transform: "translateX(350%)" },
      { transform: "translateX(800%)" }
    ];
    const options = {
      duration: getLevels().TIME_TO_TRANSLATE,
      fill: "forwards"
    };
    const animation = this.container.animate(keyframes, options);

    animation.finished.then(() => this.onExit());
  }

  onStop() {
    this.sendToggle("bm2");
    this.isMove = false;
    setTimeout(() => this.onContinue(), getLevels().TIME_TO_WAIT);
  }

  onContinue() {
    this.sendToggle("bm2");
    this.leave();
  }

  sendToggle(name) {
    const event = new CustomEvent("TOGGLE_MACHINE", { composed: true, bubbles: true, detail: { name } });
    document.dispatchEvent(event);
  }

  sanitize(username) {
    this.isChickenified = true;

    const keyframes = [
      { filter: "brightness(0) invert(1) drop-shadow(0 0 0 gold)" },
      { filter: "brightness(0) invert(1) drop-shadow(0 0 10px gold)" },
      { filter: "brightness(0) invert(1) drop-shadow(0 0 0 gold)" }
    ];

    this.addName(username);

    const animation = this.container.animate(keyframes, 1000);
    animation.finished.then(() => this.restore());
  }

  addName(username) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("username-container");
    const div = document.createElement("div");
    divContainer.append(div);
    div.textContent = username;
    div.classList.add("username");
    this.container.prepend(divContainer);

    const keyframes = [
      { transform: "translate(0, 0)", opacity: 1 },
      { transform: "translate(0, -25px)", opacity: 0 },
    ];
    const textOptions = {
      duration: 1000,
      delay: 1000,
      fill: "forwards"
    };

    divContainer.animate(keyframes, textOptions);
  }

  restore() {
    this.classList.remove(this.getType());
  }

  onExit() {
    const isChickenify = this.classList.item(0) === null;
    const event = new CustomEvent("CHICKEN_EXIT", { detail: { isChickenify }, composed: true, bubbles: true });
    document.dispatchEvent(event);
    this.remove();
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenNPC.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("chicken-npc", ChickenNPC);
