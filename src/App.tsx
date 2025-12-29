import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { todos as TODO_PLACEHOLDER } from './data';
import type { Todo } from './types';
import TodoList from './todo-list';

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
  - Drag & Drop
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
  const [pendingTodo, setPendingTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>(TODO_PLACEHOLDER);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    setPendingTodo('');
  }

  function handleToggleTodo(id: string) {
    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
    });
  }

  return (
    <main className="bg-background flex min-h-screen max-w-6xl flex-col items-center gap-8 p-8 sm:p-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-medium">Todo AI</h1>
        <p className="text-muted-foreground">
          Add tasks naturally, let AI organize them
        </p>
      </div>

      {/* Todo Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-between gap-4 rounded-sm px-4 py-2 outline-1"
      >
        <input
          type="text"
          className="flex-1"
          value={pendingTodo}
          onChange={(e) => setPendingTodo(e.currentTarget.value)}
          placeholder="Add a task...(e.g. 'need to book dentist appointment next week')"
        />
        <Button type="submit">Add</Button>
      </form>

      <TodoList todos={todos} handleToggleTodo={handleToggleTodo} />
    </main>
  );
}

export default App;
