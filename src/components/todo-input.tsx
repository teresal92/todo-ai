import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

export default function TodoInput({ onSubmit }: TodoInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      onSubmit(input);
      setInput('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="text"
          className="bg-card border-border h-14 pr-32 text-base"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Add a task...(e.g. 'need to book dentist appointment next week')"
        />
        <Button
          type="submit"
          className="absolute top-2 right-2 h-10"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add'}
        </Button>
      </div>
    </form>
  );
}
