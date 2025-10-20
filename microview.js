import { createRoot, createEffect as effect } from './leom.js';

export function h(tag, props, ...children) {
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
