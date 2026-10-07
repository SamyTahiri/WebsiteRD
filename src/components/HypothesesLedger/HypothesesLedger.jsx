import { hypotheses } from '@/data/content';
import './HypothesesLedger.scss';

function HypothesesLedger() {
  return (
    <section className="ledger" id="hypotheses" aria-labelledby="hypotheses-title">
      <div className="ledger__head">
        <div>
          <span className="label">Chapitre 4</span>
          <h2 className="ledger__title display" id="hypotheses-title">
            Hypothèses
          </h2>
        </div>
        <p>Huit causes possibles de nos problèmes de vision, testées une à la fois.</p>
      </div>
      <ol className="ledger__list">
        {hypotheses.map((hypothesis) => (
          <li
            key={hypothesis.id}
            className={`ledger__row${hypothesis.first ? ' ledger__row--first' : ''}`}
          >
            <span className="ledger__id display">{hypothesis.id}</span>
            <h3 className="ledger__name">
              {hypothesis.title}
              {hypothesis.first && <span className="ledger__badge">Première à l'essai</span>}
            </h3>
            <p className="ledger__note">{hypothesis.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HypothesesLedger;
