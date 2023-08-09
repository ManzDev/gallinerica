class HomeCabin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${HomeCabin.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("home-cabin", HomeCabin);
