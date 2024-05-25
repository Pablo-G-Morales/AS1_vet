// routes/ListaEspera.js
const express = require('express');
const router = express.Router();
const connection = require('../database');

// Función para obtener la lista de espera desde la base de datos
const obtenerListaEspera = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM lista', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Función para insertar o actualizar el estado en la tabla lista
const atenderCliente = async (datos) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO lista (dueno_id, nombre_dueno, apellido_dueno, especie_mascota, raza_mascota, doctor, fecha, hora, servicio, turno, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE estado = VALUES(estado)',
      [datos.duenoId, datos.nombreDueno, datos.apellidoDueno, datos.especieMascota, datos.razaMascota, datos.doctor, datos.fecha, datos.hora, datos.servicio, datos.turno, datos.estado],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Función para finalizar la atención del cliente
const finalizarAtencion = async (duenoId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE lista SET estado = "Finalizado" WHERE dueno_id = ?',
      [duenoId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Ruta para obtener la lista de espera
router.get('/', async (req, res) => {
  try {
    const listaEspera = await obtenerListaEspera();
    res.json(listaEspera);
  } catch (error) {
    console.error('Error al obtener la lista de espera:', error);
    res.status(500).send('Error al obtener la lista de espera');
  }
});

// Ruta para atender al cliente
router.post('/atender', async (req, res) => {
  const { duenoId, nombreDueno, apellidoDueno, especieMascota, razaMascota, doctor, fecha, hora, servicio, turno } = req.body;

  try {
    await atenderCliente({ duenoId, nombreDueno, apellidoDueno, especieMascota, razaMascota, doctor, fecha, hora, servicio, turno, estado: 'Siendo atendido' });
    res.status(200).send('Cliente atendido correctamente');
  } catch (error) {
    console.error('Error al atender al cliente:', error);
    res.status(500).send('Error al atender al cliente');
  }
});

// Ruta para finalizar la atención del cliente
router.post('/finalizar', async (req, res) => {
  const { duenoId } = req.body;

  try {
    await finalizarAtencion(duenoId);
    res.status(200).send('Atención finalizada correctamente');
  } catch (error) {
    console.error('Error al finalizar la atención:', error);
    res.status(500).send('Error al finalizar la atención');
  }
});

module.exports = router;

