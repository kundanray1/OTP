import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Success from './Success';
import './index.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <ToastContainer position="top-right"/>

    <Router>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>

  </React.StrictMode>
);
