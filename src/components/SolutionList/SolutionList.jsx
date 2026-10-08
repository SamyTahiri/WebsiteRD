import Link from '../Link/Link';
import StatusChip from '../StatusChip/StatusChip';
import { solutionTracks } from '@/data/content';
import { suiviPath } from '@/lib/router';
import './SolutionList.scss';

// Chapter 5 list: each solution opens its tab on the Suivi page.
function SolutionList() {
  return (
    <ul className="solution-list">
      {solutionTracks.map((track, i) => (
        <li key={track.id} style={{ '--i': i }}>
          <Link className="solution-list__row" to={suiviPath(track.id)} data-cursor="Suivi">
            <span className="solution-list__label label">{track.label}</span>
            <span className="solution-list__main">
              <span className="solution-list__name">{track.name}</span>
              <StatusChip status={track.status} />
            </span>
            <span className="solution-list__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SolutionList;
