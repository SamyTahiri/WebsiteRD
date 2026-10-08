import './PageCurtain.scss';

// Ink panel that covers the screen while the page changes (driven by classes on <html>).
function PageCurtain() {
  return <div className="page-curtain" aria-hidden="true" />;
}

export default PageCurtain;
