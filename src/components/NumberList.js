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
        background: #fff;
        height: 96px;
        display: flex;
        gap: 15px;
        justify-content: center;
        align-items: center;
      }

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(3px);
      }

      .item img {
        --size: 48px;

        width: var(--size);
        height: var(--size);
        filter:
          drop-shadow(0 0 0 #000)
          drop-shadow(1px 0 0 #000)
          drop-shadow(0 1px 0 #000)
          drop-shadow(-1px 0 0 #000)
          drop-shadow(0 -1px 0 #000)
          drop-shadow(0 0 2px #000)
      }

      .item span {
        font-family: EnterCommand, sans-serif;
        font-size: 2rem;
        text-shadow: 0 0 2px #0008;
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
      <img src="images/icons/${icon}.png">
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
