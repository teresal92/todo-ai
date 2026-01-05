import type { Todo } from '@/types';
import TodoItem from './todo-item';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
}

export default function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No tasks yet. Add one above to get started
        </p>
      </div>
    );
  }

  return (
    <ol className="flex w-full flex-col space-y-4">
      {todos.map((todo: Todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
          />
        );
      })}
    </ol>
  );
}
