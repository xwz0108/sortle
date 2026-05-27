import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LifeBarProps {
  lives: number;
  maxLives: number;
}

const LifeBar: React.FC<LifeBarProps> = ({ lives, maxLives }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
        Lives:
      </Typography>
      
      {Array.from({ length: maxLives }, (_, index) => (
        <Tooltip key={index} title={index < lives ? 'Alive' : 'Lost'}>
          {index < lives ? (
            <FavoriteIcon sx={{ color: '#E91E63', fontSize: 28 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#BDBDBD', fontSize: 28 }} />
          )}
        </Tooltip>
      ))}
    </Box>
  );
};

export default LifeBar;
