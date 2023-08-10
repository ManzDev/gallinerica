const WAIT_TIME = 1500;

const options = {
  duration: 4000,
  fill: "forwards"
};

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
    `;
  }

  getType() {
    return this.classList.item(0);
  }

  spawn() {
    const keyframes = [{ transform: "translateX(350%)" }];
    const animation = this.container.animate(keyframes, options);

    animation.finished.then(() => this.onStop());
  }

  leave() {
    this.isMove = true;
    const keyframes = [
      { transform: "translateX(350%)" },
      { transform: "translateX(800%)" }
    ];
    const animation = this.container.animate(keyframes, options);

    animation.finished.then(() => this.onExit());
  }

  onStop() {
    this.isMove = false;
    setTimeout(() => this.leave(), WAIT_TIME);
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
    const div = document.createElement("div");
    div.textContent = username;
    div.classList.add("username");
    this.container.prepend(div);

    const keyframes = [
      { transform: "translate(0, 0)", opacity: 1 },
      { transform: "translate(0, -25px)", opacity: 0 },
    ];
    const textOptions = {
      duration: 1000,
      delay: 1000,
      fill: "forwards"
    };

    div.animate(keyframes, textOptions);
  }

  restore() {
    this.classList.remove(this.getType());
  }

  onExit() {
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
