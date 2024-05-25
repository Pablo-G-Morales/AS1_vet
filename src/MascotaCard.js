import React from 'react';
import './css/MascotaCard.css';

const MascotaCard = ({ mascota, onClick, onDelete, onEdit }) => {
    return (
        <div className="mascota-card" onClick={onClick}>
            <p><strong>Dueño ID:</strong> {mascota.dueñoid}</p>
            <p><strong>Nombre:</strong> {mascota.nombre}</p>
            <p><strong>Especie:</strong> {mascota.especie}</p>
            <p><strong>Raza:</strong> {mascota.raza}</p>
            <p><strong>Sexo:</strong> {mascota.sexo}</p>
            <button onClick={(e) => {e.stopPropagation(); onEdit(mascota);}}>Editar</button>
            <button onClick={(e) => {e.stopPropagation(); onDelete(mascota.id);}}>Eliminar</button>
        </div>
    );
};

export default MascotaCard;
