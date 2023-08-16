import { setLevel, currentDifficulty } from "@/modules/difficulty.js";
import "@/components/BeltMachine.js";
import "@/components/ChickenBackground.js";
import "@/components/HomeCabin.js";
import "@/components/ChickenPool.js";
import "@/components/NumberList.js";
import "@/components/ChickenBoard.js";
import "@/components/ChickenCounter.js";
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
          var(--level, none) no-repeat top 172px center,
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
        height: 115px;
        transform: translate(30px, 190px);
        z-index: 15;
        padding: 35px;
        border-radius: 2px;
        left: -25px;
        top: -15px;
        background: #000;
        box-shadow: 5px 5px 0 #0004;
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

      chicken-board {
        transform: translateY(90px);
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

    const input = this.shadowRoot.querySelector(".twitch input");
    input.addEventListener("keydown", (ev) => {
      ev.key.toLowerCase() === "enter" && button.click();
    });
  }

  startGame() {
    setLevel(1);
    this.showLevel(currentDifficulty);
    const chickenPool = this.shadowRoot.querySelector("chicken-pool");
    const chickenBackground = this.shadowRoot.querySelector("chicken-background");

    chickenPool.startSpawnChicken();
    chickenBackground.start();

    document.addEventListener("keydown", ({ key }) => {
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
      const number = Number(message);
      const username = tags.username;
      const isNumber = /^[0-9]$/.test(message);

      if (isNumber) {
        const mainChicken = chickenPool.getMainChicken();
        const mainType = mainChicken ? mainChicken.getType() : null;

        let okNumber = null;
        if (mainType) {
          okNumber = numberList.getNumber(mainType);
        }

        if (number === okNumber) {
          if (!mainChicken.isChickenified) {
            if (chickenBoard.lastWinner === username) {
              flagSystem.addChicken();
            } else {
              flagSystem.removeChickens();
            }
            mainChicken.sanitize(username);
            chickenBoard.addPoint(username);
          }
        } else if (okNumber) {
          if (currentDifficulty !== "easy") {
            chickenBoard.subPoint(username);
          }
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GameScreen.styles}</style>
    <div class="container">
      <chicken-background></chicken-background>
      <div class="goal-container">
        <flag-system></flag-system>
        <div class="chicken-board-container">
          <div class="twitch">
            <span>Conectar al canal:</span>
            <input type="text" placeholder="manzdev">
            <button>Conectar</button>
          </div>
          <chicken-counter></chicken-counter>
          <chicken-board></chicken-board>
        </div>
      </div>
      <div class="pool-container">
        <chicken-pool></chicken-pool>
      </div>
      <div class="belt-container">
        <home-cabin></home-cabin>
        <belt-machine name="bm1"></belt-machine>
        <belt-machine name="bm2"></belt-machine>
        <belt-machine name="bm3"></belt-machine>
        <home-cabin></home-cabin>
      </div>
      <div class="opts-container">
        <number-list></number-list>
      </div>
    </div>`;
  }
}

customElements.define("game-screen", GameScreen);
