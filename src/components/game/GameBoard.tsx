import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, Button, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGameStore from '../../store/gameStore';
import LifeBar from './LifeBar';
import WordCard from './WordCard';
import CategoryZone from './CategoryZone';
import ShareModal from './ShareModal';

const GameBoard: React.FC = () => {
  const { date } = useParams<{ date?: string }>();

  const {
    puzzle,
    lives,
    maxLives,
    selectedWords,
    categories,
    words,
    gameStatus,
    loadPuzzle,
    selectWord,
    deselectWord,
    placeSelectedWords,
    submitCategory,
    resetGame,
  } = useGameStore();

  // Load puzzle on mount or date change
  useEffect(() => {
    // Puzzle is loaded by Puzzle.tsx; this is a fallback
    if (!puzzle) {
      import('../../data/puzzles').then(({ getPuzzleByDate }) => {
        loadPuzzle(getPuzzleByDate(date));
      });
    }
  }, [date, puzzle, loadPuzzle]);

  // Handle word click (select/deselect)
  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId)) {
      deselectWord(wordId);
    } else {
      selectWord(wordId);
    }
  };

  // Handle submit category
  const handleSubmitCategory = (categoryId: string) => {
    submitCategory(categoryId);
  };

  // Handle drag-and-drop (from CategoryZone back to word pool)
  const handleRemoveFromCategory = (wordId: string, categoryId: string) => {
    // Not implemented in current store - could be added
    console.log('Remove', wordId, 'from', categoryId);
  };

  // Game over states
  if (gameStatus === 'won') {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, color: 'success.main', fontWeight: 700 }}>
          You Won!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Great job solving today&apos;s puzzle!
        </Typography>
        <Button variant="contained" onClick={resetGame} sx={{ mr: 2 }}>
          Play Again
        </Button>
        <ShareModal />
      </Container>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, color: 'error.main', fontWeight: 700 }}>
          Game Over
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You ran out of lives. Better luck next time!
        </Typography>
        <Button variant="contained" onClick={resetGame}>
          Try Again
        </Button>
      </Container>
    );
  }

  if (!puzzle) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <LinearProgress />
        <Typography sx={{ mt: 2 }}>Loading puzzle...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {/* Lives */}
      <LifeBar lives={lives} maxLives={maxLives} />

      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Progress: {categories.filter(c => c.solved).length} / {categories.length} categories solved
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(categories.filter(c => c.solved).length / categories.length) * 100}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* Category Zones */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {categories.map(category => (
          <Grid item xs={12} sm={6} key={category.id}>
            <CategoryZone
              category={category}
              placedWords={category.words}
              wordTexts={words}
              onDrop={(wordId: string) => placeSelectedWords(category.id)}
              onRemoveWord={handleRemoveFromCategory}
            />
          </Grid>
        ))}
      </Grid>

      {/* Word Pool */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Select 4 words that belong together
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {words.map(word => (
            <Grid item key={word.id}>
              <WordCard
                word={word}
                selected={word.selected}
                onClick={() => handleWordClick(word.id)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Selected count */}
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          {selectedWords.length} / 4 selected
        </Typography>
      </Paper>

      {/* Submit buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        {categories.map(category => (
          <Button
            key={category.id}
            variant="contained"
            disabled={category.solved || selectedWords.length !== 4}
            onClick={() => handleSubmitCategory(category.id)}
            sx={{
              backgroundColor: category.color,
              '&:hover': { backgroundColor: category.color, opacity: 0.9 },
              '&:disabled': { backgroundColor: 'grey.300' },
            }}
          >
            Submit {category.name}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default GameBoard;
