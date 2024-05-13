const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./database');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas API
const citasRoutes = require('./routes/citas');
const listaEsperaRoutes = require('./routes/ListaEspera');
const comentariosRoutes = require('./routes/coments');
const schedulesRoutes = require('./routes/schedules');

app.use('/api/citas', citasRoutes);
app.use('/api/lista-espera', listaEsperaRoutes);
app.use('/api/comentariost', comentariosRoutes);
app.use('/api/schedules', schedulesRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
