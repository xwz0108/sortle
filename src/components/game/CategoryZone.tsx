import React from 'react';
import { Paper, Typography, Box, Chip, Grid } from '@mui/material';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/dndUtils';
import { Category } from '../../types';

interface CategoryZoneProps {
  category: Category;
  placedWords: string[]; // word IDs
  wordTexts: { [key: string]: string }; // wordId -> text
  onDrop: (categoryId: string) => void;
  onRemoveWord: (wordId: string) => void;
}

const CategoryZone: React.FC<CategoryZoneProps> = ({
  category,
  placedWords: wordTexts,
  onDrop,
  onRemoveWord,
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.WORD,
    drop: () => onDrop(category.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Paper
      ref={category.solved ? undefined : dropRef}
      elevation={category.solved ? 0 : isOver ? 4 : 1}
      sx={{
        p: 2,
        minHeight: 100,
        backgroundColor: category.solved ? category.color : isOver ? 'action.hover' : 'background.paper',
        color: category.solved ? 'white' : 'text.primary',
        borderRadius: 3,
        border: 2,
        borderColor: category.solved ? category.color : isOver ? 'primary.main' : 'divider',
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
              label={wordTexts[wordId]}
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
