import Lenis from 'lenis';

let lenis = null;
let velocityReset;

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Inertial smooth scrolling. Skipped for reduced motion (native scrolling is kept).
export function startSmoothScroll() {
  if (lenis || reduceMotion()) return;

  // Anchors and scrollTo respect each section's scroll-margin-top (room for the sticky bar).
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: true });
  if (document.documentElement.classList.contains('intro-playing')) lenis.stop();

  // Expose scroll speed to CSS (used to skew the ticker).
  const root = document.documentElement;
  lenis.on('scroll', ({ velocity }) => {
    const clamped = Math.max(-30, Math.min(30, velocity));
    root.style.setProperty('--scroll-velocity', clamped.toFixed(2));
    clearTimeout(velocityReset);
    velocityReset = setTimeout(() => root.style.setProperty('--scroll-velocity', '0'), 120);
  });
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function resumeScroll() {
  lenis?.start();
}

export function scrollToElement(el, { immediate = false } = {}) {
  if (!el) return;
  if (lenis) {
    if (immediate) lenis.resize(); // the page may have just changed height
    lenis.scrollTo(el, { duration: 1.4, immediate, force: immediate });
  } else {
    el.scrollIntoView({ behavior: immediate || reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
}
