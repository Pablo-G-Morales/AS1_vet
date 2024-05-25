import React from 'react';
import './css/DuenoCard.css';

const DuenoCard = ({ dueno, onClick, onDelete, onEdit }) => {
    return (
        <div className="dueno-card">
            <p onClick={onClick}><strong>Identificación:</strong> {dueno.identificacion}</p>
            <p onClick={onClick}><strong>Nombre:</strong> {dueno.nombre}</p>
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
        </div>
    );
};

export default DuenoCard;
