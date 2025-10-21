import { h } from '../../src/microview.js';

export function NotFound() {
  return h(
    'div',
    null,
    h('h1', null, '404 - Not Found'),
    h('p', null, 'The page you are looking for does not exist.')
  );
}
