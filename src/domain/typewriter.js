export class Typewriter {
  /**
   * @param {object} params
   * @param {string[]} params.phrases
   * @param {number} params.typeSpeedMs
   * @param {number} params.backSpeedMs
   * @param {number} params.pauseMs
   * @param {(ms:number)=>Promise<void>} params.sleep
   */
  constructor({ phrases, typeSpeedMs, backSpeedMs, pauseMs, sleep }) {
    if (!Array.isArray(phrases) || phrases.length === 0) {
      throw new Error("Typewriter requires non-empty phrases.");
    }
    this.phrases = phrases;
    this.typeSpeedMs = typeSpeedMs;
    this.backSpeedMs = backSpeedMs;
    this.pauseMs = pauseMs;
    this.sleep = sleep;
  }

  /**
   * @param {object} params
   * @param {(text:string)=>void} params.render
   * @param {AbortSignal} params.signal
   */
  async run({ render, signal }) {
    let phraseIndex = 0;
    while (!signal.aborted) {
      const phrase = this.phrases[phraseIndex % this.phrases.length];

      for (let i = 1; i <= phrase.length && !signal.aborted; i += 1) {
        render(phrase.slice(0, i));
        await this.sleep(this.typeSpeedMs);
      }

      await this.sleep(this.pauseMs);

      for (let i = phrase.length; i >= 0 && !signal.aborted; i -= 1) {
        render(phrase.slice(0, i));
        await this.sleep(this.backSpeedMs);
      }

      phraseIndex += 1;
    }
  }
}
