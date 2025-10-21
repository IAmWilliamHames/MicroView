import { mount } from '../src/microview.js';
import { createRouter } from '../src/router.js';

// Import Pages (The views tied to routes)
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Todo } from './pages/Todo.js';
import { NotFound } from './pages/NotFound.js';

// Import Components (The main layout wrapper)
import { App } from './components/App.js';

// --- Router Setup ---
const routes = {
  '/': Home,
  '/about': About,
  '/todos': Todo,
  '/404': NotFound,
};

const { activeComponent } = createRouter(routes);

// --- Mount Application ---
// The App component takes the activeComponent signal and renders it within the layout.
// Note: We wrap App in a function for mount, as mount expects a component function.
mount('#root', () => App({ activeComponent }));
