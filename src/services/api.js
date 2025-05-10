import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bank-service-back-dev-jqkt.3.us-1.fl0.io/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;