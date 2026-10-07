import { useEffect, useState } from 'react';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts from `from` to `to` once `start` is true. Shows `to` directly with reduced motion.
export function useAnimatedNumber(to, { from, start, duration = 1600 }) {
  const [value, setValue] = useState(() => (reduceMotion() ? to : from));

  useEffect(() => {
    if (!start || reduceMotion()) {
      if (reduceMotion()) setValue(to);
      return undefined;
    }
    let frame;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, from, to, duration]);

  return value;
}
