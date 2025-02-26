import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f202-2400-1a00-b050-ce62-81e1-1d4e-4f3a-c711.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
