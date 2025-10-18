// --- Global reactive signal ---
const [count, setCount] = signal(0);

// Counter Component
class Counter extends ReactiveComponent {
  render() {
    return `
      <div class="counter">Count: ${count()}</div>
      <div class="counterBtnGroup">
        <button class="increment">+</button>
        <button class="decrement">-</button>
      </div>
    `;
  }

  afterMount() {
    this.element
      .querySelector('.increment')
      .addEventListener('click', () => setCount(count() + 1));

    this.element
      .querySelector('.decrement')
      .addEventListener('click', () => setCount(count() - 1));
  }
}

// Hero Component
class Hero extends ReactiveComponent {
  render() {
    return `
      <section class="hero">
        <h2>${this.props.header}</h2>
        <p>${this.props.description}</p>
        <div class="counter-mount"></div>
      </section>
    `;
  }

  afterMount() {
    new Counter().mount('.counter-mount');
  }
}

// --- Setup ---
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');
  if (!root) {
    console.error('No #root found');
    return;
  }

  new Hero({
    header: 'MicroView: Build Views With JavaScript',
    description:
      'A tiny component and state management framework built entirely with vanilla JavaScript — now reactive with signals.',
  }).mount('#root');
});
