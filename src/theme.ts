import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#E91E63', // Pink
      light: '#F48FB1',
      dark: '#C2185B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9C27B0', // Purple
      light: '#BA68C8',
      dark: '#7B1FA2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FCE4EC', // Light pink background
      paper: '#FFFFFF',
    },
    error: {
      main: '#D32F2F', // Red for lost lives
    },
    success: {
      main: '#4CAF50', // Green for correct groups
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(233, 30, 99, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 12px rgba(233, 30, 99, 0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
