import { createRoot, createEffect as effect } from './leom.js';

/**
 * @file Microview - A lightweight library for creating reactive user interfaces.
 */

/**
 * A hyperscript-style function for creating DOM elements and components.
 * It handles static and reactive (signal/memo) props and children.
 *
 * @param {string|function} tag - The HTML tag name (e.g., 'div') or a component function.
 * @param {object} [props] - An object of attributes and event listeners.
 * @param {...(HTMLElement|string|number|function)} children - The children to append to the element.
 * @returns {HTMLElement} The created DOM element.
 * @example
 * // Static element
 * h('h1', { class: 'title' }, 'Hello, World!');
 *
 * // Reactive element
 * const count = createSignal(0);
 * h('p', {}, 'Count: ', count);
 *
 * // Component
 * const MyComponent = ({ greeting }) => h('p', {}, greeting);
 * h(MyComponent, { greeting: 'Welcome' });
 */
export function h(tag, props, ...children) {
  // If the tag is a function, it's a component.
  if (typeof tag === 'function') {
    return tag({ ...(props || {}), children });
  }

  const el = document.createElement(tag);

  // Set attributes and event listeners
  for (const key in props) {
    const value = props[key];

    if (key.startsWith('on')) {
      // Event listeners
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (typeof value === 'function') {
      // Reactive attributes (signals/memos)
      effect(() => {
        const reactiveValue = value();
        if (key === 'value' || key === 'checked') {
          // Use direct property assignment for form elements
          el[key] = reactiveValue;
        } else {
          el.setAttribute(key, reactiveValue);
        }
      });
    } else {
      // Static attributes
      if (key === 'value' || key === 'checked') {
        el[key] = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // Append children
  children.flat().forEach((child) => {
    if (child instanceof HTMLElement) {
      el.appendChild(child);
    } else if (typeof child === 'function') {
      // Reactive children (signals/memos)
      let activeNode = document.createTextNode('');
      el.appendChild(activeNode);
      effect(() => {
        let value = child();
        let newNode;

        // Handle nested components returned from signals
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
      // Static text nodes
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
}

/**
 * Mounts a component to a DOM element specified by a selector.
 *
 * @param {string} selector - The CSS selector of the target element.
 * @param {function(): HTMLElement} component - The root component function to render.
 * @returns {function(): void} A dispose function to unmount the component and clean up reactivity.
 * @throws {Error} If no element is found for the given selector.
 * @example
 * const App = () => h('div', {}, 'My App');
 * const dispose = mount('#app', App);
 *
 * // To unmount
 * dispose();
 */
export function mount(selector, component) {
  const target = document.querySelector(selector);
  if (!target) {
    throw new Error(`[mount] No element found for selector: ${selector}`);
  }

  let dispose;
  createRoot((disposer) => {
    dispose = disposer;
    target.innerHTML = ''; // Clear the target element
    target.appendChild(component());
  });

  return dispose;
}
