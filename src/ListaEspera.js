import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ListaEspera.css';

function ListaEspera() {
  const [listaEspera, setListaEspera] = useState([]);
  const [turnoActual, setTurnoActual] = useState({});
  const [turnoActualCount, setTurnoActualCount] = useState({});
  const [nombre, setNombre] = useState('');
  const [doctor, setDoctor] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [servicio, setServicio] = useState('');

  useEffect(() => {
    fetchListaEspera(); // Obtener los datos al montar el componente
    const interval = setInterval(fetchListaEspera, 5000); // Obtener los datos cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []); // El segundo parámetro del useEffect está vacío, lo que significa que solo se ejecutará una vez al montar el componente

  useEffect(() => {
    updateTurnoActual();
  }, [listaEspera]);

  const fetchListaEspera = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/lista-espera');
      setListaEspera(response.data); // Actualizar el estado local con los datos obtenidos del servidor
    } catch (error) {
      console.error('Error al obtener la lista de espera:', error);
    }
  };

  const updateTurnoActual = () => {
    const pacientesSiendoAtendidos = {};
    listaEspera.forEach(person => {
      if (person.estado === 'Siendo atendido') {
        if (!pacientesSiendoAtendidos[person.doctor]) {
          pacientesSiendoAtendidos[person.doctor] = person;
        } else {
          // Si ya hay una persona en espera para este doctor, comprobar si el nuevo turno es más bajo
          if (person.turno < pacientesSiendoAtendidos[person.doctor].turno) {
            pacientesSiendoAtendidos[person.doctor] = person;
          }
        }
      }
    });
    setTurnoActual(pacientesSiendoAtendidos);
  };

  const generateDoctorCode = (doctor) => {
    let doctorCode = '';
    if (doctor === 'Dra. Alejandra') {
      doctorCode = 'A';
    } else if (doctor === 'Dr. Felipe') {
      doctorCode = 'F';
    } else if (doctor === 'Dr. Dominguez') {
      doctorCode = 'D';
    } else if (doctor === 'Dra. Annai') {
      doctorCode = 'N';
    }
    return doctorCode;
  };

  const generateTurno = (doctorCode) => {
    const count = turnoActualCount[doctorCode] || 0;
    const turno = `${doctorCode}${count.toString().padStart(4, '0')}`;
    setTurnoActualCount(prevState => ({
      ...prevState,
      [doctorCode]: count + 1
    }));
    return turno;
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };

  const handleTipoMascotaChange = (event) => {
    setTipoMascota(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleServicioChange = (event) => {
    setServicio(event.target.value);
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const checkForm = () => {
    if (nombre && doctor && tipoMascota && fecha && hora && servicio) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  const [showError, setShowError] = useState(false);

  const showErrorMessage = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const doctorCode = generateDoctorCode(doctor);
      const turno = generateTurno(doctorCode);

      const newPerson = {
        nombre_dueño: nombre,
        tipo_mascota: tipoMascota,
        fecha: fecha,
        hora: hora,
        servicio: servicio,
        doctor: doctor,
        turno: turno,
        estado: 'En espera'
      };

      console.log('Objeto newPerson:', newPerson);

      try {
        const response = await axios.post('http://localhost:5000/api/lista-espera', newPerson);
        console.log('Cita insertada correctamente:', response.data);
        setListaEspera(prevList => [...prevList, newPerson]);
        setNombre('');
        setTipoMascota('');
        setFecha('');
        setHora('');
        setServicio('');
      } catch (error) {
        console.error('Error al insertar cita:', error);
      }
    } else {
      showErrorMessage();
    }
  };

  const handleFinalizarCita = async (turno) => {
    const updatedList = listaEspera.map(person => {
      if (person.turno === turno) {
        return { ...person, estado: 'Finalizado' };
      }
      return person;
    });

    try {
      const response = await axios.put(`http://localhost:5000/api/lista-espera/${turno}`, { estado: 'Finalizado' });
      console.log('Cita finalizada correctamente:', response.data);
      setListaEspera(updatedList);
      updateTurnoActual(); // Actualizar el turno actual después de finalizar una cita
    } catch (error) {
      console.error('Error al finalizar cita:', error);
    }
  };

  const atenderSiguienteTurno = async () => {
    const pacientesEnEspera = {};
    listaEspera.forEach(person => {
      if (person.estado === 'En espera') {
        if (!pacientesEnEspera[person.doctor]) {
          pacientesEnEspera[person.doctor] = person;
        } else {
          // Si ya hay una persona en espera para este doctor, comprobar si el nuevo turno es más bajo
          if (person.turno < pacientesEnEspera[person.doctor].turno) {
            pacientesEnEspera[person.doctor] = person;
          }
        }
      }
    });

    if (Object.keys(pacientesEnEspera).length > 0) {
      const personaSeleccionada = Object.values(pacientesEnEspera)[0];
      const newTurnoActual = {
        ...turnoActual,
        [personaSeleccionada.doctor]: personaSeleccionada
      };

      const newListaEspera = listaEspera.map(person => {
        if (person.turno === personaSeleccionada.turno) {
          return { ...person, estado: 'Siendo atendido' };
        }
        return person;
      });

      try {
        // Actualizar el estado en la base de datos
        await axios.put(`http://localhost:5000/api/lista-espera/${personaSeleccionada.turno}`, { estado: 'Siendo atendido' });
      } catch (error) {
        console.error('Error al actualizar estado en la base de datos:', error);
        // Si hay un error al actualizar en la base de datos, revertir los cambios locales
        return;
      }

      // Actualizar el estado local
      setListaEspera(newListaEspera);
      setTurnoActual(newTurnoActual);
    }
  };

  return (
    <div className="container">
      <h3>Lista de Espera</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Dueño:</label>
          <input type="text" value={nombre} onChange={handleNombreChange} onBlur={checkForm} />
        </div>
        <div className="form-group">
          <label>Doctor/a:</label>
          <select value={doctor} onChange={handleDoctorChange} onBlur={checkForm}>
            <option value="">Seleccionar Doctor/a</option>
            <option value="Dra. Alejandra">Dra. Alejandra</option>
            <option value="Dr. Felipe">Dr. Felipe</option>
            <option value="Dr. Dominguez">Dr. Dominguez</option>
            <option value="Dra. Annai">Dra. Annai</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tipo de Mascota:</label>
          <input type="text" value={tipoMascota} onChange={handleTipoMascotaChange} onBlur={checkForm} />
        </div>
        <div className="form-group">
          <label>Fecha:</label>
          <input type="date" value={fecha} onChange={handleFechaChange} onBlur={checkForm} />
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <input type="time" value={hora} onChange={handleHoraChange} onBlur={checkForm} />
        </div>
        <div className="form-group">
          <label>Servicio:</label>
          <input type="text" value={servicio} onChange={handleServicioChange} onBlur={checkForm} />
        </div>
        <button type="submit" disabled={!formIsValid}>Agregar a la Lista de Espera</button>
      </form>

      <h3>Personas en Lista de Espera</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre del Dueño</th>
            <th>Doctor/a</th>
            <th>Tipo de Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Servicio</th>
            <th>Turno</th>
            <th className={`estado en-espera`}>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaEspera.map((person, index) => (
            <tr key={index}>
              <td>{person.nombre_dueño}</td>
              <td>{person.doctor}</td>
              <td>{person.tipo_mascota}</td>
              <td>{person.fecha}</td>
              <td>{person.hora}</td>
              <td>{person.servicio}</td>
              <td>{person.turno}</td>
              <td className={`estado ${person.estado.toLowerCase()}`}>{person.estado}</td>
              <td>
                {person.estado === 'Siendo atendido' && (
                  <button onClick={() => handleFinalizarCita(person.turno)}>Finalizar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Turno siendo atendido</h3>
        {Object.entries(turnoActual).map(([doctor, person]) => (
          <div key={doctor}>
            <p>{doctor}: {person.turno}</p>
          </div>
        ))}
        <button onClick={atenderSiguienteTurno}>Atender siguiente turno</button>
      </div>

      {/* Notificación de error */}
      <div className={`error-notification ${showError ? 'show' : ''}`}>
        Por favor, complete todos los campos.
      </div>
    </div>
  );
}

export default ListaEspera;
