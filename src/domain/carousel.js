import { clamp } from "./math.js";

export function nextIndex({ currentIndex, delta, itemCount }) {
  if (itemCount <= 0) return 0;
  const next = (currentIndex + delta) % itemCount;
  return next < 0 ? next + itemCount : next;
}

export function indexToScrollLeft({ index, itemWidth, gap, viewportWidth, itemCount }) {
  if (itemCount <= 0) return 0;
  const maxIndex = Math.max(0, itemCount - 1);
  const clampedIndex = clamp(index, 0, maxIndex);
  const target = clampedIndex * (itemWidth + gap);
  return Math.max(0, target - Math.max(0, (viewportWidth - itemWidth) / 2));
}

