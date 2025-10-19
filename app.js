/** @jsx h */

// --- Global reactive signal ---
const [count, setCount] = signal(0);

// Counter Component
function Counter() {
  return (
    <div class="container">
      <h1>{count}</h1>
      <button onClick={() => setCount(count() + 1)}>+</button>
      <button onClick={() => setCount(count() - 1)}>-</button>
    </div>
  );
}

// Hero Component
function Hero(props) {
  return (
    <section class="hero">
      <h2>{props.header}</h2>
      <p>{props.description}</p>
      <Counter />
    </section>
  );
}

// --- Setup ---
mount(
  '#root',
  () => <Hero
    header="MicroView: Build Views With JavaScript"
    description="A tiny component and state management framework built entirely with vanilla JavaScript — now reactive with signals."
  />
);
