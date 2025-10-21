import { createMemo } from '../../src/leom.js';
import { h } from '../../src/microview.js';

/**
 * Component for a single To-Do item.
 * Manages its own reactive style based on the 'completed' signal.
 */
export function TodoItem({ todo, toggleTodo, removeTodo }) {
  // createMemo is used here to reactively calculate the style based on the 'completed' signal
  const textStyle = createMemo(() =>
    todo.completed() ? 'line-through' : 'none'
  );

  return h(
    'li',
    {
      style:
        'margin-bottom: 10px; padding: 8px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;',
    },
    // Reactive binding: textStyle() updates the style automatically
    h(
      'span',
      {
        onClick: toggleTodo,
        style: `flex-grow: 1; cursor: pointer; color: #333; text-decoration: ${textStyle()};`,
      },
      todo.text
    ),

    // Remove button
    h(
      'button',
      {
        onClick: removeTodo,
        style:
          'margin-left: 10px; background-color: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;',
      },
      'Remove'
    )
  );
}
