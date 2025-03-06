import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1c6a-2400-1a00-b050-ce62-e930-ebde-872-1860.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
