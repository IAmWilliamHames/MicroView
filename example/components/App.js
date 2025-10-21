import { h } from '../../src/microview.js';
import { Link } from '../../src/router.js';

/**
 * Main application layout component including navigation.
 * Renders the active component provided by the router.
 */
export function App({ activeComponent }) {
  return h(
    'div',
    null,
    h(
      'nav',
      { style: 'padding: 10px; border-bottom: 1px solid #ccc;' },
      h(Link, { to: '/' }, 'Home'),
      ' | ',
      h(Link, { to: '/about' }, 'About'),
      ' | ',
      h(Link, { to: '/todos' }, 'To-Do App')
    ),
    h('hr'),
    activeComponent // Render the active component signal from the router
  );
}
