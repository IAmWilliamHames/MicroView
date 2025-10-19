// --- Signal-based Reactivity Core with Cleanup ---
let ActiveEffect = null; // The currently running effect
let Scope = null;      // The current scope owner

function signal(value) {
    const subscribers = new Set();
    const read = () => {
        if (ActiveEffect) {
            subscribers.add(ActiveEffect);
            // An effect needs to know its sources to unsubscribe from them.
            ActiveEffect.sources.add(subscribers);
        }
        return value;
    };
    const write = (next) => {
        if (Object.is(value, next)) return;
        value = next;
        // Run all subscribed effects
        for (const sub of [...subscribers]) {
            sub.run();
        }
    };
    return [read, write];
}

// Disposes of an effect, unsubscribing it from all sources and running its cleanups.
function cleanupEffect(effect) {
    // Unsubscribe from all signal sources
    for (const source of effect.sources) {
        source.delete(effect);
    }
    effect.sources.clear();

    // Dispose of any child effects
    if (effect.owned) {
        for (const child of effect.owned) {
            cleanupEffect(child);
        }
        effect.owned = [];
    }

    // Run any user-defined cleanup functions
    for (const cleanupFn of effect.cleanups) {
        cleanupFn();
    }
    effect.cleanups = [];
}

function effect(fn) {
    const effect = {
        fn,
        sources: new Set(),
        cleanups: [],
        owned: [],
        owner: Scope,
        run() {
            // Before running, clean up any previous state of this effect.
            cleanupEffect(this);

            // Set this effect as the currently active one
            const prevEffect = ActiveEffect;
            const prevScope = Scope;
            ActiveEffect = this;
            Scope = this;
            try {
                this.fn();
            } finally {
                // Restore the previous state
                ActiveEffect = prevEffect;
                Scope = prevScope;
            }
        }
    };

    if (Scope) {
        Scope.owned.push(effect);
    }

    // When the parent scope is cleaned up, this effect must also be cleaned up.
    onCleanup(() => cleanupEffect(effect));

    effect.run();
}


// Registers a cleanup function to the current scope.
function onCleanup(fn) {
    if (Scope) {
        Scope.cleanups.push(fn);
    }
}

// Creates a root, non-tracked scope that can be manually disposed.
function createRoot(fn) {
    const root = {
        owned: [],
        cleanups: [],
        dispose: () => {
            // Dispose of all owned effects and run all cleanups.
            if (root.owned) {
                for(const child of root.owned) {
                    cleanupEffect(child);
                }
                root.owned = [];
            }
             for (const cleanupFn of root.cleanups) {
                cleanupFn();
            }
            root.cleanups = [];
        }
    };

    // Run the given function within the new root scope
    const prevScope = Scope;
    Scope = root;
    try {
        // Pass the dispose function to the user
        fn(root.dispose);
    } finally {
        Scope = prevScope;
    }

    return root.dispose;
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

    let dispose;
    createRoot((disposer) => {
        dispose = disposer;
        target.appendChild(component());
    });

    return dispose;
}
