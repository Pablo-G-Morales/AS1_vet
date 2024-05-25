//insertarregistro.js
const express = require('express');
const bodyParser = require('body-parser');
const updatePassword = require('./updatePassword');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/recuperar-contraseña', (req, res) => {
  const { email, password } = req.body;

  // Llama a la función que actualiza la contraseña
  updatePassword(email, password);

  // Envía una respuesta al cliente
  res.send('Contraseña actualizada correctamente.');
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
