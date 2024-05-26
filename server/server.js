const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./database');
const actualizarContrasena = require('./Inserciones/actualizarContrasena');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas API
const citasRoutes = require('./routes/citas');
const listaEsperaRoutes = require('./routes/listaEspera');
const comentariosRoutes = require('./routes/coments');
const schedulesRoutes = require('./routes/schedules');
const registroDuenoRoutes = require('./routes/registroDueno');
const registroMascotasRoutes = require('./routes/registroMascotas');
const calendarioBackRoutes = require('./routes/CalendarioBack');
const authRoutes = require('./routes/auth');

app.use('/api/citas', citasRoutes);
app.use('/api/lista-espera', listaEsperaRoutes);
app.use('/api/comentariost', comentariosRoutes);
app.use('/api/schedules', schedulesRoutes);
app.use('/api/dueno', registroDuenoRoutes);
app.use('/api/mascotas', registroMascotasRoutes);
app.use('/api/CalendarioBack', calendarioBackRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// registrar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const user = req.body;
    const query = 'INSERT INTO usuarios SET ?';
    connection.query(query, user, (err, result) => {
        if (err) {
            console.error('Error registrando el usuario:', err);
            res.status(500).json({ error: 'Hubo un error registrando el usuario' });
            return;
        }
        console.log('Usuario registrado:', result);
        res.json({ message: 'Usuario registrado exitosamente' });
    });
});

// iniciar sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE correoprofesional = ? AND contrasena = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Error during login' });
            return;
        }
        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

// recuperar contraseña
app.post('/api/recuperar-contrasena', (req, res) => {
    const { email, password } = req.body;

    actualizarContrasena(email, password, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Hubo un error actualizando la contraseña' });
        } else {
            res.json({ message: 'Contraseña actualizada correctamente' });
        }
    });
});

// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});
