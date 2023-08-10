import "@/components/ChickenNPC.js";

class FlagSystem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: end;
      }
    `;
  }

  addChicken() {
    const chicken = document.createElement("chicken-npc");
    chicken.setAttribute("is-podium", "");
    this.container.append(chicken);
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
