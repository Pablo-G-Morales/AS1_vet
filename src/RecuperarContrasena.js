//RecuperarContrasena.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/stylerecuperar.css';

function RecuperarContrasena() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rpassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.rpassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    axios.post('http://localhost:5000/api/recuperar-contrasena', { email: formData.email, password: formData.password })
      .then(response => {
        console.log('Contraseña actualizada correctamente:', response.data);
        alert('Contraseña actualizada correctamente');
        // Redirigir a otra página si es necesario
      })
      .catch(error => {
        console.error('Error al recuperar la contraseña:', error);
        alert('Error al recuperar la contraseña. Por favor, intenta de nuevo.');
      });
  };

  return (
    <div className="formulario">
      <h1>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div className="usuario">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="email">Correo de usuario</label>
        </div>
        <div className="contrasena">
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className="contrasena">
          <input type="password" name="rpassword" value={formData.rpassword} onChange={handleChange} required />
          <label htmlFor="rpassword">Verificar Contraseña</label>
        </div>
        <div className="boton">
          <input type="submit" id="submit" value="Enviar" />
        </div>
        <footer>
          <p>©2024. Super Pet. Derechos Reservados</p>
        </footer>
      </form>
    </div>
  );
}

export default RecuperarContrasena;
