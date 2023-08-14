import { setLevel, currentDifficulty } from "@/modules/difficulty.js";
import "@/components/BeltMachine.js";
import "@/components/HomeCabin.js";
import "@/components/ChickenPool.js";
import "@/components/NumberList.js";
import "@/components/ChickenBoard.js";
import "@/components/FlagSystem.js";

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
          var(--level, none) no-repeat top 200px center,
          url("images/gallinerica-logo.png") no-repeat top 32px center;
        display: grid;
        grid-template-columns: 96px 1fr;
      }

      .chicken-board-container {
        display: flex;
        justify-content: end;
      }

      .twitch {
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: end;
        text-align: center;
        position: relative;
        left: -25px;
        top: -25px;
      }

      .twitch span {
        color: gold;
      }

      .twitch input {
        margin-top: 5px;
        padding: 4px;
        border: 2px solid #fff;
        color: #fff;
        background: transparent;
        z-index: 10;
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: gold;
        max-width: 175px;
        text-align: center;
      }

      .twitch button {
        border: 0;
        border-radius: 2px;
        padding: 6px 0;
        margin-top: 6px;
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        color: #eee;
        background: linear-gradient(#0863a5, #1283d1);
        box-shadow: 0 7px 0 #0b5a92,0 8px 3px #0000004d;
        z-index: 15;
        transition: all 0.15s;
        cursor: pointer;
      }

      .twitch button:active {
        color: #888;
        background: linear-gradient(to bottom, #0006, #0008), linear-gradient(#0863a5, #1283d1);
        transform: translateY(5px);
        box-shadow: 0 2px 0 #0b5a92,0 3px 3px #0000004d;
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

    const button = this.shadowRoot.querySelector(".twitch button");
    button.addEventListener("click", () => this.connectToTwitch());
  }

  startGame() {
    this.showLevel(currentDifficulty);
    const chickenPool = this.shadowRoot.querySelector("chicken-pool");

    chickenPool.startSpawnChicken();

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

  connectToTwitch() {
    const channel = this.shadowRoot.querySelector(".twitch input").value.trim().toLowerCase().replace("#", "");

    if (!channel) return;

    this.shadowRoot.querySelector(".twitch").remove();

    // eslint-disable-next-line
    this.client = new tmi.Client({
      channels: [channel]
    });

    this.client.connect();

    const numberList = this.shadowRoot.querySelector("number-list");
    const chickenPool = this.shadowRoot.querySelector("chicken-pool");
    const chickenBoard = this.shadowRoot.querySelector("chicken-board");
    const flagSystem = this.shadowRoot.querySelector("flag-system");

    this.startGame();

    this.client.on("message", (channel, tags, message, self) => {
      const username = tags.username;
      const isNumber = /^[0-9]$/.test(message);

      if (isNumber) {
        const mainChicken = chickenPool.getMainChicken();
        const mainType = mainChicken ? mainChicken.getType() : null;

        let okNumber = null;
        if (mainType) {
          okNumber = numberList.getNumber(mainType);
        }

        if (message == okNumber) {
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
          <div class="twitch">
            <span>Conectar al canal:</span>
            <input type="text" placeholder="manzdev">
            <button>Conectar</button>
          </div>
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
