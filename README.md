# MicroView - A Signal-Based UI Library

A tiny UI library for building reactive web applications with vanilla JavaScript. No dependencies, no bundlers, no magic.

## Features

-   **Hyperscript-style UI:** Build your UI with a declarative `h()` function, a lightweight alternative to JSX.
-   **Signal-Based Reactivity:** State management is powered by **Leom**, a complete, standalone reactive core.
-   **Automatic Cleanup:** Reactive effects are automatically tracked and disposed of, preventing memory leaks.
-   **Functional Components:** Build your UI with simple, composable functions.
-   **Zero Dependencies:** Runs directly in the browser. Pure vanilla JavaScript.

## Core Concepts

### 1. Leom Signals for State Management

Reactivity in MicroView is powered by **Leom**. Signals are the foundation of this system. They hold state and automatically track where it's used, ensuring that only the necessary parts of the DOM are updated when the state changes.

-   `createSignal(initialValue)`: Creates a new signal. It returns a single function that acts as both a **getter** (when called with no arguments) and a **setter** (when called with an argument).
-   `createEffect(callback)`: Executes a function and automatically re-runs it whenever a signal it depends on changes.

```js
import { createSignal, createEffect } from './leom.js';

const count = createSignal(0);

// Read the value
console.log(count()); // -> 0

// Write a new value
count(1);

// Create a reactive effect
createEffect(() => {
	console.log(`The count is now: ${count()}`);
});
// -> "The count is now: 1"

count(2);
// -> "The count is now: 2"
```

### 2. The `h()` Function for Building UIs

MicroView uses a **hyperscript** function, `h()`, to create DOM elements in a declarative way. It's a simple JavaScript function that takes a tag, an object of properties, and an array of children.

`h(tag, props, ...children)`

```js
function Greeting() {
	return h('h1', { class: 'title' }, 'Hello, World!');
}
```

This is the pure JavaScript equivalent of what JSX transpiles to. The `h()` function handles creating elements, assigning properties (like `class` or `id`), and attaching event listeners (like `onClick`).

### 3. Mounting the Application

The `mount` function connects your root component to a DOM element.

`mount(selector, component)`

```js
// Renders the Greeting component inside the element with the id "app"
mount('#app', Greeting);
```

The `mount` function returns a `dispose` function, which you can call to unmount the component and clean up all of its associated reactive effects.

```js
const dispose = mount('#app', Greeting);

// Sometime later...
dispose(); // The app is now cleaned up.
```

### 4. Lifecycle and Cleanup

MicroView, powered by Leom, provides an automatic cleanup mechanism to prevent memory leaks. Every reactive effect is tracked within a scope. When a component is unmounted (e.g., by calling the `dispose` function returned by `mount`), all of its child effects are automatically cleaned up.

You can also hook into this process with the `onCleanup` function.

`onCleanup(fn)`

Registers a function to be called when the current reactive scope is disposed. This is useful for cleaning up manual subscriptions or side effects.

```js
function MyComponent() {
  const timer = setInterval(() => console.log('tick'), 1000);

  // Register the cleanup logic for this component.
  onCleanup(() => {
    clearInterval(timer);
    console.log('Timer cleaned up!');
  });

  return h('div', null, 'Check the console.');
}
```

## Example: A Reactive Counter

Here’s how these concepts come together to create a simple counter component.

```js
import { createSignal } from './leom.js';
import { h, mount } from './microview.js';

// 1. Create a global signal for the counter's state.
const count = createSignal(0);

// 2. Create a functional component that uses the signal and h().
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

// 3. Mount the component to the DOM.
mount('#root', Counter);
```

When a button is clicked, `setCount` is called. This updates the `count` signal, and because the `<h1>` element reads from `count`, MicroView automatically updates its text content.

## Try It Out

1.  Clone the repository:
    ```bash
    git clone https://github.com/IAmWilliamHames/MicroView.git
    cd MicroView
    ```
2.  Open `index.html` directly in your browser. Since there are no dependencies or build tools, it just works.
