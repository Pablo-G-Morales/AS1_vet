const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database');
const router = express.Router();


router.post('/login', (req, res) => {
    const { correoprofesional, contrasena } = req.body;

    connection.query('SELECT * FROM usuarios WHERE correoprofesional = ?', [correoprofesional], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        bcrypt.compare(contrasena, user.contrasena, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id, correoprofesional: user.correoprofesional }, SECRET_KEY, { expiresIn: '1h' });
                return res.json({ token });
            } else {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
        });
    });
});

router.post('/register', (req, res) => {
    const { nombre, contrasena, dpi, cargo, area, fechanacimiento, edad, telefono, correoprofesional, correopersonal, residencia, codigopostal, nit, fechaingreso, estadocivil } = req.body;

    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const sql = 'INSERT INTO usuarios (nombre, contrasena, dpi, cargo, area, fechanacimiento, edad, telefono, correoprofesional, correopersonal, residencia, codigopostal, nit, fechaingreso, estadocivil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [nombre, hash, dpi, cargo, area, fechanacimiento, edad, telefono, correoprofesional, correopersonal, residencia, codigopostal, nit, fechaingreso, estadocivil];

        connection.query(sql, values, (error) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(201).json({ message: 'User registered' });
        });
    });
});

module.exports = router;
