const express = require('express');
const router = express.Router();
const connection = require('../database');

// Ruta para registrar una mascota
router.post('/', (req, res) => {
    const { nombre, especie, raza, sexo, fechaNacimiento, vacunas, alergias, dueñoId } = req.body;

    if (!nombre || !especie || !raza || !sexo || !fechaNacimiento || !vacunas || !alergias || !dueñoId) {
        console.error('Todos los campos son obligatorios');
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO mascotas (nombre, especie, raza, sexo, fechaNacimiento, vacunas, alergias, dueñoId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, especie, raza, sexo, fechaNacimiento, vacunas, alergias, dueñoId];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al registrar la mascota:', error);
            return res.status(500).json({ error: 'Error al registrar la mascota' });
        }

        res.status(201).json({ message: 'Mascota registrada exitosamente', id: results.insertId });
    });
});

// Ruta para obtener la lista de mascotas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM mascotas';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de mascotas:', error);
            return res.status(500).json({ error: 'Error al obtener la lista de mascotas' });
        }

        res.json(results);
    });
});

// Ruta para actualizar una mascota
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, sexo, fechaNacimiento, vacunas, alergias, dueñoId } = req.body;

    const query = 'UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, sexo = ?, fechaNacimiento = ?, vacunas = ?, alergias = ?, dueñoId = ? WHERE id = ?';
    const values = [nombre, especie, raza, sexo, fechaNacimiento, vacunas, alergias, dueñoId, id];

    connection.query(query, values, (error) => {
        if (error) {
            console.error('Error al actualizar la mascota:', error);
            return res.status(500).json({ error: 'Error al actualizar la mascota' });
        }

        res.json({ message: 'Mascota actualizada exitosamente' });
    });
});

// Ruta para eliminar una mascota
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM mascotas WHERE id = ?';
    
    connection.query(query, [id], (error) => {
        if (error) {
            console.error('Error al eliminar la mascota:', error);
            return res.status(500).json({ error: 'Error al eliminar la mascota' });
        }

        res.json({ message: 'Mascota eliminada exitosamente' });
    });
});

module.exports = router;
