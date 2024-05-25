import React, { useState, useEffect } from 'react';
import './css/DatosMascota.css';
import { useNavigate } from 'react-router-dom'; 
import Notification from './Notificacion'; // Importar el componente de notificación

function RegistroMascota() {
    const [dueños, setDueños] = useState([]);
    const [selectedDueño, setSelectedDueño] = useState({});
    const [mascota, setMascota] = useState({
        nombre: '',
        especie: '',
        raza: '',
        sexo: '',
        fechaNacimiento: '',
        vacunas: '',
        alergias: ''
    });
    const [error, setError] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/dueno')
            .then(response => response.json())
            .then(data => {
                setDueños(data);
            })
            .catch(error => console.error('Error al cargar los dueños:', error));
    }, []);

    const handleDueñoChange = (event) => {
        const selectedId = event.target.value;
        const selectedOwner = dueños.find(dueño => dueño.id === parseInt(selectedId));
        console.log(selectedOwner);
        setSelectedDueño(selectedOwner);
        setMascota({
            ...mascota,
            nombreDueño: selectedOwner.nombre || '',
            apellidoDueño: selectedOwner.apellido || '',
            correoDueño: selectedOwner.correo || '',
            telefonoDueño: selectedOwner.telefono || ''
        });
    };

    const handleMascotaChange = (event) => {
        const { name, value } = event.target;
        setMascota({ ...mascota, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!mascota.nombre || !mascota.especie || !mascota.raza || !mascota.sexo || !mascota.fechaNacimiento || !mascota.vacunas || !mascota.alergias) {
            setError('Por favor complete todos los campos.');
            return;
        }

        fetch('http://localhost:5000/api/mascotas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: mascota.nombre,
                especie: mascota.especie,
                raza: mascota.raza,
                sexo: mascota.sexo,
                fechaNacimiento: mascota.fechaNacimiento,
                vacunas: mascota.vacunas,
                alergias: mascota.alergias,
                dueñoId: selectedDueño.id
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .then(data => {
            setNotificationMessage('Mascota registrada exitosamente.');
            setTimeout(() => {
                setNotificationMessage('');
                navigate('/calendario'); 
            }, 3000);

            setMascota({
                nombre: '',
                especie: '',
                raza: '',
                sexo: '',
                fechaNacimiento: '',
                vacunas: '',
                alergias: ''
            });
            setError('');
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
            setError('Error al registrar la mascota.');
        });
    };

    return (
        <div className="container">
            <h2>Registro de Mascotas</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="dueño">Seleccionar Dueño:</label>
                    <select id="dueño" name="dueño" value={selectedDueño.id || ''} onChange={handleDueñoChange} required>
                        <option value="">Seleccionar Dueño</option>
                        {dueños.map(dueño => (
                            <option key={dueño.id} value={dueño.id}>{dueño.nombre} {dueño.apellido}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="nombreDueño">Nombre del Dueño:</label>
                    <input type="text" id="nombreDueño" name="nombreDueño" value={selectedDueño.nombre || ''} onChange={() => {}} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidoDueño">Apellido del Dueño:</label>
                    <input type="text" id="apellidoDueño" name="apellidoDueño" value={selectedDueño.apellido || ''} onChange={() => {}} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="correoDueño">Correo del Dueño:</label>
                    <input type="text" id="correoDueño" name="correoDueño" value={selectedDueño.correo || ''} onChange={() => {}} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="telefonoDueño">Teléfono del Dueño:</label>
                    <input type="text" id="telefonoDueño" name="telefonoDueño" value={selectedDueño.telefono || ''} onChange={() => {}} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de la Mascota:</label>
                    <input type="text" id="nombre" name="nombre" value={mascota.nombre} onChange={handleMascotaChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="especie">Especie:</label>
                    <input type="text" id="especie" name="especie" value={mascota.especie} onChange={handleMascotaChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="raza">Raza:</label>
                    <input type="text" id="raza" name="raza" value={mascota.raza} onChange={handleMascotaChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="sexo">Sexo:</label>
                    <select id="sexo" name="sexo" value={mascota.sexo} onChange={handleMascotaChange} required>
                        <option value="">Seleccione sexo</option>
                        <option value="macho">Macho</option>
                        <option value="hembra">Hembra</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={mascota.fechaNacimiento} onChange={handleMascotaChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="vacunas">Vacunas:</label>
                    <input type="text" id="vacunas" name="vacunas" value={mascota.vacunas} onChange={handleMascotaChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="alergias">Alergias:</label>
                    <input type="text" id="alergias" name="alergias" value={mascota.alergias} onChange={handleMascotaChange} required />
                </div>
                <input type="submit" value="Registrar mascota" />
            </form>
    
            {error && <div className="error">{error}</div>}
            <Notification message={notificationMessage} setMessage={setNotificationMessage} />
        </div>
    );
}

export default RegistroMascota;
