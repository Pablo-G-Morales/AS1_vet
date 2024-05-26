import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import Prueba from './App.js';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Prueba />
  </React.StrictMode>
);

reportWebVitals();

