import React from 'react';
import { Container, Typography, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import GameProvider from '../components/game/GameProvider';
import useGameStore from '../store/gameStore';
import { getPuzzleByDate } from '../data/puzzles';

const Puzzle: React.FC = () => {
  const { date } = useParams<{ date?: string }>();
  const { loadPuzzle, puzzle, gameStatus } = useGameStore();

  // Load puzzle on mount
  React.useEffect(() => {
    const puzzleData = getPuzzleByDate(date);
    loadPuzzle(puzzleData);
  }, [date, loadPuzzle]);

  // Loading state
  if (!puzzle) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Loading puzzle...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Container>
    );
  }

  // Game over state (handled in GameBoard)
  if (gameStatus === 'won' || gameStatus === 'lost') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <GameProvider />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {/* Date display */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
        {new Date(puzzle.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Typography>

      {/* Difficulty chip */}
      <Typography variant="body2" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}>
        Difficulty: {puzzle.difficulty}
      </Typography>

      {/* Game */}
      <GameProvider />
    </Container>
  );
};

export default Puzzle;
