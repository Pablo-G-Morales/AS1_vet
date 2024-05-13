const express = require('express');
const router = express.Router();
const connection = require('../database'); // Importa la conexión a la base de datos desde database.js

// Obtener todas las citas
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM citas', (error, results, fields) => {
    if (error) {
      next(error);
      return;
    }
    res.json(results);
  });
});

// Crear una nueva cita
router.post('/', (req, res, next) => {
  const { id, nombreDueño, tipoMascota, fecha, hora, servicio, estado } = req.body; // Agregamos el campo id
  console.log('Datos recibidos en el backend:', req.body); // Agregado para depurar
  connection.query(
    'INSERT INTO citas (id, nombreDueño, tipoMascota, fecha, hora, servicio, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', // Incluimos id en la inserción
    [id, nombreDueño, tipoMascota, fecha, hora, servicio, estado],
    (error, results, fields) => {
      if (error) {
        console.error('Error al insertar cita en la base de datos:', error); // Agregado para depurar
        next(error);
        return;
      }
      console.log('Cita insertada correctamente en la base de datos'); // Agregado para depurar
      res.status(201).send('Cita insertada correctamente');
    }
  );
});

module.exports = router;
