import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)' }}>
        <Toolbar>
          <FavoriteIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', fontWeight: 700 }}
          >
            Sortle
          </Typography>
          
          <MuiLink component={RouterLink} to="/archive" color="inherit" sx={{ mx: 2, textDecoration: 'none' }}>
            Archive
          </MuiLink>
          <MuiLink component={RouterLink} to="/stats" color="inherit" sx={{ mx: 2, textDecoration: 'none' }}>
            Stats
          </MuiLink>
          <MuiLink component={RouterLink} to="/settings" color="inherit" sx={{ ml: 2, textDecoration: 'none' }}>
            Settings
          </MuiLink>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Sortle. Made with <FavoriteIcon sx={{ fontSize: 16, color: 'primary.main', verticalAlign: 'middle' }} /> for word puzzle lovers.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
