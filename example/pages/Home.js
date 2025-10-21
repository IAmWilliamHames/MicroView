import { h } from '../../src/microview.js';
import { Link } from '../../src/router.js';

export function Home() {
  return h(
    'div',
    null,
    h('h1', null, 'Home'),
    h('p', null, 'Welcome to the MicroView homepage!'),
    h('p', null, h(Link, { to: '/about' }, 'Check out the About page!')),
    h('p', null, h(Link, { to: '/todos' }, 'Or try the reactive To-Do App!'))
  );
}
