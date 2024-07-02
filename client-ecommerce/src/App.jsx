// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import Wrapper from './styles/Wrapper';
import Success from './components/Ticket/Success';
import RequestPasswordReset from './components/Auth/RequestPasswordReset';
import ResetPassword from './components/Auth/ResetPassword';
import UserManagement from './components/Auth/UserManagement';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
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
              <Route path="/users" element={<UserManagement />} />
            </Routes>
          </Wrapper>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
