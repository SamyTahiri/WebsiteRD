import { useEffect, useState } from 'react';
import { chapters } from '@/data/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import './TopBar.scss';

// Sections in page order, with the name shown in the bar.
const SECTIONS = [
  ...chapters.filter((c) => c.id !== 'suivi').map((c) => ({ id: c.id, name: `${c.label} · ${c.title}` })),
  { id: 'objectif', name: 'Objectif' },
  { id: 'suivi', name: 'Ch.6 · Suivi' },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

function TopBar() {
  const activeId = useActiveSection(SECTION_IDS);
  const active = SECTIONS.find((s) => s.id === activeId);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top-bar label${scrolled ? ' is-scrolled' : ''}`}>
      <a className="top-bar__brand" href="#top">
        <strong>Équipe 9406</strong> · R&amp;D Vision
      </a>
      <span className="top-bar__current" aria-live="polite">
        {/* key: re-run the roll animation when the chapter changes */}
        <span key={active?.id ?? 'none'}>{active?.name ?? ''}</span>
      </span>
      <a className="top-bar__menu" href="#sommaire">
        Sommaire <i aria-hidden="true" />
      </a>
    </header>
  );
}

export default TopBar;
