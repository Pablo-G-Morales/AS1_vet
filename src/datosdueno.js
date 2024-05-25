import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './css/dueno.css';
import Notification from './Notificacion';

function RegistroDueño() {
    const [identificacion, setIdentificacion] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validar identificación
        if (!/^[0-9A-Za-z]{13}$/.test(identificacion)) {
            setError("Por favor ingrese una identificación válida (13 caracteres alfanuméricos).");
            return;
        }

        // Validar otros campos
        if (!nombre || !apellido || !correo || !telefono) {
            setError("Por favor complete todos los campos.");
            return;
        }

        // Enviar datos al backend
        fetch('http://localhost:5000/api/dueno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identificacion,
                nombre,
                apellido,
                correo,
                telefono,
            }),
        })
        .then(() => {
            // Aquí puedes mostrar un mensaje de éxito
            setNotification("Dueño registrado exitosamente.");
            // Redirigir a datosmascota.js
            window.location.href = '/registro-mascota'; // Cambia la ruta según la configuración de tu enrutador
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
            setError("Error al registrar dueño.");
        });

        // Limpiar campos y errores después de registrar
        setIdentificacion("");
        setNombre("");
        setApellido("");
        setCorreo("");
        setTelefono("");
        setError("");
    };

    return (
        <div className="container">
            <h2 style={{textAlign: "center"}}>Registro de Dueño</h2> {/* Añade el estilo directamente aquí */}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="identificacion">Identificación</label>
                    <input type="text" id="identificacion" name="identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required />
                </div>
            
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
            
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
            
                <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input type="email" id="correo" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </div>
            
                <button type="submit">Siguiente</button>
            </form>

            {/* Mostrar mensaje de error si existe */}
            {error && <div className="error-message">{error}</div>}

            {/* Mostrar notificación */}
            {notification && <Notification message={notification} setMessage={setNotification} />}
        </div>
    );
}

export default RegistroDueño;
