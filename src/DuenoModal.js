import React from 'react';
import './css/DuenoModal.css';

const DuenoModal = ({ dueno, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Detalles del Dueño</h2>
                <p><strong>Identificación:</strong> {dueno.identificacion}</p>
                <p><strong>Nombre:</strong> {dueno.nombre}</p>
                <p><strong>Apellido:</strong> {dueno.apellido}</p>
                <p><strong>Correo:</strong> {dueno.correo}</p>
                <p><strong>Teléfono:</strong> {dueno.telefono}</p>
            </div>
        </div>
    );
};

export default DuenoModal;
