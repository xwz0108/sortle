import React from 'react';
import GameBoard from './GameBoard';

/**
 * GameProvider — thin wrapper (no longer needs react-dnd DndProvider
 * because GameBoard uses @dnd-kit internally).
 *
 * Kept as a named component so existing imports in Puzzle.tsx keep working.
 */
const GameProvider: React.FC = () => {
  return <GameBoard />;
};

export default GameProvider;
