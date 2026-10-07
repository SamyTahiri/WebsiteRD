import { resumeScroll } from './smoothScroll';

const STORAGE_KEY = 'visionrd:intro-seen';

// Decide, before the first render, whether the intro curtain plays:
// once per browser session, never with reduced motion or when opening a deep link.
export function prepareIntro() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = false;
  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    seen = false;
  }
  if (!reduceMotion && !seen && !window.location.hash) {
    document.documentElement.classList.add('has-intro', 'intro-playing');
  }
}

export function isIntroPlaying() {
  return document.documentElement.classList.contains('intro-playing');
}

export function finishIntro() {
  document.documentElement.classList.remove('intro-playing');
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Storage blocked: the intro may play again next visit, which is fine.
  }
  resumeScroll();
}
