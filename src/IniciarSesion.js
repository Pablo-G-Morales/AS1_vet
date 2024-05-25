//IniciarSesion.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/iniciosesion.css';

function IniciarSesion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log(response.data);
      alert('Inicio de sesión exitoso');
      // Redirige al usuario a la página de datosdueno.js después del inicio de sesión exitoso
      navigate('/registro-dueno'); // Ajusta la ruta según sea necesario
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      alert('Error al iniciar sesión: ' + error.response.data.error);
    }
  };

  return (
    <div className="formulario">
      <h1>INICIO DE SESION</h1>
      <form onSubmit={handleSubmit}>
        <div className="usuario">
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <label>Correo de usuario</label>
        </div>
        <div className="contrasena">
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <label>Contraseña</label>
        </div>
        <div className="recuperar">
          <Link to="/recuperar-contrasena">¿Olvidó su contraseña?</Link>
        </div>
        <div className="boton">
          <button type="submit" id="submit" name="iniciar">Iniciar</button>
        </div>
        <div className="registrarse">
          Quiero hacer el <Link to="/registro">registro</Link>
        </div>
        <footer>
          <p>©2024. Super Pet. Derechos Reservados</p>
        </footer>
      </form>
    </div>
  );
}

export default IniciarSesion;
