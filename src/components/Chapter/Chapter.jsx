import SplitWords from '../SplitWords/SplitWords';
import './Chapter.scss';

// Coral panel with the chapter title on the left, content on the right.
function Chapter({ id, number, title, subtitle, children }) {
  return (
    <section className="chapter" id={id} aria-labelledby={`${id}-title`}>
      <div className="chapter__panel" data-reveal>
        <span className="chapter__label label">Chapitre {number}</span>
        <h2 className="chapter__title display" id={`${id}-title`}>
          <SplitWords text={title} />
        </h2>
        <p className="chapter__subtitle display">{subtitle}</p>
      </div>
      <div className="chapter__body" data-reveal>
        {children}
      </div>
    </section>
  );
}

export default Chapter;
