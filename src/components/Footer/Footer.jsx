import { TESTS_DOC_URL } from '@/data/content';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer label">
      <span>Équipe 9406 · Recherche et développement</span>
      <a href={TESTS_DOC_URL} target="_blank" rel="noreferrer" data-cursor="Ouvrir">
        Document des tests ↗
      </a>
    </footer>
  );
}

export default Footer;
