// src/components/Navbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logout();
    alert('Logout successful');
    navigate('/');
  };
  
  return (
    <AppBar position="static">
      {isAuthenticated && (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React e-Commerce - {user.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/carts">
            Cart
          </Button>
          <Button color="inherit" component={Link} onClick={handleLogoutClick}>
            Logout
          </Button>
        </Box>
      </Toolbar>
      )}
      {!isAuthenticated && (
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Reac e-Commerce
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
