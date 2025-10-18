// Signal-based Reactivity Core
let currentEffect = null;

function signal(value) {
  const subscribers = new Set();

  const read = () => {
    if (currentEffect) subscribers.add(currentEffect);
    return value;
  };

  const write = (next) => {
    if (next === value) return;
    value = next;
    subscribers.forEach((fn) => fn());
  };

  return [read, write];
}

function effect(fn) {
  const wrapped = () => {
    currentEffect = wrapped;
    fn();
    currentEffect = null;
  };
  wrapped();
}

// Base Component Class
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  render() {
    return '<div>Override me</div>';
  }

  mount(selector) {
    this.element = document.querySelector(selector);
    if (!this.element) {
      console.error(`No element found for ${selector}`);
      return this;
    }
    this.element.innerHTML = this.render();
    this.afterMount();
    return this;
  }

  update() {
    if (this.element) {
      this.element.innerHTML = this.render();
      this.afterUpdate();
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  afterMount() {}
  afterUpdate() {}
}

// Reactive Component Class
class ReactiveComponent extends Component {
  mount(selector) {
    this.element = document.querySelector(selector);
    if (!this.element) {
      console.error(`No element found for ${selector}`);
      return this;
    }

    // Wrap render in an effect to auto-update on signal changes
    effect(() => {
      this.element.innerHTML = this.render();
      this.afterMount();
    });

    return this;
  }
}
