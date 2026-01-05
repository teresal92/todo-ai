import { useState } from 'react';
import './App.css';
import TodoList from '@/components/todo-list';
import TodoInput from '@/components/todo-input';
import { todos as TODO_PLACEHOLDER } from './data';
import type { Todo } from './types';

/*
App Scaffolding

App Layout
- Wrapper that centers all items
- Title
- Subtitle

Todo Form
- Text Input - user resonse
- Add Button - user response

Todo List
- Todo Items
  - Task Title
  - Category Badges
  - Checkbox to mark complete / not complete
  - Drag & Drop (future)
  - Edit Button with In-line Edit Form (simple)
  - AI Edit button

TODO: Confirmation Dialog
- Text Input (disabled): Original Input => will be pre-populated from original
- Text Input: Task Title (disabled)  => will be populated from AI response
- Category (disabled) => will be populated from AI response
- Action Buttons
  - Cancel
  - Retry AI -> recall function with original input
  - Edit Manually:
    - Text Input (disabled): Original Input => will be pre-populated from original
    - Text Input: Task Title (editable)  => will be populated from AI response
    - Category (drop down select) => will be populated from AI response
    - Back Button
    - Save Changes Button
  - Approve & Save Button

*/

function App() {
  const [todos, setTodos] = useState<Todo[]>(TODO_PLACEHOLDER);

  const onSubmit = (pendingTodo: string) => {
    setTodos((prev) => {
      const timestamp = new Date().toISOString();

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: pendingTodo,
        category: 'Work',
        completed: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      return [...prev, newTodo];
    });
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id: string, updatedTodo: Partial<Todo>) => {
    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updatedTodo,
            }
          : todo,
      );
    });
  };

  return (
    <main className="bg-background px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Todo AI</h1>
          <p className="text-muted-foreground">
            Add tasks naturally, let AI organize them
          </p>
        </div>
        <TodoInput onSubmit={onSubmit} />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  );
}

export default App;
