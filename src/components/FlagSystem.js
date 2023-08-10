import "@/components/ChickenPodium.js";

const MAX_CHICKEN = 10;

class FlagSystem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.lastStreak = null;
  }

  static get styles() {
    return /* css */`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
      }
    `;
  }

  addChicken() {
    const size = this.container.querySelectorAll("chicken-podium").length;
    if (size < MAX_CHICKEN) {
      const chicken = document.createElement("chicken-podium");
      this.container.append(chicken);
    }
  }

  removeChickens() {
    const chickens = [...this.container.querySelectorAll("chicken-podium")];
    chickens.forEach(chicken => chicken.remove());
  }

  connectedCallback() {
    this.render();
    this.container = this.shadowRoot.querySelector(".container");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${FlagSystem.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("flag-system", FlagSystem);
