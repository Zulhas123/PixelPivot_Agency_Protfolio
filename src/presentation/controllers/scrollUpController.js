export function createScrollUpController({ document, window }) {
  const button = document.querySelector(".scroll-up-btn");
  if (!button) return { start() {}, stop() {} };

  const onScroll = () => {
    if (window.scrollY > 500) button.classList.add("show");
    else button.classList.remove("show");
  };

  const onClick = () => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0 });
    root.style.scrollBehavior = previous;
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") onClick();
  };

  return {
    start() {
      window.addEventListener("scroll", onScroll, { passive: true });
      button.addEventListener("click", onClick);
      button.addEventListener("keydown", onKeyDown);
      onScroll();
    },
    stop() {
      window.removeEventListener("scroll", onScroll);
      button.removeEventListener("click", onClick);
      button.removeEventListener("keydown", onKeyDown);
    },
  };
}
