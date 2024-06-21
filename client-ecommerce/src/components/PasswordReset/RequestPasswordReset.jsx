import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/request-password-reset', { email });
            alert('Password reset email sent');
            navigate('/login');

        } catch (error) {
            alert('Error sending email');
        }
    };

    return (

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
            <Typography variant="h4">Request Password Reset</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Send Reset Email
                </Button>
            </Box>
        </Box>
    );
};

export default RequestPasswordReset;
