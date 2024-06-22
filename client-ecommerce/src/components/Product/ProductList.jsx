import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import ProductForm from './ProductForm';
import api from '../../services/api';
import InfiniteScroll from 'react-infinite-scroller';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more products are available
  const [openForm, setOpenForm] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();


  useEffect(() => {

    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);


  const loadMoreProducts = () => {
    api.get(`/products?page=${page}&limit=10`)
      .then(response => {
        if (response.data.length === 0) {
          setHasMore(false); // No more products to load
        } else {
          setProducts(prevProducts => [...prevProducts, ...response.data]);
          setPage(prevPage => prevPage + 1); // Increment page for next fetch
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const HandleAddButton = (cartid, productid) => {
    const quantity = quantities[productid] || 1; // Default quantity to 1 if not set

    // Add the product to the cart
    api.post('/carts/' + cartid + '/products/' + productid, { quantity })
      .then(response => {
        console.log('Product added to cart:', response.data);
        //Alert the user that the product was added to the cart
        alert('Product added to cart');
      })
      .catch(error => {
        alert('Error adding product to cart');
        console.error('Error adding product to cart:', error);
      });
  };

  const handleDeletButton = (productid) => {
    // Alert to confirm
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Delete the product
    }
    api.delete('/products/' + productid)
      .then(response => {
        console.log('Product deleted:', response.data);
        alert('Product deleted, tha page will be reloaded');
        //Reload the component
        window.location.reload();
      })
      .catch(error => {
        alert('Error deleting product');
        console.error('Error deleting product:', error);
      });
  }

  const handleQuantityChange = (event, productId) => {
    setQuantities({
      ...quantities,
      [productId]: event.target.value,
    });
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = (refreshList = false) => {
    setOpenForm(false);
    if (refreshList) {
      setPage(1); // Reset page to fetch the updated list
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom color="white">
        Lista de Productos 
      </Typography>
      {user && (user.role === 'admin' || user.role === 'premium') ? (
      <Button variant="contained" color="secondary" onClick={handleOpenForm} style={{ marginBottom: '20px' }}>
        Create New Product
      </Button>
      ) : null}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreProducts}
        hasMore={hasMore}
        loader={<p key="loader">Loading...</p>}
        threshold={100}
        useWindow={true}
      >
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="140"
                  image={product.thumbnails[0] || 'placeholder.jpg'}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body1">Stock: {product.stock}</Typography>
                  <Typography variant="body1"> Select the quantity you want to add to the cart</Typography>
                  <TextField
                  type="number"
                  label="Quantity"
                  value={quantities[product._id] || 1}
                  onChange={(event) => handleQuantityChange(event, product._id)}
                  fullWidth
                  margin="normal"
                  sx={{ marginBottom: '10px', marginTop: '10px' }}
                />
                
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => HandleAddButton(user.cartid, product._id)} // Wrap the function call in an arrow function
                    fullWidth
                    sx={{ marginBottom: '10px', marginTop: '10px' }}
                  >
                    Add to Cart
                  </Button>
                  {user.role === 'admin' || user.role === 'premium' ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeletButton(product._id)}
                      fullWidth
                    >
                      Delete Product
                    </Button>
                  ) : null}
                
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      <ProductForm open={openForm} onClose={handleCloseForm} />
      {!hasMore && <p>End of List</p>}
    </Container>
  );
};

export default ProductList;
