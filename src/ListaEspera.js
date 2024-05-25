import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ListaEspera.css';

const turnosPorDoctor = {
  'Dra. Alejandra': 0,
  'Dr. Felipe': 0,
  'Dr. Dominguez': 0,
  'Dra. Annai': 0,
};

function generarTurno(doctor) {
  let letraInicial = '';

  if (doctor.startsWith('Dra.Alejandra')) {
    letraInicial = 'A';
  } else if (doctor.startsWith('Dr.Felipe')) {
    letraInicial = 'F';
  } else if (doctor.startsWith('Dr.Dominguez')) {
    letraInicial = 'D';
  } else if (doctor.startsWith('Dra.Annai')) {
    letraInicial = 'N';
  } else {
    letraInicial = 'O';
  }

  if (!turnosPorDoctor[doctor]) {
    turnosPorDoctor[doctor] = 0;
  }

  turnosPorDoctor[doctor]++;
  const numeroTurno = turnosPorDoctor[doctor] - 1;

  return letraInicial + numeroTurno.toString().padStart(4, '0');
}

function ListaEspera() {
  const [duenosConMascotasYDoctores, setDuenosConMascotasYDoctores] = useState([]);

  useEffect(() => {
    fetchDuenosConMascotasYDoctores();
  }, []);

  const fetchDuenosConMascotasYDoctores = async () => {
    try {
      const duenosResponse = await axios.get('http://localhost:5000/api/dueno');
      const duenosData = duenosResponse.data;

      const duenosConMascotasYDoctoresData = await Promise.all(
        duenosData.map(async (dueno) => {
          const mascotasResponse = await axios.get(`http://localhost:5000/api/mascotas?dueñoId=${dueno.id}`);
          const mascotasData = mascotasResponse.data;

          const mascotaAsociada = mascotasData.find(mascota => mascota.dueñoId === dueno.id);

          const citasResponse = await axios.get(`http://localhost:5000/api/CalendarioBack?dueno_id=${dueno.id}`);
          const citasData = citasResponse.data;
          const citasDelDueño = citasData.filter(cita => cita.dueno_id === dueno.id);
          const doctorAsociado = citasDelDueño.length > 0 ? citasDelDueño[0].doctor : null;
          const fechaCita = citasDelDueño.length > 0 ? citasDelDueño[0].fecha.split('T')[0] : null;
          const horaCita = citasDelDueño.length > 0 ? citasDelDueño[0].horario : null;
          const servicioCita = citasDelDueño.length > 0 ? citasDelDueño[0].servicio : null;
          const turno = doctorAsociado ? generarTurno(doctorAsociado) : null;
          
          // Obtener el estado del backend, por ahora se inicializa en 'En espera'
          const estado = 'En espera'; // Cambia esto para obtener el estado real desde el backend

          return { dueno, mascota: mascotaAsociada || null, doctor: doctorAsociado, fecha: fechaCita, hora: horaCita, servicio: servicioCita, turno: turno, estado: estado };
        })
      );

      setDuenosConMascotasYDoctores(duenosConMascotasYDoctoresData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleAtenderClick = async (dueno, mascota, doctor, fecha, hora, servicio, turno) => {
    try {
      await axios.post('http://localhost:5000/api/lista-espera/atender', {
        duenoId: dueno.id,
        nombreDueno: dueno.nombre,
        apellidoDueno: dueno.apellido,
        especieMascota: mascota ? mascota.especie : null,
        razaMascota: mascota ? mascota.raza : null,
        doctor: doctor,
        fecha: fecha,
        hora: hora,
        servicio: servicio,
        turno: turno,
        estado: 'Siendo atendido',
      });

      // Actualizar el estado localmente después de la inserción
      setDuenosConMascotasYDoctores((prevState) =>
        prevState.map((item) =>
          item.dueno.id === dueno.id ? { ...item, estado: 'Siendo atendido' } : item
        )
      );
    } catch (error) {
      console.error('Error al atender:', error);
    }
  };
  const handleFinalizarClick = async (dueno) => {
    try {
      const cita = duenosConMascotasYDoctores.find(item => item.dueno.id === dueno.id);
      await axios.post('http://localhost:5000/api/citas', {
        nombreDueño: cita.dueno.nombre + ' ' + cita.dueno.apellido,
        especieMascota: cita.mascota ? cita.mascota.especie : null,
        fecha: cita.fecha,
        hora: cita.hora,
        servicio: cita.servicio,
        estado: 'Atendido',
      });
  
      // Actualizar el estado localmente después de la inserción
      setDuenosConMascotasYDoctores(prevState =>
        prevState.filter(item => item.dueno.id !== dueno.id)
      );
    } catch (error) {
      console.error('Error al finalizar:', error);
    }
  };
  const handlePonerEnEsperaClick = async (dueno) => {
    try {
      // Realizar la solicitud al backend para poner en espera
      await axios.post('http://localhost:5000/api/lista-espera/poner-en-espera', {
        duenoId: dueno.id,
        estado: 'En espera',
      });
       // Actualizar el estado localmente después de la actualización
       setDuenosConMascotasYDoctores((prevState) =>
        prevState.map((item) =>
          item.dueno.id === dueno.id ? { ...item, estado: 'En espera' } : item
        )
      );
    } catch (error) {
      console.error('Error al poner en espera:', error);
    }
  };

  return (
    <div className="container">
      <h3>Lista de Espera</h3>
      <div style={{ marginBottom: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>Nombre del Dueño</th>
              <th>Especie de la Mascota</th>
              <th>Raza de la Mascota</th>
              <th>Doctor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Servicio</th>
              <th>Turno</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {duenosConMascotasYDoctores.map(({ dueno, mascota, doctor, fecha, hora, servicio, turno, estado }, index) => (
              <tr key={index}>
                <td>{dueno.nombre} {dueno.apellido}</td>
                <td>{mascota ? mascota.especie : 'Sin mascota'}</td>
                <td>{mascota ? mascota.raza : 'Sin mascota'}</td>
                <td>{doctor || 'Sin doctor asignado'}</td>
                <td>{fecha || 'Sin fecha asignada'}</td>
                <td>{hora || 'Sin hora asignada'}</td>
                <td>{servicio || 'Sin servicio asignado'}</td>
                <td>{turno || 'Sin turno asignado'}</td>
                <td>{estado || 'Sin estado asignado'}</td>
                <td>
                  {estado === '' && (
                    <button onClick={() => handlePonerEnEsperaClick(dueno)}>Poner en Espera</button>
                  )}
                  {estado === 'En espera' && (
                    <button onClick={() => handleAtenderClick(dueno, mascota, doctor, fecha, hora, servicio, turno)}>Atender</button>
                  )}
                  {estado === 'Siendo atendido' && (
                    <button onClick={() => handleFinalizarClick(dueno)}>Finalizar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <h3>Personas Siendo Atendidas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre del Dueño</th>
            <th>Especie de la Mascota</th>
            <th>Servicio</th>
            <th>Turno</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {duenosConMascotasYDoctores.filter(({ estado }) => estado === 'Siendo atendido').map(({ dueno, mascota, servicio, turno, estado }, index) => (
            <tr key={index}>
              <td>{dueno.nombre} {dueno.apellido}</td>
              <td>{mascota ? mascota.especie : 'Sin mascota'}</td>
              <td>{servicio || 'Sin servicio asignado'}</td>
              <td>{turno || 'Sin turno asignado'}</td>
              <td>{estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaEspera;