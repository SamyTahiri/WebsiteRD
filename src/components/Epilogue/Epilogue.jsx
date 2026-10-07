import { useRef } from 'react';
import { DEADLINE } from '@/data/content';
import { daysUntil } from '@/utils/daysUntil';
import { useInView } from '@/hooks/useInView';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import './Epilogue.scss';

const DATE_TEXT = '31.10.2026';

function Epilogue() {
  const countRef = useRef(null);
  const countVisible = useInView(countRef, { threshold: 0.8 });
  const daysLeft = daysUntil(DEADLINE);
  const shownDays = useAnimatedNumber(daysLeft, { from: 99, start: countVisible });

  return (
    <section className="epilogue" id="objectif" aria-labelledby="objectif-title" data-reveal>
      <h2 className="epilogue__label label" id="objectif-title">
        Épilogue · Objectif
      </h2>
      <p className="epilogue__date display">
        <span className="visually-hidden">{DATE_TEXT}</span>
        {DATE_TEXT.split('').map((char, i) => (
          // Each character rolls up into place, like an odometer (index keys: digits repeat).
          <span key={i} className="epilogue__char" aria-hidden="true">
            <span style={{ '--i': i }}>{char}</span>
          </span>
        ))}
      </p>
      <div className="epilogue__row">
        <p>
          Apporter quelques changements avant cette date pour les tester dans les conditions les plus
          proches possible d’une compétition.
        </p>
        <span className="epilogue__event display" ref={countRef}>
          STEMley Cup · J-<span className="epilogue__count">{shownDays}</span>
          <span className="visually-hidden"> ({daysLeft} jours restants)</span>
        </span>
      </div>
    </section>
  );
}

export default Epilogue;
