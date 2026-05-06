import { Typewriter } from "../../domain/typewriter.js";

export function createTypewriterController({ document, sleep }) {
  const elements = [
    document.querySelector(".typing"),
    document.querySelector(".typing-2"),
  ].filter(Boolean);

  if (elements.length === 0) return { start() {}, stop() {} };

  const controller = new AbortController();
  const writer = new Typewriter({
    phrases: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
    typeSpeedMs: 100,
    backSpeedMs: 60,
    pauseMs: 900,
    sleep,
  });

  return {
    start() {
      for (const el of elements) {
        writer.run({
          render: (text) => {
            el.textContent = text;
          },
          signal: controller.signal,
        });
      }
    },
    stop() {
      controller.abort();
    },
  };
}

