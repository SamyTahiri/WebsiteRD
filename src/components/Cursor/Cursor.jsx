import { useEffect, useRef, useState } from 'react';
import './Cursor.scss';

// A circle that follows the mouse and shows a word over elements with data-cursor="…".
// Mouse users only; the normal cursor stays visible.
function Cursor() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!finePointer || reduceMotion || !el) return undefined;

    let x = -100;
    let y = -100;
    let currentX = x;
    let currentY = y;
    let frame;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
    };
    const onOver = (event) => {
      const target = event.target.closest?.('[data-cursor]');
      setActive(Boolean(target));
      if (target) setText(target.dataset.cursor);
    };
    const loop = () => {
      currentX += (x - currentX) * 0.2;
      currentY += (y - currentY) * 0.2;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    el.hidden = false;
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true" hidden>
      <span className={`cursor__bubble${active ? ' is-active' : ''}`}>{text}</span>
    </div>
  );
}

export default Cursor;
