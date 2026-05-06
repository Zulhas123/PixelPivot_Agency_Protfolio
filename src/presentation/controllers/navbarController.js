export function createNavbarController({ document, window }) {
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".navbar .menu");
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnIcon = document.querySelector(".menu-btn i");

  if (!navbar || !menu || !menuBtn) {
    return { start() {}, stop() {} };
  }

  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add("sticky");
    else navbar.classList.remove("sticky");
  };

  const onMenuClick = (event) => {
    const target = /** @type {HTMLElement|null} */ (event.target);
    if (!target) return;
    if (target.matches(".navbar .menu li a")) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  };

  const onToggleMenu = () => {
    menu.classList.toggle("active");
    if (menuBtnIcon) menuBtnIcon.classList.toggle("active");
  };
  const onToggleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") onToggleMenu();
  };

  return {
    start() {
      window.addEventListener("scroll", onScroll, { passive: true });
      menu.addEventListener("click", onMenuClick);
      menuBtn.addEventListener("click", onToggleMenu);
      menuBtn.addEventListener("keydown", onToggleKeyDown);
      onScroll();
    },
    stop() {
      window.removeEventListener("scroll", onScroll);
      menu.removeEventListener("click", onMenuClick);
      menuBtn.removeEventListener("click", onToggleMenu);
      menuBtn.removeEventListener("keydown", onToggleKeyDown);
    },
  };
}
