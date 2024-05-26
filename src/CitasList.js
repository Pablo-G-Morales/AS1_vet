import React from 'react';
import CitaItem from './CitaItem';
import './css/CitasList.css'; 

const CitasList = ({ citas, onUpdate }) => {
  return (
    <div className="citas-list-container"> 
      <h2 className="citas-list-heading">Historial de Citas</h2>
      <div className="citas-list">
        {citas.map((cita, index) => (
          <div key={cita.id} className="cita-item-container"> 
            <CitaItem cita={cita} onUpdate={onUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitasList;
