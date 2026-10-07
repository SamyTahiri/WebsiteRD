import { useLayoutEffect } from 'react';

// Adds "is-revealed" to each [data-reveal] element the first time it scrolls into view.
// Hidden states only apply under html.motion, which is skipped for reduced motion.
export function useScrollReveal() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    root.classList.add('motion');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('motion');
    };
  }, []);
}
