import { h } from '../../src/microview.js';
import { Link } from '../../src/router.js';

export function About() {
  return h(
    'div',
    null,
    h('h1', null, 'About'),
    h('p', null, 'This is a simple routing example for MicroView.'),
    h('p', null, h(Link, { to: '/' }, 'Go back Home.'))
  );
}
