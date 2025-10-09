// Counter Component
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: counterState.get() }; // Sync with global state
  }

  render() {
    return `
      <div class="counter">Count: ${this.state.count}</div>
      <div class="counterBtnGroup">
        <button class="increment">+</button>
        <button class="decrement">-</button>
      </div>
    `;
  }

  afterMount() {
    counterState.subscribe((newCount) => this.setState({ count: newCount }));
    this.element.querySelector('.increment').addEventListener('click', () => {
      counterState.set(counterState.get() + 1);
    });
    this.element.querySelector('.decrement').addEventListener('click', () => {
      counterState.set(counterState.get() - 1);
    });
  }

  afterUpdate() {
    this.element.querySelector('.increment').addEventListener('click', () => {
      counterState.set(counterState.get() + 1);
    });
    this.element.querySelector('.decrement').addEventListener('click', () => {
      counterState.set(counterState.get() - 1);
    });
  }
}

// Hero Component
class Hero extends Component {
  constructor(props) {
    super(props);
  }

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

// Global state instance
const counterState = new State(0);

// Setup
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');
  if (!root) {
    console.error('No #root found');
    return;
  }

  new Hero({
    header: 'MicroView: Build Views With Javascript',
    description:
      'A tiny component and state management framework built entirely with vanilla JavaScript.',
  }).mount('#root');
});
