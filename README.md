# MicroView - Signal-Based JavaScript Reactivity

A tiny component and state management framework built entirely with vanilla JavaScript.  
No React. No bundlers. No dependencies.

## Overview

A tiny, **fully reactive** component and state management framework built entirely with vanilla JavaScript. MicroView uses Signals for efficient, modern state management.

- No React
- No Bundlers
- No Dependencies

## Overview

MicroView explores what happens under the hood of modern UI frameworks. and has been fully migrated to the Signals pattern for highly efficient, granular reactivity.

- ✅ Signal-Based Global State(`signal`, `effect`)
- ✅ Reactive Components (Auto-updates on signal changes)
- ✅ Class-based Components & Lifecycle Hooks (`afterMount`)
- ✅ Zero tooling. Runs right in the browser

## The Core Concept: Signals

Signals are the **only mechanism** for managing state in MicroView. They automatically track dependencies, eliminating the need for manual subscription management (like the old `State` class).

`signal(initialValue)`

Creates a reactive piece of state, returning a reader function and a writer function

```js
const [count, setCount] = signal(0);

// Read the value (automatically registers a dependency)
console.log(count()); //0

// Write the new value (triggers updates in all relevant effects)
setCount(count() + 1);
```

`effect(callback)`

Runs a function whenever any signal read inside of it changes. This powers the automatic re-rendering of our components.

```js
effect(() => {
  // This runs every time 'count' changes
  console.log(`The new count is ${count}`);
});
```

## Component Example: The Reactive Counter

The components extend the base component functionality using the `ReactiveComponent` class.  
This class automatically wraps its `render()` logic in an `effect()`, ensuring the component  
re-renders efficiently every time any signal it consumes changes.

```js
// Global State:
const [counter, setCounter] = signal(0);

class Counter extends ReactiveComponent {
  render() {
    // 1. Reading the signal here registers a dependency with the component's effect.
    const currentCount = counter();

    return `
            <div class="counter-display">Count: ${currentCount}</div>
            <button class="increment-btn">Increment</button>
        `;
  }

  afterMount() {
    // 2. We use afterMount() to attach DOM event listeners.
    this.element
      .querySelector('.increment-btn')
      .addEventListener('click', () => {
        // 3. Writing to the signal triggers a re-render of this component.
        setCounter(counter() + 1);
      });
  }
}
```

## Why I Built This

The full transition to signals demostrates the most elegant and efficient way to handle UI updates.

Writing this framework taught me:

- Granular Reactivity: How dependency tracking allows for minimal, targeted DOM updates.
- Simplified State Flow: State is managed purely through explicit `signal` functions, eliminating the need for complex object classes.
- Modern UI Pattern: How frameworks adopt reactivity to simplify developer workflow and enhance performance.

## Try It Out

Clone and open `index.html` in your browser:

```bash
git clone https://github.com/IAmWilliamHames/MicroView.git
cd MicroView
open app.js
```
