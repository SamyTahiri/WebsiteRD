import { useEffect, useLayoutEffect } from 'react';
import Intro from './components/Intro/Intro';
import PageCurtain from './components/PageCurtain/PageCurtain';
import Cursor from './components/Cursor/Cursor';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Suivi from './pages/Suivi';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useRoute } from './lib/router';
import { scrollToElement, scrollToTop, startSmoothScroll, stopSmoothScroll } from './lib/smoothScroll';

const TITLES = {
  home: 'Vision et estimation de position · Équipe 3990',
  suivi: 'Suivi des solutions · Équipe 3990',
};

function App() {
  const route = useRoute();

  useScrollReveal(route.page);

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  // Each page change starts at the top, or at the linked section.
  useLayoutEffect(() => {
    document.title = TITLES[route.page];
    const target = route.hash && document.getElementById(route.hash.slice(1));
    if (target) scrollToElement(target, { immediate: true });
    else scrollToTop();
  }, [route.key, route.page, route.hash]);

  return (
    <>
      <Intro />
      <PageCurtain />
      <Cursor />
      <TopBar key={route.page} page={route.page} />
      {route.page === 'suivi' ? <Suivi solution={route.solution} /> : <Home />}
      <Footer />
    </>
  );
}

export default App;
