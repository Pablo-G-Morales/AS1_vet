const express = require('express');
const router = express.Router();
const connection = require('../database');

router.post('/', (req, res) => {
    const { nombre, fecha, doctor, duracion, horario, servicio, dueno_id } = req.body;

    if (!nombre || !fecha || !doctor || !duracion || !horario || !servicio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO CalendarioCitas (nombre, fecha, doctor, duracion, horario, servicio, dueno_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, fecha, doctor, duracion, horario, servicio, dueno_id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al agendar la cita:', error);
            return res.status(500).json({ error: 'Error al agendar la cita' });
        }

        res.status(201).json({ message: 'Cita agendada correctamente' });
    });
});

// Ruta para obtener todas las citas agendadas
router.get('/', (req, res) => {
    connection.query('SELECT * FROM CalendarioCitas', (error, results, fields) => {
        if (error) {
            console.error('Error al obtener las citas agendadas:', error);
            res.status(500).json({ error: 'Error al obtener las citas agendadas' });
            return;
        }

        res.json(results);
    });
});

router.get('/doctor-schedule', (req, res) => {
    const { day_name, doctor } = req.query;

    const daysMapping = {
        'Lunes': 'Monday',
        'Martes': 'Tuesday',
        'Miércoles': 'Wednesday',
        'Jueves': 'Thursday',
        'Viernes': 'Friday'
    };

    const dayEnglish = daysMapping[day_name];

    const query = `
        SELECT duenos.nombre, duenos.apellido, mascotas.especie, mascotas.raza, calendariocitas.fecha, calendariocitas.horario, calendariocitas.servicio
        FROM calendariocitas
        JOIN duenos ON calendariocitas.dueno_id = duenos.id
        JOIN mascotas ON mascotas.dueñoId = duenos.id
        WHERE calendariocitas.doctor = ? AND DAYNAME(calendariocitas.fecha) = ?;
    `;

    connection.query(query, [doctor, dayEnglish], (error, results) => {
        if (error) {
            console.error('Error al obtener el horario del doctor:', error);
            return res.status(500).json({ error: 'Error al obtener el horario del doctor' });
        }

        res.json(results);
    });
});

module.exports = router;
