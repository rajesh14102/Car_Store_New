import { Box, Button, TextField, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      toast.error('Invalid Credentials', {
        position: 'top-right',
        style: {
          background: '#24283c',
          color: '#bd8c44',
          fontFamily: 'Tagesschrift, sans-serif',
        },
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          bgcolor: '#24283c',
          color: 'white',
          borderRadius: 4,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 0 25px 8px rgba(189, 140, 68, 0.8)',
          },
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          textAlign="center"
          sx={{ color: '#bd8c44', fontFamily: 'Tagesschrift, sans-serif', fontWeight: 'bold' }}
        >
          🔒 Admin Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: { xs: '250px', sm: '300px' },
          }}
        >
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            fullWidth
            InputProps={{ style: { color: '#bd8c44' } }}
            InputLabelProps={{ style: { color: '#bd8c44' }, shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#bd8c44' },
                '&:hover fieldset': { borderColor: '#bd8c44' },
                '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
              },
              input: { fontFamily: 'Tagesschrift, sans-serif' },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            fullWidth
            InputProps={{
              style: { color: '#bd8c44' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#bd8c44' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#bd8c44' }, shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#bd8c44' },
                '&:hover fieldset': { borderColor: '#bd8c44' },
                '&.Mui-focused fieldset': { borderColor: '#bd8c44' },
              },
              input: { fontFamily: 'Tagesschrift, sans-serif' },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#bd8c44',
              color: '#24283c',
              fontWeight: 'bold',
              fontFamily: 'Tagesschrift, sans-serif',
              '&:hover': {
                bgcolor: '#d4a25c',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
