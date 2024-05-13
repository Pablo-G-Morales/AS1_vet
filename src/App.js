import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import logo from './images/logo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaEspera from './ListaEspera';
import CitasList from './CitasList';
import CitaForm from './CitaForm';
import Comentarios from './Comentarios';
import Agenda from './Agenda'; // Asegúrate de importar el componente Agenda desde Agenda.js
import facebookLogo from './images/facebook_logo.png';
import instagramLogo from './images/instagram_logo.png';

function App() {
  const [citas, setCitas] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const baseURL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get(`${baseURL}/citas`);
        setCitas(response.data);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    };

    const fetchListaEspera = async () => {
      try {
        const response = await axios.get(`${baseURL}/lista-espera`);
        setListaEspera(response.data);
      } catch (error) {
        console.error('Error al cargar la lista de espera:', error);
      }
    };

    fetchCitas();
    fetchListaEspera();
  }, []);

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(`${baseURL}/citas`, values);
      console.log('Cita insertada correctamente');
      resetForm();
      setCitas(prevCitas => [...prevCitas, values]);
    } catch (error) {
      console.error('Error al insertar cita:', error);
    }
  };

  const handleUpdate = (editedCita) => {
    console.log('Cita actualizada:', editedCita);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" />
          <div className="menu">
            <span className="menu-item">Calendario</span>
            <span className="menu-item">Programar Citas</span> 
            <span className="menu-item">Registro</span>
            <span className="menu-item">Recordatorios</span>
            <span className="menu-item">Reportes y Análisis</span>
          </div>
          <div className="menu">
            <Link to="/cita-form" className="menu-item">Historial</Link>
            <Link to="/lista-espera" className="menu-item">Lista de Espera</Link>
            <Link to="/comentarios" className="menu-item">Comentarios</Link>
            <Link to="/agenda" className="menu-item">Agenda</Link>
          </div>
          <hr className="divider" />
          <div className="header-content orange-background">
            <h2 className="header-title">Ingrese los datos</h2>
            <div className="social-media">
              <a href="https://www.facebook.com/veterinariasuperpet" target="_blank" rel="noopener noreferrer">
                <img src={facebookLogo} alt="Facebook" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://www.instagram.com/superpetguate/" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" style={{ width: 24, height: 24 }} />
              </a>
            </div>
            <hr className="vertical-divider" />
            <span className="header-date">{obtenerFechaActual()}</span>
          </div>
          <hr className="divider" />
        </header>
        <main>
          <Routes>
            <Route path="/lista-espera" element={<ListaEspera listaEspera={listaEspera} />} />
            <Route path="/historial" element={<CitasList citas={citas} onUpdate={handleUpdate} />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/cita-form" element={<React.Fragment>
              <CitaForm onUpdate={handleFormSubmit} />
              <hr className="divider" />
              <CitasList citas={citas} onUpdate={handleUpdate} />
            </React.Fragment>} />
            <Route path="/agenda" element={<Agenda />} /> {/* Aquí se usa el componente Agenda */}
            <Route path="/" element={<React.Fragment>
              <CitaForm onUpdate={handleFormSubmit} />
              <hr className="divider" />
              <CitasList citas={citas} onUpdate={handleUpdate} />
            </React.Fragment>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
