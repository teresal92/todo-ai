import { Button } from "./components/ui/button";
import type { Todo } from "./types";

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
}

export default function TodoList({ todos, handleToggleTodo }: TodoListProps) {
  return (
    <ol className="flex w-full flex-col space-y-4">
      {todos.map(({ id, title, completed }: Todo) => {
        const todoId = `todo-${id}`;

        return (
          <li
            key={id}
            className="flex items-center justify-between rounded-sm p-4 outline-1"
          >
            <div>
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
            </div>
            <Button onClick={() => console.log("edit item")}>Edit</Button>
          </li>
        );
      })}
    </ol>
  );
}
