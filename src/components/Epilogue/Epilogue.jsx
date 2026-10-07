import { DEADLINE } from '@/data/content';
import { daysUntil } from '@/utils/daysUntil';
import './Epilogue.scss';

function Epilogue() {
  return (
    <section className="epilogue" aria-labelledby="objectif-title">
      <h2 className="label" id="objectif-title">
        Épilogue · Objectif
      </h2>
      <p className="epilogue__date display">31.10.2026</p>
      <div className="epilogue__row">
        <p>
          Apporter quelques changements avant cette date pour les tester dans les conditions les plus
          proches possible d'une compétition.
        </p>
        <span className="epilogue__event display">STEMley Cup · J-{daysUntil(DEADLINE)}</span>
      </div>
    </section>
  );
}

export default Epilogue;
