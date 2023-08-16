// eslint-disable-next-line
export let currentDifficulty = "easy";
export let randomizeNumbersTimer = null;

const DIFFICULTY = {
  easy: {
    TIME_TO_SPAWN_NEW_CHECK: 6000,
    TIME_TO_TRANSLATE: 6000,
    TIME_TO_WAIT: 4000
  },
  normal: {
    TIME_TO_SPAWN_NEW_CHECK: 4000,
    TIME_TO_TRANSLATE: 5000,
    TIME_TO_WAIT: 2500,
  },
  hard: {
    TIME_TO_SPAWN_NEW_CHECK: 2500,
    TIME_TO_TRANSLATE: 4000,
    TIME_TO_WAIT: 1500,
  },
  extreme: {
    TIME_TO_SPAWN_NEW_CHECK: 2000,
    TIME_TO_TRANSLATE: 3000,
    TIME_TO_WAIT: 1000,
  }
};

const LEVELS = {
  1: "easy",
  2: "normal",
  3: "hard",
  4: "extreme"
};

export const NUMBERS = Object.fromEntries(Object.entries(LEVELS).map(([id, level]) => [level, id]));

export const setLevel = (level) => {
  randomizeNumbersTimer = null;
  currentDifficulty = LEVELS[level];
  if ((currentDifficulty === "hard") || (currentDifficulty === "extreme")) {
    enableRandomizeNumbers();
  }
  const event = new CustomEvent("CHANGE_DIFFICULTY", { composed: true, bubbles: true, detail: currentDifficulty });
  document.dispatchEvent(event);
};

const enableRandomizeNumbers = () => {
  randomizeNumbersTimer = setInterval(() => {
    const event = new CustomEvent("RANDOMIZE_NUMBER", { composed: true, bubbles: true });
    document.dispatchEvent(event);
  }, 60000);
};

export const getLevels = () => DIFFICULTY[currentDifficulty];
