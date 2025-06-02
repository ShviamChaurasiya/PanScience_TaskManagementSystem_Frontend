import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 Update this if your backend runs elsewhere
  withCredentials: true, // if using cookies (optional, not required for JWT in headers)
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
