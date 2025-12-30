import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Todo } from "@/types";
import { Trash, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
}

export default function TodoItem({
  todo,
  onDelete,
  onToggleComplete,
  onUpdate,
}: TodoItemProps) {
  const { id, title, completed } = todo;
  const todoId = `todo-${id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTodo, setPendingTodo] = useState<Partial<Todo>>({});

  const handleSave = () => {
    const timestamp = new Date().toISOString();

    const updatedTodo = {
      ...todo,
      ...(pendingTodo ?? {}),
      updatedAt: timestamp,
    };

    onUpdate(id, updatedTodo);
    setIsEditing(false);
    setPendingTodo({});
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <li
      key={id}
      className="flex items-center justify-between gap-2 rounded-sm p-4 outline-1"
    >
      {isEditing ? (
        <>
          <Label htmlFor={todoId} className="sr-only"></Label>
          <Input
            id={todoId}
            value={pendingTodo?.title ? pendingTodo.title : title}
            onChange={(e) => {
              setPendingTodo({
                ...todo,
                title: e.currentTarget.value,
              });
            }}
          />
          <Button variant="ghost" aria-label="Save" onClick={handleSave}>
            <Save size={14} />
          </Button>
          <Button variant="ghost" aria-label="Cancel" onClick={handleCancel}>
            <X size={14} />
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Checkbox
              id={todoId}
              checked={completed}
              onCheckedChange={() => onToggleComplete(id)}
            />
            <Label htmlFor={todoId}>{title}</Label>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Edit"
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onDelete(id)}
              aria-label="Delete"
            >
              <Trash size={14} />
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
