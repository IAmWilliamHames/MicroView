import { createRoot, createEffect as effect } from './leom.js';

export function h(tag, props, ...children) {
  if (typeof tag === 'function') {
    return tag({ ...(props || {}), children });
  }

  const el = document.createElement(tag);

  for (const key in props) {
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), props[key]);
    } else if (key === 'value' || key === 'checked') {
      // Use DOM property assignment for 'value' and 'checked'
      el[key] = props[key];
    } else {
      el.setAttribute(key, props[key]);
    }
  }

  children.flat().forEach((child) => {
    if (child instanceof HTMLElement) {
      el.appendChild(child);
    } else if (typeof child === 'function') {
      // Handle signals/memos
      let activeNode = document.createTextNode('');
      el.appendChild(activeNode);
      effect(() => {
        let value = child();
        let newNode;

        // If a signal returns a function, it's a component function; execute it.
        if (typeof value === 'function') {
          value = value();
        }

        if (value instanceof HTMLElement) {
          newNode = value;
        } else {
          newNode = document.createTextNode(String(value));
        }

        if (activeNode.parentNode) {
          activeNode.parentNode.replaceChild(newNode, activeNode);
        }
        activeNode = newNode;
      });
    } else if (child !== null && child !== undefined) {
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
}

export function mount(selector, component) {
  const target = document.querySelector(selector);
  if (!target) {
    throw new Error(`[mount] No element found for selector: ${selector}`);
  }

  let dispose;
  createRoot((disposer) => {
    dispose = disposer;
    target.appendChild(component());
  });

  return dispose;
}
