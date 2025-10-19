# MicroView - A Signal-Based UI Library

A tiny UI library for building reactive web applications with vanilla JavaScript. No dependencies, no bundlers, no magic.

## Features

-   **Hyperscript-style UI:** Build your UI with a declarative `h()` function, a lightweight alternative to JSX.
-   **Signal-Based Reactivity:** State management is powered by an efficient and granular signal system (`signal`, `effect`).
-   **Functional Components:** Build your UI with simple, composable functions.
-   **Zero Dependencies:** Runs directly in the browser. Pure vanilla JavaScript.

## Core Concepts

### 1. Signals for State Management

Signals are the foundation of reactivity in MicroView. They hold state and automatically track where it's used, ensuring that only the necessary parts of the DOM are updated when the state changes.

-   `signal(initialValue)`: Creates a new signal, returning a `[read, write]` tuple.
-   `effect(callback)`: Executes a function and automatically re-runs it whenever a signal it depends on changes.

```js
const [count, setCount] = signal(0);

// Read the value
console.log(count()); // -> 0

// Write a new value
setCount(1);

// Create a reactive effect
effect(() => {
	console.log(`The count is now: ${count()}`);
});
// -> "The count is now: 1"

setCount(2);
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

## Example: A Reactive Counter

Here’s how these concepts come together to create a simple counter component.

```js
// 1. Create a global signal for the counter's state.
const [count, setCount] = signal(0);

// 2. Create a functional component that uses the signal and h().
function Counter() {
  return h(
    'div',
    { class: 'container' },
    // Reading the signal here creates a reactive binding.
    h('h1', null, count),
    // Event listeners update the signal, triggering a re-render.
    h('button', { onClick: () => setCount(count() + 1) }, '+'),
    h('button', { onClick: () => setCount(count() - 1) }, '-')
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
