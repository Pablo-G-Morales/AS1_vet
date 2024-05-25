import React, { useState } from 'react';
import './css/CitaItem.css';

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
        {/* Inputs para editar los datos de la cita */}
      </form>
    );
  }

  return (
    <div className="cita-item-container">
      <div className="cita-section">
        <span className="cita-nombre-dueño">Nombre del Dueño:</span>
        <span>{cita.nombreDueño}</span>
      </div>
      <div className="cita-section">
        <span className="cita-especie-mascota">Especie de la Mascota:</span>
        <span>{cita.especieMascota}</span>
      </div>
      <div className="cita-section">
        <span className="cita-fecha-hora">Fecha:</span>
        <span>{formatDate(cita.fecha)}</span>
        <span className="cita-fecha-hora">Hora:</span>
        <span>{formatTime(cita.hora)}</span>
      </div>
      <div className="cita-section">
        <span className="cita-servicio">Servicio:</span>
        <span>{cita.servicio}</span>
      </div>
      <div className="cita-section">
        <span className="cita-estado">Estado:</span>
        <span>{cita.estado}</span>
      </div>
    </div>
  );
};

export default CitaItem;
