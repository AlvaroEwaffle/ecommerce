import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import Ticket from '../Ticket/Ticket'; // Import the Ticket component
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const [cart, setCart] = useState(null);
    const [loadingcart, setLoadingCart] = useState(true);
    const [open, setOpen] = useState(false); // State to handle dialog open/close
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isAuthenticated, loading);
        if (!loading) {
          if (!isAuthenticated) {
            navigate('/login');
          }
        }
      }, [isAuthenticated, loading, navigate]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (user && user.cartid) {
                    const response = await api.get(`/carts/${user.cartid}`);
                    console.log(response.data);
                    setCart(response.data);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
            setLoadingCart(false);
        };

        fetchCart();
    }, [user]);

    if (loadingcart) {
        return <p>Loading...</p>;
    }

    if (!cart) {
        return <p>No cart found</p>;
    }

    const totalAmount = cart.products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);

    const handleCreateTicket = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ marginTop: 2, color: 'white' }}>
                Tu Carrito
            </Typography>
            <Grid container spacing={3}>
                {cart.products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={product.productId.title}
                                height="140"
                                image={product.productId.thumbnails || 'placeholder.jpg'}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.productId.title}</Typography>
                                <Typography variant="body2">{product.productId.description}</Typography>
                                <Typography variant="body1">Price: ${product.productId.price}</Typography>
                                <Typography variant="body1">Quantity: {product.quantity}</Typography>
                                <Typography variant="h6">Total: ${product.productId.price * product.quantity}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 2, color: 'white' }}>
                Total Amount: ${totalAmount}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateTicket}>
                Create Ticket
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Ticket purchaser={user.email} amount={totalAmount} onClose={handleClose} />
            </Dialog>
        </Container>
    );
};

export default Cart;
