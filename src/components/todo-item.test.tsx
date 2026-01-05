/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach } from 'vitest';

import TodoItem from './todo-item';
import type { Todo } from '@/types';

const TODO_ITEM: Todo = {
  id: 'todo-001',
  title: 'Initial test task',
  category: 'Work',
  completed: false,
  createdAt: '2025-01-05T16:30:00Z',
  updatedAt: '2025-01-05T16:30:00Z',
};

const onUpdate = vi.fn();
const onDelete = vi.fn();
const onToggleComplete = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('TodoItem', () => {
  it('renders task title, checkbox, and action buttons', () => {
    render(
      <ol>
        <TodoItem
          todo={TODO_ITEM}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </ol>,
    );

    // Title visible
    expect(screen.getByText('Initial test task')).toBeInTheDocument();

    // Checkbox exists

    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    // Button exists (accessible labels)
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should render text input with seeded initial task and should save new task', async () => {
    const user = userEvent.setup();
    const initialTask = 'Initial test task';
    const newTask = 'New task!';

    render(
      <ol>
        <TodoItem
          todo={TODO_ITEM}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </ol>,
    );

    // Click edit button
    await user.click(screen.getByRole('button', { name: /edit/i }));

    // Text input exists and has seeded text
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialTask);

    // Save Button exists
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();

    // Clear input
    await user.clear(input);

    // Type in new task
    await user.type(input, newTask);
    expect(input).toHaveValue(newTask);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onUpdate).toHaveBeenCalledWith(
      TODO_ITEM.id,
      expect.objectContaining({ id: TODO_ITEM.id, title: newTask }),
    );
  });

  it('should call onToggleComplete when checkbox is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ol>
        <TodoItem
          todo={TODO_ITEM}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </ol>,
    );

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledOnce();
  });
});
