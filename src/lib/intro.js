import { resumeScroll } from './smoothScroll';

function isReload() {
  const [nav] = performance.getEntriesByType('navigation');
  return nav?.type === 'reload';
}

// Decide, before the first render, whether the intro curtain plays.
// A refresh always starts over at the top of the current page with the intro.
// Opening a link to a section (#…) skips the intro so the page can jump there.
export function prepareIntro() {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  if (isReload() && window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && !window.location.hash) {
    document.documentElement.classList.add('has-intro', 'intro-playing');
  }
}

export function isIntroPlaying() {
  return document.documentElement.classList.contains('intro-playing');
}

export function finishIntro() {
  document.documentElement.classList.remove('intro-playing');
  resumeScroll();
}
