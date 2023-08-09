const WAIT_TIME = 1500;

const options = {
  duration: 4000,
  fill: "forwards"
};

class ChickenNPC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
      :host(.fire) { --image: url("images/chicken-sprite.png"); }
      :host(.crown) { --image: url("images/chicken-sprite.png"); }
      :host(.rocket) { --image: url("images/chicken-sprite.png"); }
      :host(.ice) { --image: url("images/chicken-sprite.png"); }
      :host(.briefcase) { --image: url("images/chicken-sprite.png"); }
      :host(.magic) { --image: url("images/chicken-sprite.png"); }

      .container {
        width: var(--width);
        height: var(--height);
        background: var(--image);
        animation: idle 400ms steps(4) infinite;
        transform: translateX(-100%);
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

  sanitize() {
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
