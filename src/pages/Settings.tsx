import React from 'react';
import { Container, Typography, Paper, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Switch, Divider, Button } from '@mui/material';

const Settings: React.FC = () => {
  // TODO: Implement settings
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [language, setLanguage] = React.useState('en');

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Settings
      </Typography>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
        {/* Theme */}
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">Theme</FormLabel>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
            label="Dark Mode"
            sx={{ mt: 1 }}
          />
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Notifications */}
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">Notifications</FormLabel>
          <FormControlLabel
            control={<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />}
            label="Daily Reminder"
            sx={{ mt: 1 }}
          />
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Language */}
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">Language</FormLabel>
          <RadioGroup
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ mt: 1 }}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="es" control={<Radio />} label="Español (Coming Soon)" disabled />
            <FormControlLabel value="fr" control={<Radio />} label="Français (Coming Soon)" disabled />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        {/* Reset */}
        <Button variant="outlined" color="error" fullWidth>
          Reset All Stats
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;
