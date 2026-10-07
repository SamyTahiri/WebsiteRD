import { tickerItems } from '@/data/content';
import './Ticker.scss';

// Endless band of project terms. Decorative: everything here is said elsewhere on the page.
function Ticker() {
  const group = (
    <div className="ticker__group">
      {tickerItems.map((item) => (
        <span key={item} className="ticker__item display">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {group}
        {group}
      </div>
    </div>
  );
}

export default Ticker;
