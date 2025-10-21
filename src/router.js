import { createSignal, createMemo } from './leom.js';
import { h } from './microview.js';

export function createRouter(routes) {
  // 1. Centralized Route Signal
  const currentRoute = createSignal(window.location.hash || '#/');

  // 2. Global Event Listener
  window.addEventListener('hashchange', () => {
    currentRoute(window.location.hash || '#/');
  });

  // 3. Navigation Function
  const navigate = (path) => {
    window.location.hash = path;
  };

  // 4. Memoized Active Component
  const activeComponent = createMemo(() => {
    const path = currentRoute().slice(1) || '/';
    return (
      routes[path] || routes['/404'] || (() => h('h1', null, '404 Not Found'))
    );
  });

  return { activeComponent, navigate };
}

// 5. Link Component
export function Link({ to, children }) {
  return h('a', { href: `#${to}` }, ...children);
}
