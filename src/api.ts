import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3000',
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
