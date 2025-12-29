import type { Todo } from "./types";

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
}

export default function TodoList({ todos, handleToggleTodo }: TodoListProps) {
  return (
    <ol className="flex w-full flex-col gap-4">
      {todos.map(({ id, title, completed }: Todo) => {
        const todoId = `todo-${id}`;

        return (
          <li key={id}>
            <input
              type="checkbox"
              checked={completed}
              id={todoId}
              onChange={() => handleToggleTodo(id)}
            />
            <label htmlFor={todoId}>{title}</label>
          </li>
        );
      })}
    </ol>
  );
}
