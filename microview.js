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

function h(tag, props, ...children) {
  if (typeof tag === 'function') {
    return tag({ ...(props || {}), children });
  }

  const el = document.createElement(tag);

  for (const key in props) {
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), props[key]);
    } else {
      el.setAttribute(key, props[key]);
    }
  }

  children.flat().forEach((child) => {
    if (child instanceof HTMLElement) {
      el.appendChild(child);
    } else if (typeof child === 'function') {
      const textNode = document.createTextNode('');
      el.appendChild(textNode);
      effect(() => {
        textNode.nodeValue = child();
      });
    } else if (child !== null && child !== undefined) {
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
}

function mount(selector, component) {
  const target = document.querySelector(selector);
  if (!target) {
    throw new Error(`[mount] No element found for selector: ${selector}`);
  }
  target.appendChild(component());
}
