import "@/components/BeltMachine.js";
import "@/components/HomeCabin.js";
import "@/components/ChickenPool.js";
import "@/components/NumberList.js";

class GameScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --goal-container-height: 1fr;
        --pool-container-height: 100px;
        --belt-container-height: 96px;
      }

      .container {
        width: var(--game-width);
        height: var(--game-height);
        background: transparent;
        padding: 0 35px;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: var(--goal-container-height) var(--pool-container-height) var(--belt-container-height);
      }

      .goal-container {
        background: purple;
      }

      .pool-container {

        display: flex;
        align-items: end;
      }

      .belt-container {
        display: flex;
        align-items: end;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.tmiManager();
  }

  tmiManager() {
    // eslint-disable-next-line
    const client = new tmi.Client({
      channels: ["manzdev"]
    });

    client.connect();

    const numberList = this.shadowRoot.querySelector("number-list");
    const chickenPool = this.shadowRoot.querySelector("chicken-pool");

    client.on("message", (channel, tags, message, self) => {
      const username = tags.username;
      const nickname = tags["display-name"];
      const isNumber = /^[0-9]$/.test(message);

      if (isNumber) {
        const number = Number(message);

        const mainChicken = chickenPool.getMainChicken();
        const mainType = mainChicken ? mainChicken.getType() : null;

        let okNumber = null;
        if (mainType) {
          okNumber = numberList.getNumber(mainType);
        }

        console.log(`${username} escribió ${message} -> pollo main: ${mainType} numero correcto: ${okNumber}`);

        if (message == okNumber) {
          console.log("OK!!!!!!");
          mainChicken.sanitize();
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GameScreen.styles}</style>
    <div class="container">
      <div class="goal-container">
        <number-list></number-list>
      </div>
      <div class="pool-container">
        <chicken-pool></chicken-pool>
      </div>
      <div class="belt-container">
        <home-cabin></home-cabin>
        <belt-machine></belt-machine>
        <belt-machine></belt-machine>
        <belt-machine></belt-machine>
        <home-cabin></home-cabin>
      </div>
    </div>`;
  }
}

customElements.define("game-screen", GameScreen);
