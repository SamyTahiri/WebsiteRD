import { useSyncExternalStore } from 'react';
import { solutionTracks } from '@/data/content';

// Two pages: the report at "/" and the solution tracker at "/suivi/<solution>".
// Page changes run behind an ink curtain (see PageCurtain), like loading a new page.

const SUIVI = '/suivi';
const COVER_DURATION = 550;

const listeners = new Set();
let route = null; // read on first use, after main.jsx has tidied the URL
let transitioning = false;

function parse() {
  const { pathname, hash } = window.location;
  if (pathname === SUIVI || pathname.startsWith(`${SUIVI}/`)) {
    const id = pathname.slice(SUIVI.length + 1);
    const solution = solutionTracks.some((track) => track.id === id) ? id : solutionTracks[0].id;
    return { page: 'suivi', solution, hash: '', key: route ? route.key + 1 : 0 };
  }
  return { page: 'home', solution: null, hash, key: route ? route.key + 1 : 0 };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function suiviPath(id) {
  return `${SUIVI}/${id}`;
}

// Old links (/#solution-navx3) now open the tracker page.
export function redirectLegacyUrl() {
  const match = window.location.hash.match(/^#solution-(.+)$/);
  if (match && window.location.pathname === '/') {
    window.history.replaceState(null, '', suiviPath(match[1]));
  }
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => (route ??= parse()));
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cover the screen, swap the page while hidden, then uncover.
function transition(swap) {
  // Back/forward pressed mid-transition: swap right away under the curtain already there.
  if (reduceMotion() || transitioning) {
    swap();
    return;
  }
  transitioning = true;
  const root = document.documentElement;
  root.classList.remove('has-intro'); // the next page animates in without the intro delay
  root.classList.add('page-covering');
  setTimeout(() => {
    swap();
    root.classList.replace('page-covering', 'page-uncovering');
    setTimeout(() => {
      root.classList.remove('page-uncovering');
      transitioning = false;
    }, COVER_DURATION);
  }, COVER_DURATION);
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
  // An anchor on the current page just scrolls (handled by smooth scrolling).
  if (samePage && url.hash) return false;
  if (transitioning) return true;
  transition(() => {
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
    route = parse();
    emit();
  });
  return true;
}

// Switch the selected solution without a page change or a new history entry.
export function selectSolution(id) {
  window.history.replaceState(null, '', suiviPath(id));
  route = { ...route, solution: id };
  emit();
}

window.addEventListener('popstate', () => {
  const next = parse();
  // Same page (another solution tab, or an anchor): no curtain.
  if (next.page === route.page) {
    route = { ...route, solution: next.solution };
    emit();
    return;
  }
  transition(() => {
    route = next;
    emit();
  });
});
