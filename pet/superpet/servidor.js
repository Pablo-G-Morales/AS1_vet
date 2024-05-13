// En tu archivo de servidor Node.js

const express = import('express');
const app = express();
const oracledb = import('oracledb');
const bodyParser = import('body-parser');

app.use(bodyParser.json());

// Configura la conexión a Oracle
oracledb.initOracleClient({});

const dbConfig = {
  user: 'system',
  password: '1311',
  connectString: 'localhost/orcldb' // Cambia esto por tu cadena de conexión Oracle
};

// Ruta para crear una nueva mascota
app.post('/mascotas', async (req, res) => {
  try {
    const { nombre, especie, raza, dueno } = req.body;
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO MASCOTA (nombre, especie, raza, dueno) VALUES (:nombre, :especie, :raza, :dueno)`,
      { nombre, especie, raza, dueno },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).send('Mascota creada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la mascota');
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});