export interface Word {
  id: string;
  text: string;
  categoryId: string;
  selected: boolean;
  placed: boolean;
  locked: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description: string;
  words: string[]; // word IDs
  solved: boolean;
}

export interface Puzzle {
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
  categories: Category[];
  words: Word[];
  redHerrings: string[];
  hints: string[];
}

export interface GameState {
  puzzle: Puzzle | null;
  lives: number;
  maxLives: number;
  selectedWords: string[]; // word IDs
  categories: Category[];
  words: Word[];
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
  startTime: number | null;
  endTime: number | null;
  mistakes: number;
  hintsUsed: number;
  maxHints: number;
}
