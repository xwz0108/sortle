import type { Puzzle } from '../types';

// ===== Helper: pick puzzle by date (deterministic) =====
function pickPuzzle(dateStr: string): Puzzle {
  const puzzles = allPuzzles;
  // Simple deterministic hash from date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % puzzles.length;
  return puzzles[index]!;
}

export function getPuzzleByDate(date?: string): Puzzle {
  const dateStr = date || new Date().toISOString().split('T')[0]!;
  return pickPuzzle(dateStr);
}

// ===== All Puzzles =====
const allPuzzles: Puzzle[] = [
  // ===== Puzzle 1 =====
  {
    date: '2026-06-01',
    difficulty: 'medium',
    categories: [
      {
        id: 'cat-1-1',
        name: 'Things That Bounce',
        color: '#4CAF50',
        description: 'All bounce when dropped',
        words: ['BALL', 'TRAMPOLINE', 'SPRING', 'RUBBER'],
      },
      {
        id: 'cat-1-2',
        name: 'Types of Pasta',
        color: '#2196F3',
        description: 'They all belong in a pot',
        words: ['PENNE', 'LINGUINE', 'FARFALLE', 'RAVIOLI'],
      },
      {
        id: 'cat-1-3',
        name: 'Things That Are Frozen',
        color: '#FF9800',
        description: 'Cold stuff',
        words: ['ICE', 'YOGURT', 'PEAS', 'PIZZA'],
      },
      {
        id: 'cat-1-4',
        name: 'Starts With P',
        color: '#9C27B0',
        description: 'P-word things',
        words: ['PIANO', 'PURPLE', 'PLANET', 'PANCAKE'],
      },
    ],
    words: [
      { id: 'w1-1', text: 'BALL', categoryId: 'cat-1-1' },
      { id: 'w1-2', text: 'TRAMPOLINE', categoryId: 'cat-1-1' },
      { id: 'w1-3', text: 'SPRING', categoryId: 'cat-1-1' },
      { id: 'w1-4', text: 'RUBBER', categoryId: 'cat-1-1' },
      { id: 'w1-5', text: 'PENNE', categoryId: 'cat-1-2' },
      { id: 'w1-6', text: 'LINGUINE', categoryId: 'cat-1-2' },
      { id: 'w1-7', text: 'FARFALLE', categoryId: 'cat-1-2' },
      { id: 'w1-8', text: 'RAVIOLI', categoryId: 'cat-1-2' },
      { id: 'w1-9', text: 'ICE', categoryId: 'cat-1-3' },
      { id: 'w1-10', text: 'YOGURT', categoryId: 'cat-1-3' },
      { id: 'w1-11', text: 'PEAS', categoryId: 'cat-1-3' },
      { id: 'w1-12', text: 'PIZZA', categoryId: 'cat-1-3' },
      { id: 'w1-13', text: 'PIANO', categoryId: 'cat-1-4' },
      { id: 'w1-14', text: 'PURPLE', categoryId: 'cat-1-4' },
      { id: 'w1-15', text: 'PLANET', categoryId: 'cat-1-4' },
      { id: 'w1-16', text: 'PANCAKE', categoryId: 'cat-1-4' },
    ],
    hints: [
      'One group is full of carbs',
      'Something musical starts with P',
    ],
  },

  // ===== Puzzle 2 =====
  {
    date: '2026-06-02',
    difficulty: 'easy',
    categories: [
      {
        id: 'cat-2-1',
        name: 'Colors',
        color: '#4CAF50',
        description: 'Shades you can see',
        words: ['RED', 'BLUE', 'GREEN', 'YELLOW'],
      },
      {
        id: 'cat-2-2',
        name: 'Farm Animals',
        color: '#2196F3',
        description: 'Lives on a farm',
        words: ['COW', 'PIG', 'CHICKEN', 'SHEEP'],
      },
      {
        id: 'cat-2-3',
        name: 'School Supplies',
        color: '#FF9800',
        description: 'You need these at school',
        words: ['PENCIL', 'NOTEBOOK', 'ERASER', 'RULER'],
      },
      {
        id: 'cat-2-4',
        name: 'Things That Fly',
        color: '#9C27B0',
        description: 'Up in the air',
        words: ['BIRD', 'PLANE', 'KITE', 'ROCKET'],
      },
    ],
    words: [
      { id: 'w2-1', text: 'RED', categoryId: 'cat-2-1' },
      { id: 'w2-2', text: 'BLUE', categoryId: 'cat-2-1' },
      { id: 'w2-3', text: 'GREEN', categoryId: 'cat-2-1' },
      { id: 'w2-4', text: 'YELLOW', categoryId: 'cat-2-1' },
      { id: 'w2-5', text: 'COW', categoryId: 'cat-2-2' },
      { id: 'w2-6', text: 'PIG', categoryId: 'cat-2-2' },
      { id: 'w2-7', text: 'CHICKEN', categoryId: 'cat-2-2' },
      { id: 'w2-8', text: 'SHEEP', categoryId: 'cat-2-2' },
      { id: 'w2-9', text: 'PENCIL', categoryId: 'cat-2-3' },
      { id: 'w2-10', text: 'NOTEBOOK', categoryId: 'cat-2-3' },
      { id: 'w2-11', text: 'ERASER', categoryId: 'cat-2-3' },
      { id: 'w2-12', text: 'RULER', categoryId: 'cat-2-3' },
      { id: 'w2-13', text: 'BIRD', categoryId: 'cat-2-4' },
      { id: 'w2-14', text: 'PLANE', categoryId: 'cat-2-4' },
      { id: 'w2-15', text: 'KITE', categoryId: 'cat-2-4' },
      { id: 'w2-16', text: 'ROCKET', categoryId: 'cat-2-4' },
    ],
    hints: [
      'One group has four legs',
      'You can find these in a classroom',
    ],
  },

  // ===== Puzzle 3 =====
  {
    date: '2026-06-03',
    difficulty: 'hard',
    categories: [
      {
        id: 'cat-3-1',
        name: 'Things With Shells',
        color: '#4CAF50',
        description: 'Nature gave them armor',
        words: ['TURTLE', 'CRAB', 'SNAIL', 'CLAM'],
      },
      {
        id: 'cat-3-2',
        name: 'Shades of Blue',
        color: '#2196F3',
        description: 'All blue, in different ways',
        words: ['NAVY', 'TEAL', 'CYAN', 'COBALT'],
      },
      {
        id: 'cat-3-3',
        name: 'Things You Wear',
        color: '#FF9800',
        description: 'Put these on your body',
        words: ['HAT', 'SOCKS', 'GLOVES', 'SCARF'],
      },
      {
        id: 'cat-3-4',
        name: 'Planets',
        color: '#9C27B0',
        description: 'Celestial bodies orbiting the Sun',
        words: ['MARS', 'VENUS', 'SATURN', 'NEPTUNE'],
      },
    ],
    words: [
      { id: 'w3-1', text: 'TURTLE', categoryId: 'cat-3-1' },
      { id: 'w3-2', text: 'CRAB', categoryId: 'cat-3-1' },
      { id: 'w3-3', text: 'SNAIL', categoryId: 'cat-3-1' },
      { id: 'w3-4', text: 'CLAM', categoryId: 'cat-3-1' },
      { id: 'w3-5', text: 'NAVY', categoryId: 'cat-3-2' },
      { id: 'w3-6', text: 'TEAL', categoryId: 'cat-3-2' },
      { id: 'w3-7', text: 'CYAN', categoryId: 'cat-3-2' },
      { id: 'w3-8', text: 'COBALT', categoryId: 'cat-3-2' },
      { id: 'w3-9', text: 'HAT', categoryId: 'cat-3-3' },
      { id: 'w3-10', text: 'SOCKS', categoryId: 'cat-3-3' },
      { id: 'w3-11', text: 'GLOVES', categoryId: 'cat-3-3' },
      { id: 'w3-12', text: 'SCARF', categoryId: 'cat-3-3' },
      { id: 'w3-13', text: 'MARS', categoryId: 'cat-3-4' },
      { id: 'w3-14', text: 'VENUS', categoryId: 'cat-3-4' },
      { id: 'w3-15', text: 'SATURN', categoryId: 'cat-3-4' },
      { id: 'w3-16', text: 'NEPTUNE', categoryId: 'cat-3-4' },
    ],
    hints: [
      'One group crawls slowly',
      'One group is out of this world',
    ],
  },
];

export const samplePuzzle = allPuzzles[0]!;
