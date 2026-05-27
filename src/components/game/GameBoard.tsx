import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, Button, Alert, LinearProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import useGameStore from '../../store/gameStore';
import LifeBar from './LifeBar';
import WordCard from './WordCard';
import CategoryZone from './CategoryZone';
import ShareModal from './ShareModal';

const GameBoard: React.FC = () => {
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();
  
  const {
    puzzle,
    lives,
    maxLives,
    selectedWords,
    categories,
    words,
    gameStatus,
    startTime,
    loadPuzzle,
    selectWord,
    deselectWord,
    placeSelectedWords,
    submitCategory,
    resetGame,
  } = useGameStore();

  // Load puzzle on mount or date change
  useEffect(() => {
    // TODO: Load puzzle by date from /data/puzzles/{date}.json
    // For now, load sample puzzle
    if (!puzzle) {
      fetch('/data/puzzles/2026-06-01.json')
        .then(res => res.json())
        .then(data => loadPuzzle(data))
        .catch(err => console.error('Failed to load puzzle:', err));
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
    const result = submitCategory(categoryId);
    // Could show feedback toast here
    console.log('Category submit result:', result);
  };

  // Handle share
  const [shareOpen, setShareOpen] = React.useState(false);
  
  const handleShare = () => {
    setShareOpen(true);
  };

  const handlePlayAgain = () => {
    resetGame();
    // Reload same puzzle or next puzzle
    window.location.reload();
  };

  // Loading state
  if (!puzzle) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Loading puzzle...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Container>
    );
  }

  // Game over state (won or lost)
  if (gameStatus === 'won' || gameStatus === 'lost') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            {gameStatus === 'won' ? '🎉 You Won!' : '😢 Game Over'}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {gameStatus === 'won' 
              ? `You grouped all words with ${maxLives - lives} mistake(s)!`
              : 'Better luck next time!'}
          </Typography>

          {/* Show solutions */}
          <Box sx={{ mb: 3 }}>
            {categories.map(category => (
              <Box key={category.id} sx={{ mb: 2, p: 2, backgroundColor: category.color, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {category.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button variant="contained" onClick={handlePlayAgain} sx={{ mr: 2 }}>
            Play Again
          </Button>
          <Button variant="outlined" onClick={handleShare}>
            Share Results
          </Button>
        </Paper>

        <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {/* Header: Lives + Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <LifeBar lives={lives} maxLives={maxLives} />
        <Button variant="text" onClick={handleShare}>
          Share
        </Button>
      </Box>

      {/* Game Instructions */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
        Group the words into {categories.length} categories
      </Typography>

      {/* Word Pool (unplaced words) */}
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {words
          .filter(w => !w.placed)
          .map(word => (
            <Grid item xs={3} key={word.id}>
              <WordCard
                id={word.id}
                text={word.text}
                selected={word.selected}
                placed={word.placed}
                locked={word.locked}
                onClick={handleWordClick}
              />
            </Grid>
          ))}
      </Grid>

      {/* Category Zones */}
      <Grid container spacing={2}>
        {categories.map(category => (
          <Grid item xs={12} md={6} key={category.id}>
            <CategoryZone
              category={category}
              placedWords={category.words}
              wordTexts={Object.fromEntries(words.map(w => [w.id, w.text]))}
              onDrop={(catId) => placeSelectedWords(catId)}
              onRemoveWord={(wordId) => {
                // TODO: Implement removeWordFromCategory in store
                console.log('Remove word:', wordId);
              }}
            />
            
            {/* Submit Button (shown when category has 4 words) */}
            {category.words.length === 4 && !category.solved && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSubmitCategory(category.id)}
                sx={{ mt: 1 }}
              >
                Submit
              </Button>
            )}
          </Grid>
        ))}
      </Grid>

      {/* Selected Words Counter */}
      {selectedWords.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, mt: 3, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="body2">
            {selectedWords.length} word(s) selected. Click a category zone to place them.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default GameBoard;
