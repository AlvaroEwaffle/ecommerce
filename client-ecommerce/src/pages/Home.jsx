// src/components/Home.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Container, Typography, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Container >
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

        
        
        <Typography variant="h5" gutterBottom >
          Bienvenido!
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="h6">
              Hola, {user.name}!
            </Typography>

            <Box mt={2}>
              <Typography variant="h4" sx={{ marginBottom: 4 }}>¿Qué deseas hacer hoy?</Typography>
              <Box mt={1}>
                <Stack spacing={2} direction="column">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/products')}
                  >
                    Ver Listado de Productos
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/carts')}
                  >
                    Ver tu Cart
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleLogoutClick}
                    sx={{ marginLeft: 2 }}
                  >
                    Logout
                  </Button>
                </Stack>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleLoginClick} fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
            <Button variant="outlined" color="primary" onClick={handleRegisterClick} fullWidth sx={{ marginTop: 2 }}>
              Registrarse
            </Button>
            <Typography gutterBottom variant="body" sx={{ marginTop: 2, marginBottom: 4 }}>
              Desarrollado por Alvaro Villena 
            </Typography>
            <img src={logo} alt="logo" width="100" height="100"  />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
