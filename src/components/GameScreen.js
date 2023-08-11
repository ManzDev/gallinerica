import "@/components/BeltMachine.js";
import "@/components/HomeCabin.js";
import "@/components/ChickenPool.js";
import "@/components/NumberList.js";
import "@/components/ChickenBoard.js";
import "@/components/FlagSystem.js";
import { setLevel, currentDifficulty } from "@/modules/constants.js";

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
        --opts-container-height: 110px;

        display: inline-block;
        border: 2px solid #fff;
      }

      .container {
        width: var(--game-width);
        min-height: var(--game-height);
        background: transparent;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: var(--goal-container-height) var(--pool-container-height) var(--belt-container-height) var(--opts-container-height);
      }

      .goal-container {
        background:
          var(--level) no-repeat top 210px center,
          url("images/gallinerica-logo.png") no-repeat top 64px center;
        display: grid;
        grid-template-columns: 96px 1fr;
      }

      .chicken-board-container {
        display: flex;
        justify-content: end;
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

  showLevel(level) {
    this.style.setProperty("--level", `url("images/levels/${level}-x2.png")`);
  }

  connectedCallback() {
    this.render();
    this.tmiManager();
    this.showLevel(currentDifficulty);

    const chickenPool = this.shadowRoot.querySelector("chicken-pool");

    document.addEventListener("keydown", ({ key }) => {
      console.log(key);
      const isAllowed = /^1|2|3|4$/.test(key);
      if (isAllowed && !chickenPool.isWaiting) {
        setLevel(key);
        this.showLevel(currentDifficulty);
        chickenPool.resetAndWait(5000);
      }
    });
  }

  tmiManager() {
    // eslint-disable-next-line
    const client = new tmi.Client({
      channels: ["manzdev"]
    });

    client.connect();

    const numberList = this.shadowRoot.querySelector("number-list");
    const chickenPool = this.shadowRoot.querySelector("chicken-pool");
    const chickenBoard = this.shadowRoot.querySelector("chicken-board");
    const flagSystem = this.shadowRoot.querySelector("flag-system");

    client.on("message", (channel, tags, message, self) => {
      const username = tags.username;
      // const nickname = tags["display-name"];
      const isNumber = /^[0-9]$/.test(message);

      if (isNumber) {
        // const number = Number(message);

        const mainChicken = chickenPool.getMainChicken();
        const mainType = mainChicken ? mainChicken.getType() : null;

        let okNumber = null;
        if (mainType) {
          okNumber = numberList.getNumber(mainType);
        }

        if (message == okNumber) {
          console.log("OK!!!!!!");
          if (!mainChicken.isChickenified) {
            if (chickenBoard.lastWinner === username) {
              flagSystem.addChicken();
            } else {
              flagSystem.removeChickens();
            }
            mainChicken.sanitize(username);
            chickenBoard.addPoint(username);
          }
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GameScreen.styles}</style>
    <div class="container">
      <div class="goal-container">
        <flag-system></flag-system>
        <div class="chicken-board-container">
          <chicken-board></chicken-board>
        </div>
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
      <div class="opts-container">
        <number-list></number-list>
      </div>
    </div>`;
  }
}

customElements.define("game-screen", GameScreen);
