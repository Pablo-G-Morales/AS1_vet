const express = require('express');
const router = express.Router();
const connection = require('../database');

// Obtener todas las citas del historial
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM historialcitas', (error, results, fields) => {
    if (error) {
      next(error);
      return;
    }
    res.json(results);
  });
});

// Crear una nueva cita en el historial
router.post('/', (req, res, next) => {
  const { nombreDueño, especieMascota, fecha, hora, servicio, estado } = req.body;
  connection.query(
    'INSERT INTO historialcitas (nombreDueño, especieMascota, fecha, hora, servicio, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [nombreDueño, especieMascota, fecha, hora, servicio, estado],
    (error, results, fields) => {
      if (error) {
        console.error('Error al insertar cita en el historial:', error);
        next(error);
        return;
      }
      console.log('Cita insertada correctamente en el historial');
      res.status(201).send('Cita insertada correctamente en el historial');
    }
  );
});

module.exports = router;
