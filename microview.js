// State Management Class
class State {
  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = [];
  }

  get() {
    return this.value;
  }

  set(newValue) {
    this.value = newValue;
    this.subscribers.forEach((cb) => cb(newValue));
  }

  subscribe(cb) {
    this.subscribers.push(cb);
    return () => (this.subscribers = this.subscribers.filter((s) => s !== cb));
  }
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
