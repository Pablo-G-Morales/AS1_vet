import React from 'react';
import './css/MascotaModal.css';

const MascotaModal = ({ mascota, onClose }) => {
    return (
        <div className="mascota-modal">
            <div className="mascota-modal-content">
                <h2>Detalles de la Mascota</h2>
                <p><strong>Nombre:</strong> {mascota.nombre}</p>
                <p><strong>Especie:</strong> {mascota.especie}</p>
                <p><strong>Raza:</strong> {mascota.raza}</p>
                <p><strong>Sexo:</strong> {mascota.sexo}</p>
                <p><strong>Fecha de Nacimiento:</strong> {mascota.fechaNacimiento}</p>
                <p><strong>Vacunas:</strong> {mascota.vacunas}</p>
                <p><strong>Alergias:</strong> {mascota.alergias}</p>
                <p><strong>Dueño ID:</strong> {mascota.dueñoid}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default MascotaModal;
