// --- Global reactive signal ---
const [count, setCount] = signal(0);

// Counter Component
function Counter() {
  return h(
    'div',
    { class: 'container' },
    h('h1', null, count),
    h('button', { onClick: () => setCount(count() + 1) }, '+'),
    h('button', { onClick: () => setCount(count() - 1) }, '-')
  );
}

// Hero Component
function Hero(props) {
  return h(
    'section',
    { class: 'hero' },
    h('h2', null, props.header),
    h('p', null, props.description),
    h(Counter)
  );
}

// --- Setup ---
mount(
  '#root',
  () => h(Hero, {
    header: "MicroView: Build Views With JavaScript",
    description: "A tiny component and state management framework built entirely with vanilla JavaScript — now reactive with signals."
  })
);
