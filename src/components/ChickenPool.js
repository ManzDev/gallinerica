import "@/components/ChickenNPC.js";
import { ICONS } from "@/modules/icons.js";
import { getLevels } from "@/modules/constants.js";

class ChickenPool extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isWaiting = false;
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-block;
        width: 100%;
      }

      .container {
        width: 100%;
        height: 150px;
        overflow-x: hidden;
        position: relative;
        display: flex;
        align-items: end;
      }

      chicken-npc {
        position: absolute;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.startSpawnChicken();
  }

  startSpawnChicken() {
    this.isWaiting = false;
    this.timer = setInterval(() => this.spawnChicken(), getLevels().TIME_TO_SPAWN_NEW_CHECK);
  }

  getMainChicken() {
    const chickens = [...this.shadowRoot.querySelectorAll(".container > *")];
    const stopChicken = chickens.find(chicken => chicken.isMove === false);
    return stopChicken;
  }

  resetAndWait(time) {
    this.isWaiting = true;
    clearInterval(this.timer);
    this.timer = null;
    setTimeout(() => this.startSpawnChicken(), time);
  }

  spawnChicken() {
    if (document.hidden) {
      return;
    }

    const chicken = document.createElement("chicken-npc");

    const n = Math.floor(Math.random() * ICONS.length);
    chicken.classList.add(ICONS[n]);

    this.shadowRoot.querySelector(".container").append(chicken);
    chicken.spawn();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenPool.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("chicken-pool", ChickenPool);
