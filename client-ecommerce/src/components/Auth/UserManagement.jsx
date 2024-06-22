// src/components/UserManagement.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || user.role !== 'admin') {
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, user, navigate, loading]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e, userId, field) => {
    const newUsers = users.map((user) =>
      user._id === userId ? { ...user, [field]: e.target.value } : user
    );
    setUsers(newUsers);
  };

  const handleSave = async (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);
    try {
      await api.put(`/users/${userId}/edit`, userToUpdate);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  return (
    <Container component="main">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" color={'white'} gutterBottom>
          User Management Table
        </Typography>
        <Typography variant="h6" component="h1" color={'white'} gutterBottom>
          Puedes editar los campos del usuario, presiona save para guardar.
        </Typography>
        <TableContainer component={Paper}>
          <Table > 
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Cart ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <TextField
                      value={user.name}
                      onChange={(e) => handleInputChange(e, user._id, 'name')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={user.email}
                      onChange={(e) => handleInputChange(e, user._id, 'email')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={user.role}
                      onChange={(e) => handleInputChange(e, user._id, 'role')}
                    />
                  </TableCell>
                  <TableCell>
                    {user.cartid}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(user._id)}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UserManagement;
