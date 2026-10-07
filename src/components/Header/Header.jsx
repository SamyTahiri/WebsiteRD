import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">WebsiteRD</a>
        <nav className="header__nav">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
