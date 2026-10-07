import { useEffect, useState } from 'react';

// Id of the section currently crossing the upper part of the screen, or null.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-35% 0px -64% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
