import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Grid, Typography, Box, Paper, Button, LinearProgress, Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import useGameStore from '../../store/gameStore';
import LifeBar from './LifeBar';
import WordCard from './WordCard';
import CategoryZone from './CategoryZone';
import ShareModal from './ShareModal';
import Confetti from './Confetti';
import type { Word } from '../../types';

const GameBoard: React.FC = () => {
  const timerRef = useRef<number | null>(null);
  const [tick, setTick] = useState(0);
  const [activeWord, setActiveWord] = useState<Word | null>(null);

  const {
    puzzle,
    lives,
    maxLives,
    selectedWords,
    categories,
    words,
    gameStatus,
    startTime,
    endTime,
    mistakes,
    loadPuzzle,
    selectWord,
    deselectWord,
    placeWord,
    submitCategory,
    resetGame,
    startTimer,
    stopTimer,
  } = useGameStore();

  // Dnd-kit sensors
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const sensors = useSensors(pointerSensor, keyboardSensor);

  // Timer
  useEffect(() => {
    if (gameStatus === 'playing') {
      startTimer();
      timerRef.current = window.setInterval(() => {
        setTick(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (gameStatus === 'won' || gameStatus === 'lost') {
        stopTimer();
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, startTimer, stopTimer]);

  // Display time
  const displayTime = useMemo(() => {
    if (!startTime) return '0:00';
    const end = endTime || Date.now();
    const seconds = Math.floor((end - startTime) / 1000);
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const secStr = sec < 10 ? `0${sec}` : `${sec}`;
    return `${min}:${secStr}`;
  }, [startTime, endTime, tick, gameStatus]);

  // Score
  const score = useMemo(() => {
    if (gameStatus !== 'won' || !startTime || !endTime) return 0;
    const timeSec = Math.floor((endTime - startTime) / 1000);
    const timeBonus = Math.max(0, 300 - timeSec) * 2;
    const mistakePenalty = mistakes * 50;
    const baseScore = 1000;
    return Math.max(0, baseScore + timeBonus - mistakePenalty);
  }, [gameStatus, startTime, endTime, mistakes]);

  // Load puzzle
  const { date } = useParams<{ date?: string }>();
  useEffect(() => {
    if (!puzzle) {
      import('../../data/puzzles').then(({ getPuzzleByDate }) => {
        loadPuzzle(getPuzzleByDate(date));
      });
    }
  }, [date, puzzle, loadPuzzle]);

  // Dnd-kit handlers
  const handleDragStart = (event: DragStartEvent) => {
    const wordId = event.active.id as string;
    const word = words.find(w => w.id === wordId);
    if (word) setActiveWord(word);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveWord(null);
    const { active, over } = event;
    if (!over) return;

    const wordId = active.id as string;
    // over.id = `zone-${categoryId}`
    const overId = over.id as string;
    if (overId.startsWith('zone-')) {
      const categoryId = overId.replace('zone-', '');
      placeWord(wordId, categoryId);
    }
  };

  // Click handler (fallback for non-drag)
  const handleWordClick = (wordId: string) => {
    if (selectedWords.includes(wordId)) {
      deselectWord(wordId);
    } else {
      selectWord(wordId);
    }
  };

  // Submit handler
  const handleSubmitCategory = (categoryId: string) => {
    submitCategory(categoryId);
  };

  // Remove word from category (drag back or click X)
  const handleRemoveFromCategory = (wordId: string) => {
    const category = categories.find(c => c.words.includes(wordId));
    if (category && !category.solved) {
      useGameStore.getState().removeWordFromCategory(wordId, category.id);
    }
  };

  // Word lookup map
  const wordMap = useMemo(() => {
    const map: Record<string, Word> = {};
    words.forEach(w => { map[w.id] = w; });
    return map;
  }, [words]);

  // ===================== RENDER =====================

  if (gameStatus === 'won') {
    return (
      <>
        <Confetti duration={5000} />
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2, color: 'success.main', fontWeight: 700 }}>
            🎉 You Won!
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 3 }}>
            <Chip label={`⏱ ${displayTime}`} color="primary" />
            <Chip label={`❌ Mistakes: ${mistakes}`} color="secondary" />
            <Chip label={`🏆 Score: ${score}`} color="success" />
          </Stack>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Great job solving today&apos;s puzzle!
          </Typography>
          <Button variant="contained" onClick={resetGame} sx={{ mr: 2 }}>
            Play Again
          </Button>
          <ShareModal score={score} time={displayTime} mistakes={mistakes} />
        </Container>
      </>
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container maxWidth="md" sx={{ py: 2 }}>
        {/* Header */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Sortle
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Chip label={`⏱ ${displayTime}`} size="small" />
            <LifeBar lives={lives} maxLives={maxLives} />
          </Stack>
        </Stack>

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
            <Grid size={{ xs: 12, sm: 6 }} key={category.id}>
              <CategoryZone
                category={category}
                placedWords={category.words}
                wordMap={wordMap}
                onDrop={(wordId: string) => placeWord(wordId, category.id)}
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
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            {words.filter(w => !w.placed).map(word => (
              <Grid key={word.id}>
                <WordCard
                  word={word}
                  onClick={handleWordClick}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
            {selectedWords.length} / 4 selected &nbsp;|&nbsp; Drag words to a category, or click to select
          </Typography>
        </Paper>

        {/* Submit buttons (fallback for non-drag users) */}
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

      {/* DragOverlay: shows a card preview while dragging */}
      <DragOverlay dropAnimation={null}>
        {activeWord ? (
          <Paper
            sx={{
              p: 1.5,
              textAlign: 'center',
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: 8,
              minWidth: 80,
            }}
          >
            {activeWord.text}
          </Paper>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default GameBoard;
