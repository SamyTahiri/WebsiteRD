import { useLayoutEffect, useRef, useState } from 'react';
import SplitWords from '../SplitWords/SplitWords';
import StatusChip from '../StatusChip/StatusChip';
import TrackerPanel from './TrackerPanel';
import { SOLUTION_STATUS, solutionTracks } from '@/data/content';
import './SolutionTracker.scss';

const statusCounts = Object.keys(SOLUTION_STATUS).map((status) => ({
  status,
  count: solutionTracks.filter((track) => track.status === status).length,
}));

// Chapter 6: one tab per solution, with its process, log and results.
function SolutionTracker({ activeId, onSelect }) {
  const listRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState(null);
  const active = solutionTracks.find((track) => track.id === activeId) ?? solutionTracks[0];

  // Move the ink indicator behind the active tab (vertical list on desktop, row on mobile).
  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const tab = tabRefs.current[active.id];
      if (!tab) return;
      setIndicator({ x: tab.offsetLeft, y: tab.offsetTop, w: tab.offsetWidth, h: tab.offsetHeight });
      // Keep the active tab visible when the list scrolls sideways (mobile).
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active.id]);

  const onKeyDown = (event) => {
    const index = solutionTracks.findIndex((track) => track.id === active.id);
    const last = solutionTracks.length - 1;
    const next = {
      ArrowDown: Math.min(last, index + 1),
      ArrowRight: Math.min(last, index + 1),
      ArrowUp: Math.max(0, index - 1),
      ArrowLeft: Math.max(0, index - 1),
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const { id } = solutionTracks[next];
    onSelect(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section className="tracker" id="suivi" aria-labelledby="suivi-title">
      <div className="tracker__head" data-reveal>
        <div>
          <span className="label">Chapitre 6</span>
          <h2 className="tracker__heading display" id="suivi-title">
            <SplitWords text="Suivi" />
          </h2>
        </div>
        <div className="tracker__overview">
          <p>Ce qu’on a fait, où on en est et ce qui reste, solution par solution.</p>
          <div className="tracker__bar" aria-hidden="true">
            {solutionTracks.map((track, i) => (
              <span
                key={track.id}
                className={`tracker__segment tracker__segment--${track.status}`}
                style={{ '--i': i }}
              />
            ))}
          </div>
          <p className="tracker__counts label">
            {statusCounts.map(({ status, count }) => `${count} ${SOLUTION_STATUS[status].toLowerCase()}`).join(' · ')}
          </p>
        </div>
      </div>

      <div className="tracker__body" data-reveal>
        <div
          className="tracker__tabs"
          role="tablist"
          aria-label="Solutions"
          aria-orientation="vertical"
          ref={listRef}
          onKeyDown={onKeyDown}
        >
          {indicator && (
            <span
              className="tracker__indicator"
              aria-hidden="true"
              style={{
                '--x': `${indicator.x}px`,
                '--y': `${indicator.y}px`,
                '--w': `${indicator.w}px`,
                '--h': `${indicator.h}px`,
              }}
            />
          )}
          {solutionTracks.map((track) => {
            const selected = track.id === active.id;
            return (
              <button
                key={track.id}
                ref={(el) => {
                  tabRefs.current[track.id] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${track.id}`}
                aria-selected={selected}
                aria-controls={`panel-${track.id}`}
                tabIndex={selected ? 0 : -1}
                className="tracker__tab"
                style={{ '--i': solutionTracks.indexOf(track) }}
                onClick={() => onSelect(track.id)}
              >
                <span className="label">{track.label}</span>
                <span className="tracker__tab-title display">{track.title}</span>
                <StatusChip status={track.status} />
              </button>
            );
          })}
        </div>

        <TrackerPanel track={active} />
      </div>
    </section>
  );
}

export default SolutionTracker;
