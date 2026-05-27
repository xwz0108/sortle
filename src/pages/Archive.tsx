import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const Archive: React.FC = () => {
  // TODO: Load puzzle history from data/puzzles/
  const puzzles = [
    { date: '2026-06-01', difficulty: 'medium', completed: false },
    { date: '2026-05-31', difficulty: 'easy', completed: true },
    { date: '2026-05-30', difficulty: 'hard', completed: true },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Puzzle Archive
      </Typography>

      <Paper elevation={0} sx={{ borderRadius: 4 }}>
        <List>
          {puzzles.map((puzzle, index) => (
            <ListItem key={index} divider={index < puzzles.length - 1}>
              <ListItemText
                primary={puzzle.date}
                secondary={`Difficulty: ${puzzle.difficulty} | ${puzzle.completed ? 'Completed ✅' : 'Not played'}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Archive;
