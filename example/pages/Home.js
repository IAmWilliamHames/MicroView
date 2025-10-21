import { h } from '../../src/microview.js';
import { Link } from '../../src/router.js';

const CARD_STYLE =
  'padding: 20px; max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: #333;';

export function Home() {
  return h(
    'div',
    { style: CARD_STYLE },
    h('h1', { style: 'color: steelblue; margin-bottom: 10px;' }, 'Home'),
    h('p', null, 'Welcome to the MicroView homepage!'),
    h(
      'p',
      { style: 'margin-top: 15px;' },
      h(Link, { to: '/about' }, 'Check out the About page!')
    ),
    h(
      'p',
      { style: 'margin-top: 5px;' },
      h(Link, { to: '/todos' }, 'Or try the reactive To-Do App!')
    )
  );
}
