import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#161925',
        boxShadow: '0 0 10px rgba(189, 140, 68, 0.3)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#bd8c44',
            fontFamily: 'Tagesschrift, sans-serif',
            fontWeight: 'bold',
            flexGrow: 1,
          }}
        >
          Car Store
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#bd8c44',
              fontWeight: 'bold',
              '&:hover': { color: 'white', backgroundColor: '#bd8c44' },
            }}
          >
            Home
          </Button>

          {isAdmin && (
            <Button
              component={Link}
              to="/admin"
              sx={{
                color: '#bd8c44',
                fontWeight: 'bold',
                '&:hover': { color: 'white', backgroundColor: '#bd8c44' },
              }}
            >
              Dashboard
            </Button>
          )}

          {isAdmin ? (
            <Button
              onClick={handleLogout}
              sx={{
                color: '#bd8c44',
                fontWeight: 'bold',
                '&:hover': { color: 'white', backgroundColor: '#bd8c44' },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: '#bd8c44',
                fontWeight: 'bold',
                '&:hover': { color: 'white', backgroundColor: '#bd8c44' },
              }}
            >
              Admin Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
