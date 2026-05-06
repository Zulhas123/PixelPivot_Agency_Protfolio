import { indexToScrollLeft, nextIndex } from "../../domain/carousel.js";

export function createCarouselController({ document, window, sleep }) {
  const viewport = document.querySelector(".teams .carousel");
  if (!viewport) return { start() {}, stop() {} };

  const cards = Array.from(viewport.querySelectorAll(".card"));
  if (cards.length === 0) return { start() {}, stop() {} };

  viewport.setAttribute("tabindex", "0");

  const nav = document.createElement("div");
  nav.className = "carousel-nav";
  nav.innerHTML = `
    <button class="carousel-btn prev" type="button" aria-label="Previous">‹</button>
    <button class="carousel-btn next" type="button" aria-label="Next">›</button>
  `;
  viewport.parentElement?.insertBefore(nav, viewport.nextSibling);

  const prevBtn = nav.querySelector(".prev");
  const nextBtn = nav.querySelector(".next");

  let currentIndex = 0;
  let alive = true;
  let paused = false;

  const getMetrics = () => {
    const first = cards[0];
    const rect = first.getBoundingClientRect();
    const styles = window.getComputedStyle(viewport);
    const gapValue = styles.gap && styles.gap !== "normal" ? styles.gap : (styles.columnGap || "0");
    const gap = Number.parseFloat(gapValue) || 0;
    return { itemWidth: rect.width, gap, viewportWidth: viewport.clientWidth };
  };

  const scrollToIndex = (index) => {
    const { itemWidth, gap, viewportWidth } = getMetrics();
    const left = indexToScrollLeft({
      index,
      itemWidth,
      gap,
      viewportWidth,
      itemCount: cards.length,
    });
    viewport.scrollTo({ left, behavior: "smooth" });
    currentIndex = index;
  };

  const onPrev = () => scrollToIndex(nextIndex({ currentIndex, delta: -1, itemCount: cards.length }));
  const onNext = () => scrollToIndex(nextIndex({ currentIndex, delta: 1, itemCount: cards.length }));

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  const onPointerEnter = () => {
    paused = true;
  };
  const onPointerLeave = () => {
    paused = false;
  };

  const runAutoplay = async () => {
    while (alive) {
      await sleep(3000);
      if (alive && !paused) onNext();
    }
  };

  return {
    start() {
      prevBtn?.addEventListener("click", onPrev);
      nextBtn?.addEventListener("click", onNext);
      viewport.addEventListener("keydown", onKeyDown);
      viewport.addEventListener("pointerenter", onPointerEnter);
      viewport.addEventListener("pointerleave", onPointerLeave);
      runAutoplay();
    },
    stop() {
      alive = false;
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      viewport.removeEventListener("keydown", onKeyDown);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      nav.remove();
    },
  };
}
