import { createSignal, createMemo } from '../../src/leom.js';
import { h } from '../../src/microview.js';
import { TodoItem } from '../components/TodoItem.js';

const todoList = createSignal([
  { id: 1, text: 'Build reactive component', completed: createSignal(false) },
  { id: 2, text: 'Add routing', completed: createSignal(true) },
]);
const newTodoText = createSignal('');

/**
 * Main To-Do Application Page Component.
 * Demonstrates complex state management and reactive list rendering.
 */
export function Todo() {
  const addTodo = () => {
    const text = newTodoText().trim();
    if (text) {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: createSignal(false),
      };
      todoList([newTodo, ...todoList()]);
      newTodoText('');
    }
  };

  const toggleTodo = (id) => {
    const todo = todoList().find((t) => t.id === id);
    if (todo) {
      todo.completed(!todo.completed());
    }
  };

  const removeTodo = (id) => {
    todoList(todoList().filter((t) => t.id !== id));
  };

  const remainingCount = createMemo(() => {
    return todoList().filter((todo) => !todo.completed()).length;
  });

  return h(
    'div',
    {
      style:
        'padding: 20px; max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
    },
    h(
      'h1',
      { style: 'color: steelblue; text-align: center; margin-bottom: 20px;' },
      'MicroView To-Do List'
    ),

    // Reactive binding for remaining count
    h(
      'p',
      { style: 'text-align: center; margin-bottom: 15px; color: #666;' },
      () => `Tasks remaining: ${remainingCount()}`
    ),

    // Input and Add button
    h(
      'div',
      { style: 'margin-bottom: 20px; display: flex;' },
      h('input', {
        type: 'text',
        placeholder: 'New task...',
        value: newTodoText(),
        onInput: (e) => newTodoText(e.target.value),
        onKeydown: (e) => {
          if (e.key === 'Enter') addTodo();
        },
        style:
          'flex-grow: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;',
      }),
      h(
        'button',
        {
          onClick: addTodo,
          style:
            'padding: 10px 15px; margin-left: 10px; background-color: steelblue; color: white; border: none; border-radius: 4px; cursor: pointer;',
        },
        'Add'
      )
    ),

    // Reactive List Rendering FIX:
    // The child of <ul> is a function that returns a single <div> element.
    // The list items are spread (`...`) as children of the <div>.
    h('ul', { style: 'list-style: none; padding: 0;' }, () =>
      h(
        'div', // Single wrapper element
        null,
        ...todoList().map((todo) =>
          h(TodoItem, {
            key: todo.id,
            todo: todo,
            toggleTodo: () => toggleTodo(todo.id),
            removeTodo: () => removeTodo(todo.id),
          })
        )
      )
    )
  );
}
