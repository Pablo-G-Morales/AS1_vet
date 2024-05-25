import React from 'react';
import CitaItem from './CitaItem';
import './css/CitasList.css'; // Importar el archivo de estilos CSS

const CitasList = ({ citas, onUpdate }) => {
  return (
    <div className="citas-list-container"> {/* Aplicar una clase CSS para el contenedor */}
      <h2 className="citas-list-heading">Historial de Citas</h2>
      <div className="citas-list">
        {citas.map((cita, index) => (
          <div key={cita.id} className="cita-item-container"> {/* Contenedor de cada cita */}
            <CitaItem cita={cita} onUpdate={onUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitasList;
