import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container>
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
        <Typography variant="h4" gutterBottom>
          Gracias por tu compra!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tu compra ha sido registrada exitosamente. 
        </Typography>
        <img src="https://cdn-icons-png.flaticon.com/512/271/271257.png" alt="Success" style={{ width: '10%', height: '10%', mt: '25px' }} />
        <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ marginTop: '25px' }}>
          Volver al home
        </Button>
      </Box>
    </Container>
  );
};

export default Success;
