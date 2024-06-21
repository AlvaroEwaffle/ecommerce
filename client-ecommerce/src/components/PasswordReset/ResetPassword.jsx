import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import api from '../../services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/auth/reset-password/`, { token, newPassword });
            alert('Password reset successful');
            navigate('/login');
        } catch (error) {
            alert('Error resetting password');
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
            <Typography variant="h4">Reset Password</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Reset Password
                </Button>
            </Box>
        </Box>
    );
};

export default ResetPassword;
