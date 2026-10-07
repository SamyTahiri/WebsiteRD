import './TopBar.scss';

function TopBar() {
  return (
    <header className="top-bar label">
      <span>
        <strong>Équipe 9406</strong> · R&amp;D Vision
      </span>
      <a className="top-bar__menu" href="#sommaire">
        Sommaire <i aria-hidden="true" />
      </a>
    </header>
  );
}

export default TopBar;
