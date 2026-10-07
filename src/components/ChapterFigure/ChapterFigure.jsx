import './ChapterFigure.scss';

// Small archival-style drawings shown on each chapter tab.
// "currentColor" is the ink; ".chapter-figure__paper" fills with the paper colour.
// The fig-* classes are the parts that move when the tab is hovered.
const drawings = {
  trajectory: (
    <>
      <path
        className="fig-path"
        d="M10 84 C 26 84, 30 46, 44 44 S 70 30, 70 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="5 4"
      />
      <rect x="62" y="6" width="16" height="16" fill="currentColor" />
    </>
  ),
  target: (
    <>
      <circle cx="40" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="40" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="40" y1="14" x2="40" y2="86" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="50" x2="76" y2="50" stroke="currentColor" strokeWidth="2" />
      {/* Estimated pose; slides back to the true centre on hover. */}
      <circle className="fig-dot" cx="50" cy="42" r="5" fill="currentColor" />
    </>
  ),
  camera: (
    <>
      <rect className="chapter-figure__paper" x="12" y="32" width="56" height="38" rx="4" stroke="currentColor" strokeWidth="3" />
      <g className="fig-lens">
        <circle cx="40" cy="51" r="11" fill="currentColor" />
        <circle className="chapter-figure__paper" cx="40" cy="51" r="4" />
      </g>
      <circle className="fig-led" cx="20" cy="40" r="2.5" fill="currentColor" />
      <circle className="fig-led" cx="60" cy="40" r="2.5" fill="currentColor" />
    </>
  ),
  apriltag: (
    <g className="fig-tag">
      <rect x="14" y="24" width="52" height="52" fill="currentColor" />
      <g className="chapter-figure__paper">
        <rect x="22" y="32" width="12" height="12" />
        <rect x="40" y="32" width="6" height="18" />
        <rect x="50" y="44" width="8" height="8" />
        <rect x="22" y="52" width="18" height="6" />
        <rect x="34" y="62" width="10" height="6" />
        <rect x="50" y="60" width="8" height="8" />
      </g>
    </g>
  ),
  gyroscope: (
    <>
      <circle cx="40" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse className="fig-ring" cx="40" cy="50" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <ellipse className="fig-ring fig-ring--reverse" cx="40" cy="50" rx="10" ry="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="50" r="4" fill="currentColor" />
    </>
  ),
  checklist: (
    <>
      <rect className="chapter-figure__paper" x="14" y="26" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
      <path className="fig-check" d="M16.5 32 l3 3 l5 -6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="32" x2="66" y2="32" stroke="currentColor" strokeWidth="3" />
      <rect className="chapter-figure__paper" x="14" y="46" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
      <path className="fig-check" d="M16.5 52 l3 3 l5 -6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="3" />
      <rect className="chapter-figure__paper" x="14" y="66" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="72" x2="62" y2="72" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
    </>
  ),
};

function ChapterFigure({ name, caption }) {
  return (
    <figure className={`chapter-figure chapter-figure--${name}`}>
      <svg viewBox="0 0 80 100" aria-hidden="true">
        {drawings[name]}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default ChapterFigure;
