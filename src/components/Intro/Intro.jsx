import { useEffect, useState } from 'react';
import { finishIntro, isIntroPlaying } from '@/lib/intro';
import './Intro.scss';

const COUNT_DURATION = 900;
const LEAVE_DURATION = 1000;

// Ink curtain with a 000 → 100 counter, lifted to reveal the page. Plays once per session.
function Intro() {
  const [phase, setPhase] = useState(() => (isIntroPlaying() ? 'counting' : 'done'));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase !== 'counting') return undefined;
    let frame;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / COUNT_DURATION);
      setCount(Math.round((1 - (1 - progress) ** 3) * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase('leaving');
        finishIntro();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const timer = setTimeout(() => setPhase('done'), LEAVE_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`intro${phase === 'leaving' ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="intro__inner">
        <span className="label">Équipe 9406 · Recherche et développement</span>
        <span className="intro__count display">{String(count).padStart(3, '0')}</span>
        <span className="label">Vision et estimation de position</span>
      </div>
    </div>
  );
}

export default Intro;
