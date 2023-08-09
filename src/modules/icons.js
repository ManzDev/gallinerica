import { shuffle } from "@/modules/shuffle.js";

export const ICONS = [
  "beer",
  "briefcase",
  "crown",
  "fire",
  "ice",
  "magic",
  "package",
  "radioactive",
  "rocket",
  "voltage"
];

export const getPermutation = () => {
  const icons = shuffle(ICONS);
  const entries = icons.map((item, index) => [index, item]);
  return Object.fromEntries(entries);
};
