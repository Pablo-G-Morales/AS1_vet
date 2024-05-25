import React, { useState } from 'react';
import axios from 'axios';
import './css/styleregistro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    contrasena: '',
    dpi: '',
    cargo: '',
    area: '',
    fechanacimiento: '',
    edad: '',
    telefono: '',
    correoprofesional: '',
    correopersonal: '',
    residencia: '',
    codigopostal: '',
    nit: '',
    fechaingreso: '',
    estadocivil: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/usuarios', formData)
      .then(response => {
        console.log('Usuario registrado:', response.data);
        alert('Usuario registrado exitosamente');
      })
      .catch(error => {
        console.error('Hubo un error registrando el usuario:', error);
        alert('Error registrando el usuario');
      });
  };

  return (
    <div className="formulario registro-formulario">
      <h1>REGISTRAR USUARIO</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            placeholder="Nombre de usuario"
            required 
          />
          <input 
            type="password" 
            name="contrasena" 
            value={formData.contrasena} 
            onChange={handleChange} 
            placeholder="Contraseña"
            required 
          />
          <input 
            type="text" 
            name="dpi" 
            value={formData.dpi} 
            onChange={handleChange} 
            placeholder="DPI"
            required 
          />
          <input 
            type="text" 
            name="cargo" 
            value={formData.cargo} 
            onChange={handleChange} 
            placeholder="Cargo"
            required 
          />
          <input 
            type="text" 
            name="area" 
            value={formData.area} 
            onChange={handleChange} 
            placeholder="Área"
            required 
          />
          <input 
            type="date" 
            name="fechanacimiento" 
            value={formData.fechanacimiento} 
            onChange={handleChange} 
            placeholder="Fecha de nacimiento"
            required 
          />
          <input 
            type="number" 
            name="edad" 
            value={formData.edad} 
            onChange={handleChange} 
            placeholder="Edad"
            required 
          />
          <input 
            type="tel" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
            placeholder="Teléfono"
            required 
          />
          <input 
            type="email" 
            name="correoprofesional" 
            value={formData.correoprofesional} 
            onChange={handleChange} 
            placeholder="Correo profesional"
            required 
          />
          <input 
            type="email" 
            name="correopersonal" 
            value={formData.correopersonal} 
            onChange={handleChange} 
            placeholder="Correo personal"
            required 
          />
          <input 
            type="text" 
            name="residencia" 
            value={formData.residencia} 
            onChange={handleChange} 
            placeholder="Residencia"
            required 
          />
          <input 
            type="text" 
            name="codigopostal" 
            value={formData.codigopostal} 
            onChange={handleChange} 
            placeholder="Código postal"
            required 
          />
          <input 
            type="text" 
            name="nit" 
            value={formData.nit} 
            onChange={handleChange} 
            placeholder="NIT"
            required 
          />
          <input 
            type="date" 
            name="fechaingreso" 
            value={formData.fechaingreso} 
            onChange={handleChange} 
            placeholder="Fecha de ingreso"
            required 
          />
          <input 
            type="text" 
            name="estadocivil" 
            value={formData.estadocivil} 
            onChange={handleChange} 
            placeholder="Estado civil"
            required 
          />
        </div>
        <div className="boton">
          <input type="submit" id="submit" value="Enviar" />
        </div>
      </form>
      <div className="volver">
        <a href="/iniciar-sesion">Volver inicio</a>
      </div>
      <footer>
        <p>©2024. Super Pet. Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default Registro;
