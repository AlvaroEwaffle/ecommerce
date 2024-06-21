// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import Wrapper from './styles/Wrapper';
import Success from './pages/Success';
import RequestPasswordReset from './components/PasswordReset/RequestPasswordReset';
import ResetPassword from './components/PasswordReset/ResetPassword';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Wrapper>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/carts" element={<Cart />} />
              <Route path="/success" element={<Success />} />
              <Route path="/forgot-password" element={<RequestPasswordReset />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </Wrapper>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
