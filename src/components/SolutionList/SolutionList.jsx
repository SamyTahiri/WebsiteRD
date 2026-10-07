import StatusChip from '../StatusChip/StatusChip';
import { solutionTracks } from '@/data/content';
import './SolutionList.scss';

// Chapter 5 list: each solution opens its tab in the tracker.
function SolutionList({ onOpen }) {
  return (
    <ul className="solution-list">
      {solutionTracks.map((track, i) => (
        <li key={track.id} style={{ '--i': i }}>
          <a
            className="solution-list__row"
            href={`#solution-${track.id}`}
            data-cursor="Suivi"
            onClick={(event) => {
              event.preventDefault();
              onOpen(track.id);
            }}
          >
            <span className="solution-list__label label">{track.label}</span>
            <span className="solution-list__main">
              <span className="solution-list__name">{track.name}</span>
              <StatusChip status={track.status} />
            </span>
            <span className="solution-list__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SolutionList;
