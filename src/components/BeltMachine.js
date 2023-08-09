class BeltMachine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.render();
  }

  toggle() {
    this.toggleAttribute("stop");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BeltMachine.styles}</style>
    <div class="container">

    </div>`;
  }
}

customElements.define("belt-machine", BeltMachine);
