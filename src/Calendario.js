import React, { useState, useEffect } from 'react';
import './css/Calendario.css';
import Notification from './Notificacion';

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [dueños, setDueños] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    generateCalendar(month, year);
    fetchDueños();
  }, [month, year]);

  const fetchDueños = () => {
    fetch('http://localhost:5000/api/dueno')
      .then(response => response.json())
      .then(data => {
        setDueños(data);
      })
      .catch(error => console.error('Error al cargar los dueños:', error));
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateCalendar = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: '', empty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, empty: false });
    }

    setDays(calendarDays);
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month - 1, day);
    const isoDate = date.toISOString().split('T')[0];
    setSelectedDate(isoDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const doctor = event.target.doctor.value;
    const duracion = event.target.duracion.value;
    const horario = event.target.horario.value;
    const servicio = event.target.servicio.value;

    const selectedDueño = dueños.find(d => d.nombre === nombre);

    if (!selectedDueño) {
      console.error('Dueño no encontrado');
      setError('Dueño no encontrado');
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Asegurarse de que solo se compara la fecha sin la hora
    const selectedDateObj = new Date(selectedDate);

    // Validar que la fecha seleccionada sea posterior a la fecha actual
    if (selectedDateObj <= currentDate) {
      setError('Por favor ingrese una fecha válida para la cita.');
      return;
    }

    const newAppointment = {
      nombre,
      fecha: new Date(selectedDate).toISOString(),
      doctor,
      duracion,
      horario,
      servicio,
      dueno_id: selectedDueño.id
    };

    fetch('http://localhost:5000/api/CalendarioBack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAppointment)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error al agendar la cita:', data.error);
          setError('Error al agendar la cita.');
        } else {
          console.log('Cita agendada correctamente');
          setAppointments([...appointments, `Nombre: ${nombre}, Fecha: ${selectedDate}, Doctor: ${doctor}, Duración: ${duracion}, Horario: ${horario}, Servicio: ${servicio}`]);
          setNotificationMessage('Cita agendada correctamente');

          setTimeout(() => {
            setNotificationMessage('');
          }, 3000);

          // Resetear el formulario
          event.target.reset();
          setSelectedDate('');
          setError('');
        }
      })
      .catch(error => {
        console.error('Error al agendar la cita:', error);
        setError('Error al agendar la cita.');
      });
  };

  return (
    <div className="container">
      {notificationMessage && <Notification message={notificationMessage} setMessage={setNotificationMessage} />}
      <div className="calendar-container">
        <h2 className="calendar-title">Calendario de Citas</h2>
        <div className="calendar">
          <div className="calendar-header">
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('es', { month: 'long' })}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="calendar-body">
            {days.map((day, index) => (
              <div key={index} className={`calendar-day ${day.empty ? 'empty' : ''}`} onClick={() => !day.empty && handleDayClick(day.day)}>
                {day.day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="form-container">
        <h2>Agendar Cita</h2>
        <form id="cita-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <select id="nombre" name="nombre" className="form-control" required>
              <option value="">Seleccione un dueño</option>
              {dueños.map(dueño => (
                <option key={dueño.id} value={dueño.nombre}>{dueño.nombre} {dueño.apellido}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input type="text" id="fecha" name="fecha" className="form-control" value={selectedDate} readOnly required />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Doctor/a:</label>
            <select id="doctor" name="doctor" className="form-control" required>
              <option value="">Seleccione un doctor</option>
              <option value="Dra.Alejandra">Dra. Alejandra</option>
              <option value="Dr.Felipe">Dr. Felipe</option>
              <option value="Dr.Dominguez">Dr. Dominguez</option>
              <option value="Dra.Annai">Dra. Annai</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="duracion">Duración:</label>
            <select id="duracion" name="duracion" className="form-control" required>
              <option value="">Seleccione una duración</option>
              <option value="10">10 minutos</option>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="90">1 hora y media</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="horario">Horario:</label>
            <select id="horario" name="horario" className="form-control" required>
              <option value="">Seleccione un horario</option>
              {["9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM", "10:00 AM", "10:15 AM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM", "4:00 PM", "4:15 PM", "4:30 PM"].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="servicio">Servicio a realizar:</label>
            <input type="text" id="servicio" name="servicio" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">Agregar</button>
        </form>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="data-container" id="data-container" style={{ display: appointments.length ? 'block' : 'none' }}>
        <h2>Datos de la Cita</h2>
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment">{appointment}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
