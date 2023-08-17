class ChickenCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.stats = {
      chickenify: 0,
      doomed: 0
    };
  }

  static get styles() {
    return /* css */`
      :host {
        --color: #ffd700;
        position: absolute;
      }

      .container {
        width: 250px;
        height: 155px;
        padding: 6px;
      }

      .box {
        background: #13122e;
      }

      .box:nth-child(2) {
        padding: 0 4px;
      }

      .box:nth-child(3) {
        text-align: center;
      }

      .streak {
        --color: lime;
      }

      .user {
        display: grid;
        grid-template-columns: 20px 1fr 35px;
        gap: 0 6px;
        font-family: EnterCommand, sans-serif;
        font-size: 28px;
        color: var(--color);
        padding: 3px;
      }

      .avatar {
        background-image: var(--image);
        background-size: 96px;
        width: 24px;
        height: 24px;
      }

      .user:nth-child(2) .avatar {
        scale: 1 -1;
      }
    `;
  }

  connectedCallback() {
    this.render();
    document.addEventListener("CHICKEN_EXIT", (ev) => this.counterChicken(ev.detail.isChickenify));
  }

  counterChicken(isChickenify) {
    if (isChickenify) { this.addChickenify(); } else { this.addDoomed(); }
    this.render();
  }

  renderTable() {
    return /* html */`
      <div class="user">
        <div class="avatar" style="--image: url(images/chicken.png)"></div>
        <div class="box">Gallinificados</div>
        <div class="box">${this.stats.chickenify}</div>
      </div>
      <div class="user">
        <div class="avatar" style="--image: url(images/chicken.png)"></div>
        <div class="box">Condenados</div>
        <div class="box">${this.stats.doomed}</div>
      </div>`;
  }

  addChickenify() {
    this.stats.chickenify++;
  }

  addDoomed() {
    this.stats.doomed++;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenCounter.styles}</style>
    <div class="container">
      ${this.renderTable()}
    </div>`;
  }
}

customElements.define("chicken-counter", ChickenCounter);
