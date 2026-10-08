import { navigate } from '@/lib/router';
import { scrollToElement } from '@/lib/smoothScroll';

// In-site link: changes page behind the curtain instead of reloading.
// Modified clicks (new tab, etc.) keep the browser's default behavior.
function Link({ to, onClick, ...props }) {
  const onLinkClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!navigate(to)) {
      scrollToElement(document.getElementById(new URL(to, window.location.href).hash.slice(1)));
    }
  };

  return <a href={to} onClick={onLinkClick} {...props} />;
}

export default Link;
