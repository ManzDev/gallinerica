class ChickenPodium extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  init() {
    this.x = 0;
  }

  update() {
    const delta = -1 + Math.floor(Math.random() * 3);
    const x = this.x + delta;
    this.style.setProperty("--x", `${x}px`);
  }

  connectedCallback() {
    this.init();
    this.render();
    setInterval(() => this.update(), 500);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenPodium.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("chicken-podium", ChickenPodium);
