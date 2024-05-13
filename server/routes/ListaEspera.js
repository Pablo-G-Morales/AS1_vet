// En listaEspera.js
const express = require('express');
const router = express.Router();
const connection = require('../database'); // Importa la conexión a la base de datos desde database.js

// Ruta para obtener todas las personas en lista de espera
router.get('/', (req, res) => {
  connection.query('SELECT * FROM lista_espera', (error, results, fields) => {
    if (error) {
      console.error('Error al obtener la lista de espera:', error);
      res.status(500).send('Error al obtener la lista de espera');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar una nueva persona a la lista de espera
router.post('/', (req, res) => {
  const { nombre_dueño, tipo_mascota, fecha, hora, servicio, doctor, turno, estado } = req.body;
  connection.query(
    'INSERT INTO lista_espera (nombre_dueño, tipo_mascota, fecha, hora, servicio, doctor, turno, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre_dueño, tipo_mascota, fecha, hora, servicio, doctor, turno, estado],
    (error, results, fields) => {
      if (error) {
        console.error('Error al insertar en la lista de espera:', error);
        res.status(500).send('Error al insertar en la lista de espera');
        return;
      }
      console.log('Persona insertada en la lista de espera');
      res.status(201).send('Persona insertada en la lista de espera');
    }
  );
});

// Ruta para actualizar el estado de una cita en la lista de espera
router.put('/:turno', (req, res) => {
  const { turno } = req.params;
  const { estado } = req.body;
  connection.query(
    'UPDATE lista_espera SET estado = ? WHERE turno = ?',
    [estado, turno],
    (error, results, fields) => {
      if (error) {
        console.error('Error al actualizar el estado de la cita:', error);
        res.status(500).send('Error al actualizar el estado de la cita');
        return;
      }
      console.log('Estado de la cita actualizado correctamente');
      res.status(200).send('Estado de la cita actualizado correctamente');
    }
  );
});

module.exports = router;
