const express = require('express');
const router = express.Router();
const connection = require('../database');

// Obtener todos los horarios
router.get('/', (req, res) => {
  connection.query('SELECT * FROM schedules', (error, results) => {
    if (error) {
      console.error('Error al obtener los horarios:', error);
      return res.status(500).json({ error: 'Error del servidor al obtener los horarios' });
    }
    res.set('Content-Type', 'application/json');
    return res.status(200).send(JSON.stringify(results));
  });
});

// Insertar un nuevo horario
router.post('/', (req, res) => {
  const { day_name, activity_name, start_time, end_time } = req.body;

  // Verificar si las horas de inicio y fin son válidas
  if (!start_time || !end_time) {
    return res.status(400).json({ error: 'Las horas de inicio y fin son requeridas' });
  }

  connection.query('INSERT INTO schedules (day_name, activity_name, start_time, end_time) VALUES (?, ?, ?, ?)', [day_name, activity_name, start_time, end_time], (error, results) => {
    if (error) {
      console.error('Error al insertar el horario:', error);
      return res.status(500).json({ error: 'Error del servidor al insertar el horario' });
    }
    res.set('Content-Type', 'application/json');
    return res.status(201).send(JSON.stringify({ message: 'Horario insertado correctamente' }));
  });
});

module.exports = router;