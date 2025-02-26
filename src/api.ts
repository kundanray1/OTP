import axios from 'axios';

const api = axios.create({
  baseURL:'https://multi-worker.vercel.app',
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
