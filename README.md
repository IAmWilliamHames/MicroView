# MicroView - Build Views With JavaScript

A tiny component and state management framework built entirely with vanilla JavaScript.  
No React. No bundlers. No dependencies.

## Overview

MicroView explores what happens _under the hood_ of modern UI frameworks.  
It's less a product, more a proof of understanding.

- ✅ Class-based Components
- ✅ Reactive Global State
- ✅ Lifecycle Hooks (`afterMount`, `afterUpdate`)
- ✅ No tooling. Runs right in the browser

## Example

```js
class Counter extends Component {
  constructor() {
    super();
    this.state = { count: counterState.get() };
  }

  render() {
    return `
      <div>Count: ${this.state.count}</div>
      <button class="increment">+</button>
      <button class="decrement">-</div>
    `;
  }

  afterMount() {
    counterState.subscribe((c) => this.setState({ count: c }));
  }
}
```

## Why I Built This

Most of use frameworks without really understanding how they tick.  
So I built one, from scratch.

Writing this taught me:

- How reactivity actually works
- How components mount and re-render
- How global state connects separate views

It's about clarity, not complexity.

## Try It Out

Clone and open `app.js` in your browser:

```bash
git clone https://github.com/IAmWilliamHames/MicroView.git
cd MicroView
open app.js
```

You'll see a reactive counter built entirely from your own code.
