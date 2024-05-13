const express = require('express');
const router = express.Router();
const connection = require('../database');

// Ruta para obtener todos los comentarios
router.get('/', (req, res) => {
  connection.query('SELECT * FROM comentariost', (error, results) => {
    if (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error al obtener comentarios' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un nuevo comentario
router.post('/', (req, res) => {
  const { texto, imagen_url } = req.body;
  connection.query('INSERT INTO comentariost (texto, imagen_url) VALUES (?, ?)', [texto, imagen_url], (error, results) => {
    if (error) {
      console.error('Error al agregar comentario:', error);
      res.status(500).json({ error: 'Error al agregar comentario' });
    } else {
      res.status(201).json({ message: 'Comentario agregado correctamente' });
    }
  });
});

// Ruta para votar positivamente por un comentario
router.put('/:id/votar/positivo', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE comentariost SET votos_positivos = votos_positivos + 1 WHERE id = ?', id, (error, results) => {
    if (error) {
      console.error('Error al votar por el comentario:', error);
      res.status(500).json({ error: 'Error al votar por el comentario' });
    } else {
      res.json({ message: 'Voto positivo registrado correctamente' });
    }
  });
});

// Ruta para votar negativamente por un comentario
router.put('/:id/votar/negativo', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE comentariost SET votos_negativos = votos_negativos + 1 WHERE id = ?', id, (error, results) => {
    if (error) {
      console.error('Error al votar por el comentario:', error);
      res.status(500).json({ error: 'Error al votar por el comentario' });
    } else {
      res.json({ message: 'Voto negativo registrado correctamente' });
    }
  });
});

module.exports = router;