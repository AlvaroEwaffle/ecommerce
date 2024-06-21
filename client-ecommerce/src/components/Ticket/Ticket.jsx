import React from 'react';
import { Container, Typography, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Ticket = ({ purchaser, amount, onClose }) => {
  const Navigate = useNavigate();
  const handleCreateTicket = async () => {
    try {
      const response = await api.post('/carts/purchase', { purchaser, amount });
      console.log('Ticket created:', response.data);
      alert('Ticket created successfully!');
      Navigate('/success');
      
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <Container>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h5" gutterBottom>
            Confirm Ticket Purchase
          </Typography>
          <Typography variant="body1">Purchaser: {purchaser}</Typography>
          <Typography variant="body1">Amount: ${amount}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateTicket} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Container>
  );
};

export default Ticket;
