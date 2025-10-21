import { h, mount } from '../src/microview.js';
import { createRouter, Link } from '../src/router.js';

// --- Page Components ---
function Home() {
  return h(
    'div',
    null,
    h('h1', null, 'Home'),
    h('p', null, 'Welcome to the MicroView homepage!'),
    h('p', null, h(Link, { to: '/about' }, 'Check out the About page!'))
  );
}

function About() {
  return h(
    'div',
    null,
    h('h1', null, 'About'),
    h('p', null, 'This is a simple routing example for MicroView.'),
    h('p', null, h(Link, { to: '/' }, 'Go back Home.'))
  );
}

function NotFound() {
  return h(
    'div',
    null,
    h('h1', null, '404 - Not Found'),
    h('p', null, 'The page you are looking for does not exist.')
  );
}

// --- Router Setup ---
const routes = {
  '/': Home,
  '/about': About,
  '/404': NotFound,
};

const { activeComponent } = createRouter(routes);

// --- Main App Component ---
function App() {
  return h(
    'div',
    null,
    h(
      'nav',
      null,
      h(Link, { to: '/' }, 'Home'),
      ' | ',
      h(Link, { to: '/about' }, 'About')
    ),
    h('hr'),
    activeComponent // Render the active component signal
  );
}

// --- Mount Application ---
mount('#root', App);
