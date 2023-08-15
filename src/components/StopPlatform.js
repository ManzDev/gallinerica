class StopPlatform extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: 192px;
      }

      .container {
        width: var(--size);
        height: var(--size);
        background: url("images/stop-sprite.png");
        transform: translate(290px, 0px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${StopPlatform.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("stop-platform", StopPlatform);
