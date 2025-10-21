# MicroView - A Signal-Based UI Library

A tiny UI library for building reactive web applications with vanilla JavaScript. **No dependencies**, **no bundlers**, **no magic**.

## Project Origin & Philosophy

MicroView is a lightweight, zero-dependency **JavaScript library** built primarily as a practical exercise in modern front-end engineering. Its development was a focused journey to understand and implement the core concepts of high-performance UI rendering:

1. **Component Foundations**: The project began as an experiment to grasp how **functional components** and state encapsulation work.
2. **Reactive Core (Leom)**: This evolved into a deep dive into state management patterns. After exploring common approaches, the decision was made to commit to **Signal-based reactivity**. This choice was driven by understanding that signals offer high performance and enable highly granular DOM updates, eliminating the need for a Virtual DOM. The result is Leom, a minimal, separate project that acts as the core reactive engine.
3. **Hyperscript UI**: The declarative UI layer was established by implementing the **`h()` function**, the pure JavaScript equivalent of JSX, to create a concise and readable view layer.
4. **Community-Driven API**: The current API was significantly refined based on valuable feedback and shared experiences received from the community following a series of posts about the project on LinkedIn.
5. **Application Readiness**: Routing was added to prepare the library for a real-world test: building a complete Single-Page Application (SPA) using MicroView.

This project demonstrates a thorough, hands-on understanding of reactivity principles, DOM manipulation efficiency, and modern component architecture.

---

## Features

- **HyperScript-Style UI**: Build your UI with a declarative `h()` function, a lightweight alternative to JSX.
- **Reactive Core**: State management is powered by **Leom**, a complete, standalone signal-based engine.
- **Built-In SPA Routing**: A simple and powerful hash-based router for building multi-page applications.
- **Automatic Cleanup**: Reactive effects are automatically tracked and disposed of, preventing memory leaks.
- **Functional Components**: Build your UI with simple, composable functions.
- **Zero Dependencies**: Runs directly in the browser. Pure vanilla JavaScript.

---

## Core Concepts

1. **Leom Signals For State Management**

Reactivity in MicroView is powered by **Leom**. Signals are the foundation of this system, holding state and automatically tracking where it's used to ensure only necessary parts of the DOM are updated when the state changes.

- `createSignal(initialValue)`: Creates a new signal that returns a single function acting as both a **getter** (no arguments) and a **setter** (with an argument).
- `createEffect(callback)`: Executes a function and automatically re-runs it whenever a signal it depends on changes.

```js
import { createSignal, createEffect } from './leom.js';

const count = createSignal(0);

// Create a reactive effect
createEffect(() => {
  console.log(`The count is now: ${count()}`); // -> "The count is now: 0"
});

count(1); // -> "The count is now: 1"
```

2. **The `h()` Function For Building UIs**

MicroView uses a **hyperScript** function, `h()`, to create DOM elements declaratively. It takes a tag, and object of properties, and an array of children: `h(tag, props, ...children)`.

```js
function Greeting()
  return h('h1', { class: 'title' }, 'Hello World')
```

3. **Mounting And Cleanup**

The `mount(selector, component)` function connects your root component to a DOM element (e.g., `#root`). It returns a `dispose` function to completely unmount the component and clean up all associated reactive effects, ensuring no memory leaks.

You can also use `onCleanup(fn)` to register a function to be called when the current reactive scope (component of effect) is disposed.

```js
import { onCleanup } from './leom.js';

function MyComponent() {
  const timer = setInterval(() => console.log('tick'), 1000);

  // Register the cleanup logic for this component
  onCleanup(() => {
    clearInterval(timer);
    console.log('Timer cleaned up!');
  });
  // ...
}
```

## Example: A Reactive Counter

This shows how signals are used directly as reactive bindings in the UI.

```js
import { createSignal } from './leom.js';
import { h, mount } from './microview.js';

const count = createSignal(0);

function Counter() {
  return h(
    'div',
    { class: 'container' },
    // Passing the signal directly to h() creates a reactive binding.
    h('h1', null, count),
    // Event listeners update the signal, triggering a re-render.
    h('button', { onClick: () => count(count() + 1) }, '+'),
    h('button', { onClick: () => count(count() - 1) }, '-')
  );
}

mount('#root', Counter);
```

## Routing

MicroView includes a hash-based router for building Single-Page Applications (SPAs), integrating fully with the reactive system.

`createRouter(routes)`

It takes a routes object (path-to-component mapping) and returns an `activeComponent` signal, which holds the component corresponding to the current URL hash.

### `Link` Component

Use the `Link` component to create navigation elements.

```js
import { Link } from './router.js';

function App({ activeComponent }) {
  return h(
    'div',
    null,
    h(
      'nav',
      null,
      h(Link, { to: '/' }, 'Home'),
      h(Link, { to: '/about' }, 'About')
    ),
    h('hr'),
    // The activeComponent signal will render the correct page here
    activeComponent
  );
}
```

## Project Status & Next Steps

MicroView is currently a **Proof-of-Concept** and a comprehensive educational project demonstrating component architecture and high-performance, signal-based reactivity.

The next steps of for this project include:

1. Building a complete, non-trivial application (e.g. complex dashboard) using MicroView to validate its API and performance under load.
2. Explore optimization opportunities within the Leom core.

## Try It Out

1. Clone the repository:

```bash
git clone https://github.com/IAmWilliamHames/MicroView.git
cd MicroView
```

2. Open `index.html` directly in your browser. Since there are no dependencies or build tools, it just works.
