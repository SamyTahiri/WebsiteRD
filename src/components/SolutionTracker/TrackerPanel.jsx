import StatusChip from '../StatusChip/StatusChip';
import { STEP_STATUS, resultFields } from '@/data/content';

function TrackerPanel({ track }) {
  const doneCount = track.steps.filter((step) => step.status === 'fait').length;

  return (
    <div
      className="tracker__panel"
      role="tabpanel"
      id={`panel-${track.id}`}
      aria-labelledby={`tab-${track.id}`}
      tabIndex={0}
    >
      {/* key: remount on tab change so the content animates in again */}
      <div className="tracker__content" key={track.id}>
        <header className="tracker__intro" style={{ '--k': 0 }}>
          <span className="label">
            {track.label}
            {track.hypothesis && ` · ${track.hypothesis}`}
          </span>
          <h3 className="tracker__title display">{track.title}</h3>
          <p className="tracker__name">{track.name}</p>
          <div className="tracker__meta">
            <StatusChip status={track.status} />
            <span className="label">
              {doneCount} / {track.steps.length} étapes faites
            </span>
          </div>
          <p className="tracker__summary">{track.summary}</p>
        </header>

        <div className="tracker__grid">
          <section className="tracker__block" style={{ '--k': 1 }} aria-label="Processus">
            <h4 className="tracker__block-title label">Processus</h4>
            <ol className="process">
              {track.steps.map((step, i) => (
                <li key={step.title} className={`process__step process__step--${step.status}`} style={{ '--s': i }}>
                  <span className="process__node" aria-hidden="true">
                    {step.status === 'fait' && (
                      <svg viewBox="0 0 16 16">
                        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" />
                      </svg>
                    )}
                  </span>
                  <div className="process__text">
                    <span className="label">
                      Étape {i + 1} · {STEP_STATUS[step.status]}
                    </span>
                    <h5 className="process__title display">{step.title}</h5>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="tracker__side">
            <section className="tracker__block" style={{ '--k': 2 }} aria-label="Ce qu’on a fait">
              <h4 className="tracker__block-title label">Ce qu’on a fait</h4>
              {track.log.length > 0 ? (
                <ul className="log">
                  {track.log.map((entry) => (
                    <li key={entry.text}>
                      <span className="log__tag label">{entry.tag}</span>
                      <p>{entry.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="tracker__empty">
                  Rien pour l’instant. Cette solution sera testée après les précédentes, une hypothèse à
                  la fois.
                </p>
              )}
            </section>

            <section className="tracker__block" style={{ '--k': 3 }} aria-label="Résultats">
              <h4 className="tracker__block-title label">Résultats</h4>
              <dl className="results">
                {resultFields.map((field) => {
                  const value = track.results[field.key];
                  return (
                    <div key={field.key} className="results__cell">
                      <dt className="label">{field.criterion}</dt>
                      <dd>
                        <span className="results__name">{field.label}</span>
                        <span className="results__value display">
                          {value ?? '—'}
                          {value != null && field.unit !== 'à définir' && <small> {field.unit}</small>}
                        </span>
                        <span className="results__note">{value == null ? 'À mesurer' : 'Mesuré'}</span>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackerPanel;
