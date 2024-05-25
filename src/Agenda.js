import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import './css/Agenda.css';

const API_URL = 'http://localhost:5000/api';

function Agenda() {
  const [newSchedule, setNewSchedule] = useState({
    day_name: '',
    doctor: ''
  });
  const [doctorActivities, setDoctorActivities] = useState([]);
  const [error, setError] = useState(null);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const doctors = ['Dra.Alejandra', 'Dr.Felipe', 'Dr.Dominguez', 'Dra.Annai'];

  const splitDateString = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return { year, month, day };
  };

  const getDaysUntilDate = (date) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const difference = differenceInDays(targetDate, currentDate);

    if (difference === 1) {
      return 'Mañana';
    } else if (difference === 0) {
      return 'Hoy';
    } else if (difference < 0) {
      return 'Ya pasó';
    } else {
      return `En ${difference} días`;
    }
  };

  const fetchDoctorActivities = async () => {
    if (!newSchedule.day_name || !newSchedule.doctor) {
      setError('Por favor, selecciona un día y un doctor.');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/CalendarioBack/doctor-schedule`, {
        params: {
          day_name: newSchedule.day_name,
          doctor: newSchedule.doctor
        }
      });
      setDoctorActivities(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (newSchedule.day_name && newSchedule.doctor) {
      fetchDoctorActivities();
    }
  }, [newSchedule.day_name, newSchedule.doctor]);

  return (
    <div className="agenda-container">
      <h1>Agenda</h1>
      {error && <div className="error-message">{error}</div>}
      <form>
        <label className="form-label">
          Día:
          <select className="form-select" value={newSchedule.day_name} onChange={e => setNewSchedule({ ...newSchedule, day_name: e.target.value })}>
            <option value="">Selecciona un día</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Doctor:
          <select className="form-select" value={newSchedule.doctor} onChange={e => setNewSchedule({ ...newSchedule, doctor: e.target.value })}>
            <option value="">Selecciona un doctor</option>
            {doctors.map(doctor => (
              <option key={doctor} value={doctor}>{doctor}</option>
            ))}
          </select>
        </label>
        <button className="form-button" type="button" onClick={fetchDoctorActivities}>Mostrar Actividades</button>
      </form>

      <h2>Calendario</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Dueño</th>
            <th>Apellido del Dueño</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Horario</th>
            <th>Servicio</th>
          </tr>
        </thead>
        <tbody>
          {doctorActivities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.nombre}</td>
              <td>{activity.apellido}</td>
              <td>{activity.especie}</td>
              <td>{activity.raza}</td>
              <td>{activity.horario}</td>
              <td>{activity.servicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Agenda;
