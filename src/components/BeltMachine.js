import { NUMBERS } from "@/modules/difficulty.js";

const SPEED = {
  0: "0ms",
  1: "800ms",
  2: "600ms",
  3: "400ms",
  4: "200ms"
};

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
    `;
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.render();
    document.addEventListener("CHANGE_DIFFICULTY", (ev) => {
      const value = Number(NUMBERS[ev.detail]);
      this.setSpeed(value);
    });
    document.addEventListener("TOGGLE_MACHINE", (ev) => this.toggle(ev.detail.name));
  }

  toggle(name) {
    if (name === this.name) {
      this.toggleAttribute("stop");
    }
  }

  setSpeed(value) {
    this.style.setProperty("--speed", SPEED[value]);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BeltMachine.styles}</style>
    <div class="container">

    </div>`;
  }
}

customElements.define("belt-machine", BeltMachine);
