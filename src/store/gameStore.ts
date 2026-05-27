import { create } from 'zustand';
import type { RawPuzzle, GameState } from '../types';

interface GameStore extends GameState {
  loadPuzzle: (puzzle: RawPuzzle) => void;
  selectWord: (wordId: string) => void;
  deselectWord: (wordId: string) => void;
  placeSelectedWords: (categoryId: string) => boolean;
  placeWord: (wordId: string, categoryId: string) => void;
  removeWordFromCategory: (wordId: string, categoryId: string) => void;
  submitCategory: (categoryId: string) => boolean;
  useHint: () => string | null;
  resetGame: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}

const useGameStore = create<GameStore>()((set, get) => ({
  // Initial state
  puzzle: null,
  lives: 4,
  maxLives: 4,
  selectedWords: [],
  categories: [],
  words: [],
  gameStatus: 'idle',
  startTime: null,
  endTime: null,
  mistakes: 0,
  hintsUsed: 0,
  maxHints: 2,

  // Load puzzle
  loadPuzzle: (puzzle: RawPuzzle) => {
    const words = puzzle.words.map(w => ({
      ...w,
      selected: false,
      placed: false,
      locked: false,
    }));

    const categories = puzzle.categories.map(c => ({
      ...c,
      words: [],
      solved: false,
    }));

    set({
      puzzle,
      words,
      categories,
      lives: get().maxLives,
      selectedWords: [],
      gameStatus: 'playing',
      startTime: Date.now(),
      endTime: null,
      mistakes: 0,
      hintsUsed: 0,
    });
  },

  // Select word
  selectWord: (wordId: string) => {
    const { words, selectedWords } = get();

    if (selectedWords.includes(wordId)) {
      set({
        words: words.map(w => w.id === wordId ? { ...w, selected: false } : w),
        selectedWords: selectedWords.filter(id => id !== wordId),
      });
      return;
    }

    let newSelected = [...selectedWords];
    if (newSelected.length >= 4) {
      const oldestId = newSelected[0];
      newSelected = newSelected.slice(1);
      set({
        words: words.map(w => w.id === oldestId ? { ...w, selected: false } : w),
      });
    }

    newSelected.push(wordId);
    set({
      words: words.map(w => w.id === wordId ? { ...w, selected: true } : w),
      selectedWords: newSelected,
    });
  },

  // Deselect word
  deselectWord: (wordId: string) => {
    const { words } = get();
    set({
      words: words.map(w => w.id === wordId ? { ...w, selected: false } : w),
      selectedWords: get().selectedWords.filter(id => id !== wordId),
    });
  },

  // Place selected words into category
  placeSelectedWords: (categoryId: string) => {
    const { selectedWords, words, categories } = get();

    if (selectedWords.length === 0) return false;

    const updatedWords = words.map(w =>
      selectedWords.includes(w.id) ? { ...w, selected: false, placed: true } : w
    );

    const updatedCategories = categories.map(c =>
      c.id === categoryId ? { ...c, words: [...c.words, ...selectedWords] } : c
    );

    set({
      words: updatedWords,
      categories: updatedCategories,
      selectedWords: [],
    });

    return true;
  },

  // Remove word from category
  removeWordFromCategory: (wordId: string, categoryId: string) => {
    const { words, categories } = get();

    const updatedWords = words.map(w =>
      w.id === wordId ? { ...w, placed: false } : w
    );

    const updatedCategories = categories.map(c =>
      c.id === categoryId ? { ...c, words: c.words.filter(id => id !== wordId) } : c
    );

    set({
      words: updatedWords,
      categories: updatedCategories,
    });
  },

  // Submit category for checking
  submitCategory: (categoryId: string) => {
    const { categories, words, lives } = get();
    const category = categories.find(c => c.id === categoryId);

    if (!category || category.words.length === 0) return false;

    const correctWords = category.words.filter(wordId => {
      const correctCategory = get().puzzle?.categories.find(c => c.id === categoryId);
      return correctCategory?.words.includes(wordId);
    });

    const isCorrect = correctWords.length === category.words.length;

    if (isCorrect) {
      const updatedCategories = categories.map(c =>
        c.id === categoryId ? { ...c, solved: true } : c
      );

      set({ categories: updatedCategories });

      const allSolved = updatedCategories.every(c => c.solved);
      if (allSolved) {
        set({
          gameStatus: 'won',
          endTime: Date.now(),
        });
      }

      return true;
    } else {
      const newLives = lives - 1;
      set({
        lives: newLives,
        mistakes: get().mistakes + 1,
      });

      if (newLives <= 0) {
        set({
          gameStatus: 'lost',
          endTime: Date.now(),
        });
      }

      const updatedWords = words.map(w =>
        category.words.includes(w.id) ? { ...w, placed: false } : w
      );

      const updatedCategories = categories.map(c =>
        c.id === categoryId ? { ...c, words: [] } : c
      );

      set({
        words: updatedWords,
        categories: updatedCategories,
      });

      return false;
    }
  },

  // Use hint
  useHint: () => {
    const { hintsUsed, maxHints, puzzle } = get();

    if (!puzzle || hintsUsed >= maxHints) return null;

    const hint = puzzle.hints[hintsUsed] || null;
    set({ hintsUsed: hintsUsed + 1 });
    return hint;
  },

  // Reset game
  resetGame: () => {
    set({
      puzzle: null,
      lives: 4,
      selectedWords: [],
      categories: [],
      words: [],
      gameStatus: 'idle',
      startTime: null,
      endTime: null,
      mistakes: 0,
      hintsUsed: 0,
    });
  },

  // Timer
  startTimer: () => {
    set({ startTime: Date.now() });
  },

  stopTimer: () => {
    set({ endTime: Date.now() });
  },

  // Place single word into category (drag-and-drop)
  placeWord: (wordId: string, categoryId: string) => {
    const { words, categories, selectedWords } = get();
    const word = words.find(w => w.id === wordId);
    if (!word || word.placed || word.locked) return;

    const updatedWords = words.map(w =>
      w.id === wordId ? { ...w, selected: false, placed: true } : w
    );

    const updatedCategories = categories.map(c =>
      c.id === categoryId ? { ...c, words: [...c.words, wordId] } : c
    );

    set({
      words: updatedWords,
      categories: updatedCategories,
      selectedWords: selectedWords.filter(id => id !== wordId),
    });
  },
}));

export default useGameStore;
