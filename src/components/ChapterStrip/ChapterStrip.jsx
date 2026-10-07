import ChapterFigure from '../ChapterFigure/ChapterFigure';
import { chapters } from '@/data/content';
import './ChapterStrip.scss';

function ChapterStrip() {
  return (
    <nav className="chapter-strip" id="sommaire" aria-label="Chapitres">
      {chapters.map((chapter, i) => (
        <a
          key={chapter.id}
          className="chapter-strip__item"
          href={`#${chapter.id}`}
          style={{ '--i': i }}
          data-cursor="Lire"
        >
          <span className="chapter-strip__text">
            <span className="label">{chapter.label}</span>
            <span className="chapter-strip__title display">{chapter.title}</span>
          </span>
          <ChapterFigure name={chapter.figure} caption={chapter.caption} />
        </a>
      ))}
    </nav>
  );
}

export default ChapterStrip;
