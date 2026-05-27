import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Paper, Typography, Chip, Grid } from '@mui/material';
import type { Category, Word } from '../../types';

interface CategoryZoneProps {
  category: Category;
  placedWords: string[]; // word IDs
  wordMap: Record<string, Word>; // wordId -> Word
  onDrop: (wordId: string, categoryId: string) => void;
  onRemoveWord: (wordId: string) => void;
}

const CategoryZone: React.FC<CategoryZoneProps> = ({
  category,
  placedWords,
  wordMap,
  onDrop,
  onRemoveWord,
}) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `zone-${category.id}`,
    data: { categoryId: category.id, type: 'CATEGORY_ZONE' },
    disabled: category.solved,
  });

  const borderColor = category.solved
    ? category.color
    : isOver
      ? 'primary.main'
      : 'divider';

  const bgColor = category.solved
    ? category.color
    : isOver
      ? 'action.hover'
      : 'background.paper';

  return (
    <Paper
      ref={category.solved ? undefined : setNodeRef}
      elevation={category.solved ? 0 : isOver ? 4 : 1}
      sx={{
        p: 2,
        minHeight: 100,
        backgroundColor: bgColor,
        color: category.solved ? 'white' : 'text.primary',
        borderRadius: 3,
        border: 2,
        borderColor,
        opacity: category.solved ? 0.9 : 1,
        transition: 'all 0.2s',
      }}
    >
      {/* Category Name (shown when solved) */}
      {category.solved && (
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
          {category.name}
        </Typography>
      )}

      {/* Placed Words */}
      <Grid container spacing={1}>
        {placedWords.map((wordId) => (
          <Grid item key={wordId}>
            <Chip
              label={wordMap[wordId]?.text || wordId}
              onDelete={() => !category.solved && onRemoveWord(wordId)}
              sx={{
                backgroundColor: category.solved ? 'rgba(255,255,255,0.3)' : 'grey.100',
                color: category.solved ? 'white' : 'text.primary',
                fontWeight: 600,
                '& .MuiChip-deleteIcon': {
                  color: category.solved ? 'white' : 'text.secondary',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {placedWords.length === 0 && !category.solved && (
        <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 2 }}>
          Drop words here
        </Typography>
      )}
    </Paper>
  );
};

export default CategoryZone;
