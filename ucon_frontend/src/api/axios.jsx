// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/accounts', // update if needed
  baseURL: '/accounts/',
});

// Attach token
instance.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('tokens');
  if (tokens) {
    const { access } = JSON.parse(tokens);
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

export default instance;

export const register = (userData) => API.post('/accounts/register/', userData);
export const login = (credentials) => API.post('/accounts/login/', credentials);