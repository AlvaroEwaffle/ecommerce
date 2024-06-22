// src/services/api.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);

const api = axios.create({
  baseURL: 'https://backend-production-a377.up.railway.app/',
  withCredentials: true 
});

export default api;
