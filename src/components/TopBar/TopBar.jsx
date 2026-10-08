import { useEffect, useState } from 'react';
import Link from '../Link/Link';
import { chapters } from '@/data/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import './TopBar.scss';

// Sections of the report in page order, with the name shown in the bar.
const SECTIONS = [
  ...chapters.filter((c) => c.id !== 'suivi').map((c) => ({ id: c.id, name: `${c.label} · ${c.title}` })),
  { id: 'objectif', name: 'Objectif' },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);
const NO_SECTIONS = [];

function TopBar({ page }) {
  const activeId = useActiveSection(page === 'home' ? SECTION_IDS : NO_SECTIONS);
  const current = page === 'suivi' ? { id: 'suivi', name: 'Ch.6 · Suivi' } : SECTIONS.find((s) => s.id === activeId);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top-bar label${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="top-bar__brand" to={page === 'home' ? '#top' : '/'}>
        <strong>Équipe 3990</strong> · R&amp;D Vision
      </Link>
      <span className="top-bar__current" aria-live="polite">
        {/* key: re-run the roll animation when the chapter changes */}
        <span key={current?.id ?? 'none'}>{current?.name ?? ''}</span>
      </span>
      <Link className="top-bar__menu" to={page === 'home' ? '#sommaire' : '/#sommaire'}>
        Sommaire <i aria-hidden="true" />
      </Link>
    </header>
  );
}

export default TopBar;
