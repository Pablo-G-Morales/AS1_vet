// CitaItem.js
import React, { useState } from 'react';
import './css/CitaItem.css'

const CitaItem = ({ cita, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editedCita, setEditedCita] = useState({ ...cita });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCita(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formatear la fecha antes de enviarla al backend
    const updatedCita = {
      ...editedCita,
      fecha: new Date(editedCita.fecha).toISOString() // Formatear fecha
    };
    onUpdate(updatedCita);
    setEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('es-ES', options);
  };

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="cita-form">
        <input type="text" name="nombreDueño" value={editedCita.nombreDueño} onChange={handleInputChange} className="cita-input" />
        <input type="text" name="tipoMascota" value={editedCita.tipoMascota} onChange={handleInputChange} className="cita-input" />
        <input type="date" name="fecha" value={editedCita.fecha} onChange={handleInputChange} className="cita-input" />
        <input type="time" name="hora" value={editedCita.hora} onChange={handleInputChange} className="cita-input" />
        <input type="text" name="servicio" value={editedCita.servicio} onChange={handleInputChange} className="cita-input" />
        <select name="estado" value={editedCita.estado} onChange={handleInputChange} className="cita-input">
          <option value="atendido">Atendido</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button type="submit" className="cita-button">Guardar</button>
        <button type="button" onClick={() => setEditing(false)} className="cita-button">Cancelar</button>
      </form>
    );
  }

  return (
    <div className="cita-container">
      <span className="cita-data">{cita.nombreDueño}</span>
      <span className="cita-data"> - </span>
      <span className="cita-data">{cita.tipoMascota}</span>
      <span className="cita-data"> - </span>
      <span className="cita-data">{formatDate(cita.fecha)}</span>
      <span className="cita-data"> - </span>
      <span className="cita-data">{formatTime(cita.hora)}</span>
      <span className="cita-data"> - </span>
      <span className="cita-data">{cita.servicio}</span>
      <span className="cita-data"> - </span>
      <span className="cita-data">{cita.estado}</span>
    </div>
  );
};

export default CitaItem;