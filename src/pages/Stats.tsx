import React from 'react';
import { Container, Typography, Paper, Box, Grid, LinearProgress, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Stats: React.FC = () => {
  // TODO: Load stats from localStorage
  const stats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winRate: 0,
  };

  const guessDistribution = [
    { attempts: 1, count: 0 },
    { attempts: 2, count: 0 },
    { attempts: 3, count: 0 },
    { attempts: 4, count: 0 },
    { attempts: 'Failed', count: 0 },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Statistics
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h3" color="primary">{stats.gamesPlayed}</Typography>
            <Typography variant="body2" color="text.secondary">Played</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h3" color="primary">{stats.winRate}%</Typography>
            <Typography variant="body2" color="text.secondary">Win Rate</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h3" color="primary">{stats.currentStreak}</Typography>
            <Typography variant="body2" color="text.secondary">Current Streak</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h3" color="primary">{stats.maxStreak}</Typography>
            <Typography variant="body2" color="text.secondary">Max Streak</Typography>
          </Paper>
        </Grid>

        {/* Guess Distribution Chart */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Guess Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={guessDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempts" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#E91E63" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Stats;
