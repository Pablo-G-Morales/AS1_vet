import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia la importación a react-dom/client
import './index.css';
import Prueba from './App.js';
import reportWebVitals from './reportWebVitals';

// Utiliza createRoot en lugar de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Prueba />
  </React.StrictMode>
);

// No es necesario hacer cambios en reportWebVitals, puedes dejarlo como está
reportWebVitals();

