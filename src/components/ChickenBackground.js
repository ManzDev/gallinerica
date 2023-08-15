const TIME_TO_CHANGE = 5 * 60000;

class ChickenBackground extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
    setInterval(() => this.classList.toggle("night"), TIME_TO_CHANGE);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenBackground.styles}</style>
    <div class="container">
      <div class="sun"></div>
      <div class="moon"></div>
    </div>`;
  }
}

customElements.define("chicken-background", ChickenBackground);
