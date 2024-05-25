//actualizarContrasena.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Pon tu contraseña si la tienes
  database: 'datospacientes'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

const actualizarContrasena = (email, newPassword, callback) => {
  const query = 'UPDATE usuarios SET contrasena = ? WHERE correoprofesional = ?';
  connection.query(query, [newPassword, email], (err, result) => {
    if (err) {
      console.error('Error actualizando la contraseña:', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = actualizarContrasena;
