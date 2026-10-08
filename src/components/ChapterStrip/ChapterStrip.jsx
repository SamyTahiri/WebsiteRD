import ChapterFigure from '../ChapterFigure/ChapterFigure';
import Link from '../Link/Link';
import { chapters } from '@/data/content';
import './ChapterStrip.scss';

function ChapterStrip() {
  return (
    <nav className="chapter-strip" id="sommaire" aria-label="Chapitres">
      {chapters.map((chapter, i) => {
        const content = (
          <>
            <span className="chapter-strip__text">
              <span className="label">{chapter.label}</span>
              <span className="chapter-strip__title display">{chapter.title}</span>
            </span>
            <ChapterFigure name={chapter.figure} caption={chapter.caption} />
          </>
        );
        const props = { className: 'chapter-strip__item', style: { '--i': i } };

        // Suivi is its own page; the other chapters are sections of this one.
        return chapter.id === 'suivi' ? (
          <Link key={chapter.id} to="/suivi" data-cursor="Ouvrir" {...props}>
            {content}
          </Link>
        ) : (
          <a key={chapter.id} href={`#${chapter.id}`} data-cursor="Lire" {...props}>
            {content}
          </a>
        );
      })}
    </nav>
  );
}

export default ChapterStrip;
