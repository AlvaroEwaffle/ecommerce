// src/components/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, loading);
    if (!loading) {
      if (isAuthenticated) {
        navigate('/');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '66vh',
          maxWidth: '75vw',
          margin: '0 auto',
          padding: '2rem',
          border: '1px solid black',
          borderRadius: '5%',
          backgroundColor: 'rgba(245, 245, 245, 0.66)',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>


        </Box>
        <Button
          type="RequestPassword"
          fullWidth
          variant="outlined"
          onClick={() => navigate('/forgot-password')}
          sx={{ mb: 2 }}
        >
          Forgot Password?
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
