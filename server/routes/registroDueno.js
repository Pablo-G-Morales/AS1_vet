const express = require('express');
const router = express.Router();
const connection = require('../database');

// Ruta para registrar un nuevo dueño
router.post('/', (req, res) => {
    const { identificacion, nombre, apellido, correo, telefono } = req.body;
    const sql = 'INSERT INTO duenos (identificacion, nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [identificacion, nombre, apellido, correo, telefono], (error, results, fields) => {
        if (error) {
            console.error('Error al insertar dueño:', error);
            return res.status(500).json({ error: 'Error al insertar dueño' });
        }
        console.log('Dueño insertado correctamente');
        return res.status(201).json({ message: 'Dueño insertado correctamente' });
    });
});

// Ruta para obtener todos los dueños
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM duenos';
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error al obtener dueños:', error);
            return res.status(500).json({ error: 'Error al obtener dueños' });
        }
        return res.status(200).json(results);
    });
});

// Ruta para eliminar un dueño
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM duenos WHERE id = ?';
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            console.error('Error al eliminar dueño:', error);
            return res.status(500).json({ error: 'Error al eliminar dueño' });
        }
        return res.status(200).json({ message: 'Dueño eliminado correctamente' });
    });
});

// Ruta para actualizar un dueño
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { identificacion, nombre, apellido, correo, telefono } = req.body;
    const sql = 'UPDATE duenos SET identificacion = ?, nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?';
    connection.query(sql, [identificacion, nombre, apellido, correo, telefono, id], (error, results, fields) => {
        if (error) {
            console.error('Error al actualizar dueño:', error);
            return res.status(500).json({ error: 'Error al actualizar dueño' });
        }
        return res.status(200).json({ message: 'Dueño actualizado correctamente' });
    });
});

module.exports = router;
