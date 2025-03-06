import axios from 'axios';

const api = axios.create({
  baseURL: 'https://polecat-deciding-possum.ngrok-free.app/',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
  // You can add other default settings here (e.g., headers, timeouts, etc.)
});

export default api;
