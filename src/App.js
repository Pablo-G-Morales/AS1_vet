import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import logo from './images/logo.png';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import ListaEspera from './ListaEspera';
import CitasList from './CitasList';
import CitaForm from './CitaForm';
import Comentarios from './Comentarios';
import Agenda from './Agenda';
import Calendario from './Calendario';
import RegistroMascota from './datosmascota';
import RegistroDueno from './datosdueno';
import FichaDuenos from './FichaDuenos';
import FichaMascotas from './FichaMascotas';
import IniciarSesion from './IniciarSesion';
import RecuperarContrasena from './RecuperarContrasena';
import facebookLogo from './images/facebook_logo.png';
import instagramLogo from './images/instagram_logo.png';
import Registro from './Registro'; 

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

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" />
          <Menu />
          <hr className="divider" />
          <div className="header-content orange-background">
            <h2 className="header-title">Bienvenido</h2>
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
            <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/lista-espera" element={<ListaEspera listaEspera={listaEspera} />} />
            <Route path="/historial" element={<CitasList citas={citas} onUpdate={handleUpdate} />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/cita-form" element={
              <React.Fragment>
                <CitaForm onUpdate={handleFormSubmit} />
                <hr className="divider" />
                <CitasList citas={citas} onUpdate={handleUpdate} />
              </React.Fragment>
            } />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/registro-dueno" element={<RegistroDueno />} />
            <Route path="/registro-mascota" element={<RegistroMascota />} />
            <Route path="/ficha-duenos" element={<FichaDuenos />} />
            <Route path="/ficha-mascotas" element={<FichaMascotas />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/registro" element={<Registro />} /> 
          </Routes>
        </main>
        <footer>
          <button onClick={reloadPage}>Actualizar Datos</button>
        </footer>
      </div>
    </Router>
  );
}

function Menu() {
  const location = useLocation();

  return (
    !location.pathname.includes('iniciar-sesion') &&
    !location.pathname.includes('recuperar-contrasena') &&
    !location.pathname.includes('registro') && (
      <>
        <div className="menu">
          <Link to="/registro-dueno" className="menu-item">Registrar Dueño</Link>
          <Link to="/ficha-duenos" className="menu-item">Ficha Dueños</Link>
          <Link to="/ficha-mascotas" className="menu-item">Ficha Mascotas</Link>
        </div>
        <div className="menu">
          <Link to="/cita-form" className="menu-item">Historial</Link>
          <Link to="/lista-espera" className="menu-item">Lista de Espera</Link>
          <Link to="/comentarios" className="menu-item">Comentarios</Link>
          <Link to="/agenda" className="menu-item">Agenda</Link>
        </div>
      </>
    )
  );
}

export default App;
