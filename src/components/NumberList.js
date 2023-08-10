import { getPermutation } from "@/modules/icons.js";

class NumberList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        border-top: 4px solid #000;
        background: #fff;
        height: 100%;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        box-sizing: border-box;
      }

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .circle {
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
      }

      .item img {
        --size: 48px;

        image-rendering: crisp-edges;
        width: var(--size);
        height: var(--size);

        filter:
          drop-shadow(0 0 0 #000a)
          drop-shadow(1px 0 0 #000a)
          drop-shadow(0 1px 0 #000a)
          drop-shadow(-1px 0 0 #000a)
          drop-shadow(0 -1px 0 #000a)
          drop-shadow(0 0 2px #000a);
      }

      .item span {
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        text-shadow: 0 0 2px #0006;
      }
    `;
  }

  getNumber(icon) {
    const values = Object.values(this.icons);
    const index = values.findIndex(item => icon === item);

    return index;
  }

  getIcon(number) {
    return this.icons[number];
  }

  renderIcons() {
    this.icons = getPermutation();

    const keys = Object.values(this.icons);
    const icons = keys.map((icon, index) => /* html */`
    <div class="item">
      <div class="circle">
        <img src="images/icons-old/${icon}.png">
      </div>
      <span>${index}</span>
    </div>`);

    return icons.join("");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${NumberList.styles}</style>
    <div class="container">
      ${this.renderIcons()}
    </div>`;
  }
}

customElements.define("number-list", NumberList);
