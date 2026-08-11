type IntroListener = () => void;

let introResolved = false;
const listeners = new Set<IntroListener>();

/** Call when the homepage logo preloader finishes, or when no intro will run. */
export function markIntroDone() {
  if (introResolved) return;
  introResolved = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

/**
 * Run `callback` once the logo intro is done.
 * If already finished (or skipped), runs on the next frame.
 */
export function whenIntroReady(callback: IntroListener): () => void {
  if (introResolved) {
    const id = window.requestAnimationFrame(() => callback());
    return () => window.cancelAnimationFrame(id);
  }

  listeners.add(callback);
  const safety = window.setTimeout(() => markIntroDone(), 6000);
  return () => {
    listeners.delete(callback);
    window.clearTimeout(safety);
  };
}
