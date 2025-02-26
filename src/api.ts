import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-ngrok-url.ngrok.io',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
