import { sleep } from "./infrastructure/sleep.js";
import { bootstrapApp } from "./presentation/bootstrap.js";
import { renderStaticViews } from "./presentation/render.js";

function start() {
  renderStaticViews({ document });

  const app = bootstrapApp({
    window,
    document,
    sleep,
  });

  app.start();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
