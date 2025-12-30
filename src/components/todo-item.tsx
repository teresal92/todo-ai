import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Todo } from "@/types";
import { Trash, Edit, Save } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onDelete,
  onToggleComplete,
}: TodoItemProps) {
  const { id, title, completed } = todo;
  const todoId = `todo-${id}`;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      key={id}
      className="flex items-center justify-between gap-3 rounded-sm p-4 outline-1"
    >
      {isEditing ? (
        <>
          <Input id={todoId} value={title} />
          <Label htmlFor={todoId} className="sr-only"></Label>
          <Button variant="ghost" aria-label="Save">
            {/* TODO: add ability to edit and save changes to TODO items */}
            <Save size={14} />
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
