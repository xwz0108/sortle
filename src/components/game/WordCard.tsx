import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography } from '@mui/material';
import type { Word } from '../../types';

interface WordCardProps {
  word: Word;
  onClick: (id: string) => void;
  shake?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, onClick, shake }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: word.id,
      data: { type: 'WORD', word },
      disabled: word.placed || word.locked,
    });

  const dragStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  const paperSx = {
    p: 1.5,
    textAlign: 'center' as const,
    cursor: word.placed || word.locked ? 'default' : 'grab',
    backgroundColor: word.selected
      ? 'primary.light'
      : word.placed
        ? 'grey.200'
        : 'white',
    color: word.selected ? 'white' : 'text.primary',
    border: word.selected ? 2 : word.placed ? 0 : 1,
    borderColor: word.selected ? 'primary.main' : 'divider',
    borderRadius: 2,
    transition: 'all 0.2s',
    userSelect: 'none' as const,
    animation: shake ? 'shake 0.5s ease-in-out' : 'none',
    '&:hover': {
      backgroundColor:
        !word.placed && !word.locked ? 'action.hover' : undefined,
    },
    '@keyframes shake': {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
      '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ position: 'relative' }}
    >
      <div ref={setNodeRef} style={dragStyle} {...listeners} {...attributes}>
        <Paper
          elevation={word.selected ? 8 : word.placed ? 0 : 2}
          onClick={() => !word.placed && !word.locked && onClick(word.id)}
          sx={paperSx}
        >
          <Typography variant="body1" fontWeight={word.selected ? 700 : 400}>
            {word.text}
          </Typography>
        </Paper>
      </div>
    </motion.div>
  );
};

export default WordCard;
