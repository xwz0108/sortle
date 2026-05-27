import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/dndUtils';

interface WordCardProps {
  id: string;
  text: string;
  selected: boolean;
  placed: boolean;
  locked: boolean;
  onClick: (id: string) => void;
}

const WordCard: React.FC<WordCardProps> = ({ id, text, selected, placed, locked, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.WORD,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !placed && !locked,
  });

  return (
    <Paper
      ref={dragRef}
      elevation={selected ? 8 : placed ? 0 : 2}
      onClick={() => !placed && !locked && onClick(id)}
      sx={{
        p: 1.5,
        textAlign: 'center',
        cursor: placed || locked ? 'default' : 'pointer',
        backgroundColor: selected ? 'primary.light' : placed ? 'grey.200' : 'white',
        color: selected ? 'white' : 'text.primary',
        opacity: isDragging ? 0.5 : 1,
        border: selected ? 2 : placed ? 0 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        borderRadius: 2,
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: !placed && !locked ? 'action.hover' : undefined,
        },
      }}
    >
      <Typography variant="body1" fontWeight={selected ? 700 : 400}>
        {text}
      </Typography>
    </Paper>
  );
};

export default WordCard;
