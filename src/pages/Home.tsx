import React from 'react';
import { Container, Typography, Button, Box, Paper, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        {/* Logo / Title */}
        <Typography variant="h1" sx={{ mb: 2, fontWeight: 800, background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Sortle
        </Typography>
        
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
          Daily Word Grouping Puzzle
        </Typography>

        {/* Play Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={() => navigate('/puzzle/today')}
          sx={{ 
            px: 6, 
            py: 2, 
            fontSize: '1.2rem',
            borderRadius: 25,
            background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
            },
          }}
        >
          Play Today's Puzzle
        </Button>

        {/* How to Play */}
        <Paper elevation={0} sx={{ mt: 6, p: 4, backgroundColor: 'background.default', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            How to Play
          </Typography>
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="body1" align="left">
              1. You'll see 16 words on the board
            </Typography>
            <Typography variant="body1" align="left">
              2. Group them into 4 categories of 4 words each
            </Typography>
            <Typography variant="body1" align="left">
              3. You have 4 lives (❤️❤️❤️🖤) - wrong guess costs 1 life
            </Typography>
            <Typography variant="body1" align="left">
              4. Complete all 4 groups to win!
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
