import React, { useState, useCallback, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField, Chip, Stack } from '@mui/material';
import useGameStore from '../../store/gameStore';

interface ShareModalProps {
  open?: boolean;
  onClose?: () => void;
  score?: number;
  time?: string;
  mistakes?: number;
}

const ShareModal: React.FC<ShareModalProps> = ({ open: propOpen, onClose: propOnClose, score = 0, time = '', mistakes = 0 }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propOpen ?? internalOpen;

  const { puzzle, lives, maxLives, gameStatus, startTime, endTime } = useGameStore();

  const handleOpen = () => setInternalOpen(true);
  const handleClose = () => {
    setInternalOpen(false);
    propOnClose?.();
  };

  const generateShareText = useCallback(() => {
    if (!puzzle) return '';

    const dateStr = new Date(puzzle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    // Calculate time
    const start = startTime || Date.now();
    const end = endTime || Date.now();
    const totalSec = Math.floor((end - start) / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const timeStr = `⏱ ${min}:${sec.toString().padStart(2, '0')}`;

    // Generate emoji grid (lives left)
    const emojis = Array.from({ length: maxLives }, (_, i) => i < lives ? '❤️' : '🖤').join('');

    // Score
    const scoreStr = score > 0 ? `\n🏆 Score: ${score}` : '';

    return `Sortle #${puzzle.date}\n${emojis}\n${timeStr}${scoreStr}\n\nCan you beat me? https://sortle.xxddsses.com`;
  }, [puzzle, lives, maxLives, startTime, endTime, score]);

  const handleCopy = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <>
      {/* Trigger button (when used inline, not as dialog) */}
      {!propOpen && (
        <Button variant="outlined" onClick={handleOpen} sx={{ ml: 1 }}>
          Share
        </Button>
      )}

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Result</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              {gameStatus === 'won' ? '🎉 You Won!' : '😢 Game Over'}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 2 }}>
              {score > 0 && <Chip label={`🏆 ${score}`} color="primary" />}
              {time && <Chip label={`⏱ ${time}`} color="secondary" />}
              <Chip label={`❌ ${mistakes} mistakes`} color="default" />
            </Stack>

            {/* Preview */}
            <TextField
              multiline
              fullWidth
              rows={6}
              value={generateShareText()}
              slotProps={{ input: { readOnly: true } }}
              sx={{ mb: 2, '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareModal;
