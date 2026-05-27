import React, { useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField } from '@mui/material';
import useGameStore from '../../store/gameStore';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose }) => {
  const { puzzle, lives, maxLives, gameStatus, startTime, endTime, mistakes } = useGameStore();
  
  const generateShareText = useCallback(() => {
    if (!puzzle) return '';

    const date = new Date(puzzle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const timeStr = startTime && endTime 
      ? `⏱️ ${Math.floor((endTime - startTime) / 1000 / 60)}:${(Math.floor((endTime - startTime) / 1000) % 60).toString().padStart(2, '0')}`
      : '';

    // Generate emoji grid (simplified - just show lives left)
    const emojis = Array.from({ length: maxLives }, (_, i) => i < lives ? '❤️' : '🖤').join('');

    return `Sortle #${puzzle.date}\n${emojis}\n${timeStr}\n\nCan you beat me? https://sortle.xxddsses.com`;
  }, [puzzle, lives, maxLives, startTime, endTime]);

  const handleCopy = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Your Result</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            {gameStatus === 'won' ? '🎉 You Won!' : '😢 Game Over'}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {gameStatus === 'won' 
              ? `You grouped all words with ${mistakes} mistake(s)!`
              : 'Better luck next time!'}
          </Typography>

          {/* Preview */}
          <TextField
            multiline
            fullWidth
            rows={6}
            value={generateShareText()}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2, '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleCopy}>
          Copy to Clipboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
