import { useState } from 'react';
import { Button } from './components/ui/button';
import type { Todo } from './types';

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
  handleUpdateTodo: (id: string, updatedTodo: Todo) => void;
}

export default function TodoList({ todos, handleToggleTodo }: TodoListProps) {
  const [isInEditMode, setIsInEditMode] = useState<string[]>([]);

  function handleEditMode(id: string) {
    setIsInEditMode((prev) => [...prev, id]);
  }

  function isEditing(id: string) {
    return isInEditMode.find((todoId) => todoId === id);
  }

  return (
    <ol className="flex w-full flex-col space-y-4">
      {todos.map(({ id, title, completed }: Todo) => {
        const todoId = `todo-${id}`;

        return (
          <li
            key={id}
            className="flex items-center justify-between rounded-sm p-4 outline-1"
          >
            {isEditing(id) ? (
              <>
                <input value={title} />
                <Button variant="ghost" onClick={() => console.log('saving!')}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <label htmlFor={todoId}>
                  <input
                    type="checkbox"
                    checked={completed}
                    id={todoId}
                    onChange={() => handleToggleTodo(id)}
                    className="mr-2"
                  />
                  {title}
                </label>

                <Button variant="ghost" onClick={() => handleEditMode(id)}>
                  Edit
                </Button>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
