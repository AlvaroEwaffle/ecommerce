import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import api from '../../services/api';

const ProductForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    price: 0,
    stock: 0,
    thumbnails: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/products', formData);
      onClose(true); // Close the dialog and refresh the product list
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="code"
          label="Code"
          value={formData.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="stock"
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="thumbnails"
          label="Thumbnail"
          type="text"
          value={formData.thumbnails}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
