# MicroView - A JSX-powered, Signal-Based UI Library

A tiny UI library for building reactive web applications with JSX and signals, built entirely with vanilla JavaScript. No bundlers or dependencies required.

## Features

-   **JSX Syntax:** Write components using familiar, declarative JSX.
-   **Signal-Based Reactivity:** State management is powered by an efficient and granular signal system (`signal`, `effect`).
-   **Functional Components:** Build your UI with simple, composable functions.
-   **Zero Tooling:** Runs directly in the browser with an in-browser JSX transpiler (Babel). No build step needed for development.

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

### 2. JSX for Declarative UI

MicroView uses JSX to define the structure of your components. To enable JSX transpilation in the browser, you must include a `/** @jsx h */` pragma at the top of your file. This tells Babel to use our custom `h` function to convert JSX into DOM elements.

```js
/** @jsx h */

function Greeting() {
	return <h1>Hello, World!</h1>;
}
```

The `h` function handles creating elements, assigning properties (like `class` or `id`), and attaching event listeners (like `onClick`).

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
/** @jsx h */

// 1. Create a global signal for the counter's state.
const [count, setCount] = signal(0);

// 2. Create a functional component that uses the signal.
function Counter() {
	return (
		<div class="container">
			{/* Reading the signal here creates a reactive binding. */}
			<h1>{count}</h1>

			{/* Event listeners update the signal, triggering a re-render. */}
			<button onClick={() => setCount(count() + 1)}>+</button>
			<button onClick={() => setCount(count() - 1)}>-</button>
		</div>
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
2.  Because the in-browser Babel transpiler needs to fetch your script, you must serve the files from a local web server to avoid CORS errors. The easiest way is with Python:
    ```bash
    python -m http.server
    ```
3.  Open your browser and navigate to `http://localhost:8000`.
