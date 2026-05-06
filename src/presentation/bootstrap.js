import { createNavbarController } from "./controllers/navbarController.js";
import { createScrollUpController } from "./controllers/scrollUpController.js";
import { createTypewriterController } from "./controllers/typewriterController.js";
import { createCarouselController } from "./controllers/carouselController.js";

export function bootstrapApp(deps) {
  const controllers = [
    createNavbarController(deps),
    createScrollUpController(deps),
    createTypewriterController(deps),
    createCarouselController(deps),
  ];

  return {
    start() {
      for (const c of controllers) c.start();
    },
    stop() {
      for (const c of controllers) c.stop();
    },
  };
}

