import React from 'react';
import { Box } from '@mui/material';
import backgroundImage from '../assets/Background.png'; // Ensure you have a background image in the specified path

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
