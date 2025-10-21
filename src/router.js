import { createSignal, createMemo } from './leom.js';
import { h } from './microview.js';

/**
 * @file A simple hash-based router for client-side navigation.
 */

/**
 * Creates a router instance that reactively updates the displayed component based on the URL hash.
 *
 * @param {object.<string, function(): HTMLElement>} routes - An object where keys are URL paths (e.g., '/', '/about')
 * and values are component functions to render for those paths. A '/404' route is recommended for handling unknown paths.
 * @returns {{activeComponent: function(): HTMLElement, navigate: function(string): void}} An object containing:
 * - `activeComponent`: A memoized signal that returns the component function for the current route.
 * - `navigate`: A function to programmatically change the route.
 * @example
 * const routes = {
 *   '/': () => h('h1', {}, 'Home'),
 *   '/about': () => h('h1', {}, 'About'),
 *   '/404': () => h('h1', {}, 'Not Found')
 * };
 * const { activeComponent, navigate } = createRouter(routes);
 *
 * // In your main component:
 * h('div', {},
 *   h('nav', {},
 *     Link({ to: '/', children: ['Home'] }),
 *     Link({ to: '/about', children: ['About'] })
 *   ),
 *   activeComponent // This will render the correct component
 * );
 */
export function createRouter(routes) {
  // Signal to hold the current route from the URL hash
  const currentRoute = createSignal(window.location.hash || '#/');

  // Update the signal whenever the hash changes
  window.addEventListener('hashchange', () => {
    currentRoute(window.location.hash || '#/');
  });

  /**
   * Navigates to a new path by updating the URL hash.
   * @param {string} path - The path to navigate to (e.g., '/', '/profile').
   */
  const navigate = (path) => {
    window.location.hash = path;
  };

  // A memoized value that returns the component corresponding to the current route
  const activeComponent = createMemo(() => {
    const path = currentRoute().slice(1) || '/';
    return (
      routes[path] || routes['/404'] || (() => h('h1', null, '404 Not Found'))
    );
  });

  return { activeComponent, navigate };
}

/**
 * A component that creates a hyperlink for client-side navigation.
 * It renders an `<a>` tag with an `href` attribute that points to a URL hash.
 *
 * @param {object} props - The properties for the Link component.
 * @param {string} props.to - The destination path (e.g., '/home', '/settings').
 * @param {Array<HTMLElement|string>} props.children - The content of the link.
 * @returns {HTMLElement} An `<a>` element.
 * @example
 * Link({ to: '/dashboard', children: ['Go to Dashboard'] })
 */
export function Link({ to, children }) {
  return h('a', { href: `#${to}` }, ...children);
}
