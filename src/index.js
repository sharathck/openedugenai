import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);