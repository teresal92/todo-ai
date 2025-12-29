export type Category =
  | 'Work'
  | 'Personal'
  | 'Errands'
  | 'Health'
  | 'Learning'
  | 'Other';

export interface Todo {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  createdAt: string; // UTC timestamp
  updatedAt: string; // UTC timestamp
}
