import type { Todo } from "@/types";
import TodoItem from "./todo-item";

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void;
}

export default function TodoList({ todos, handleToggleTodo }: TodoListProps) {
  // function handleEditChange(id: string, newTitle: string) {
  //   setEditState((prev) => {
  //     const next = new Map(prev);
  //     const editedTodo = next.get(id);
  //     if (editedTodo) {
  //       next.set(id, { ...editedTodo, title: newTitle });
  //     }
  //     return next;
  //   });
  // }
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No tasks yet. Add one above to get started
        </p>
      </div>
    );
  }

  return (
    <ol className="flex w-full flex-col space-y-4">
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ol>
  );
}
