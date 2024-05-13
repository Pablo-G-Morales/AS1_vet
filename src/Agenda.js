import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Agenda.css'; // Importamos el archivo CSS

const API_URL = 'http://localhost:5000/api';

function Agenda() {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    day_name: '',
    activity_name: '',
    start_time: '',
    end_time: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${API_URL}/schedules`, {
          headers: {
            Accept: 'application/json'
          }
        });
        setSchedules(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSchedules();
  }, []);

  const validateInput = () => {
    const { day_name, activity_name, start_time, end_time } = newSchedule;
    if (!day_name || !activity_name || !start_time || !end_time) {
      return false;
    }

    return true;
  };

  const handleAddActivity = async () => {
    if (!validateInput()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/schedules`, newSchedule);
      setSchedules(prevSchedules => [...prevSchedules, response.data]);
      setNewSchedule({ day_name: '', activity_name: '', start_time: '', end_time: '' });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return (
    <div className="agenda-container">
      <h1>Agenda</h1>
      {error && <div className="error-message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Actividad</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.day_name}</td>
              <td>{schedule.activity_name}</td>
              <td>{schedule.start_time}</td>
              <td>{schedule.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          Actividad:
          <input className="form-input" type="text" value={newSchedule.activity_name} onChange={e => setNewSchedule({ ...newSchedule, activity_name: e.target.value })} placeholder="Ingresa el nombre de la actividad" />
        </label>
        <label className="form-label">
          Hora de inicio:
          <input className="form-input" type="text" value={newSchedule.start_time} onChange={e => setNewSchedule({ ...newSchedule, start_time: e.target.value })} placeholder="HH:MM" />
        </label>
        <label className="form-label">
          Hora de fin:
          <input className="form-input" type="text" value={newSchedule.end_time} onChange={e => setNewSchedule({ ...newSchedule, end_time: e.target.value })} placeholder="HH:MM" />
        </label>
        <button className="form-button" type="button" onClick={handleAddActivity}>Agregar Actividad</button>
      </form>
    </div>
  );
}

export default Agenda;