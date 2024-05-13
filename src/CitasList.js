// CitasList.js

import React from 'react';
import CitaItem from './CitaItem';

const CitasList = ({ citas, onUpdate }) => {
  return (
    <div>
      <center>
        <h2>Historial de Citas</h2>
      </center>
      <ul>
        {citas.map((cita, index) => (
          <CitaItem key={cita.id} cita={cita} onUpdate={onUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default CitasList;

