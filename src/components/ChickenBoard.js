const profileChicken = {
  0: "url(images/avatars/king.png)",
  1: "url(images/avatars/silver.png)",
  2: "url(images/avatars/bronze.png)",
  3: "url(images/avatars/normal.png)",
  4: "url(images/avatars/normal.png)"
};

class ChickenBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.init();
  }

  init() {
    this.table = {};
    this.lastWinner = null;
  }

  static get styles() {
    return /* css */`
      :host {
        --color: #ffd700;
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
        width: 20px;
        height: 24px;
        animation: animate 1s steps(4) infinite;
      }

      @keyframes animate {
        0% { background-position: 0; }
        100% { background-position: -80px; }
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  addPoint(username) {
    this.lastWinner = username;
    this.table[username] = (this.table[username] || 0) + 1;
    this.render();
  }

  subPoint(username) {
    this.table[username] = (this.table[username] || 0) - 1;
    this.render();
  }

  getLeaderBoard() {
    const entries = Object.entries(this.table);
    const usersList = entries.map(([username, points]) => ({ username, points }));
    const leaderBoard = usersList.sort((a, b) => b.points - a.points);
    return leaderBoard.slice(0, 5);
  }

  renderTable() {
    const leaderBoard = this.getLeaderBoard();

    const html = leaderBoard
      // .filter(({ points }) => points > 0)
      .map(({ username, points }, index) => {
        const streakClass = this.lastWinner === username ? "streak" : "";

        return /* html */`
      <div class="user user-${username} ${streakClass}">
        <div class="avatar" style="--image: ${profileChicken[index]}"></div>
        <div class="box">${username}</div>
        <div class="box">${points}</div>
      </div>`;
      });

    return html.join("");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ChickenBoard.styles}</style>
    <div class="container">
      ${this.renderTable()}
    </div>`;
  }
}

customElements.define("chicken-board", ChickenBoard);
