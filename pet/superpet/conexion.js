const oracledb = import('oracledb');

const dbConfig = {
  user: 'system',
  password: '1311',
  connectString: 'localhost/VETERINARIA' 
};

async function run() {
  let connection;

  try {
    // Establecer la conexión a la base de datos
    connection = await oracledb.getConnection(dbConfig);

    // Realizar operaciones en la base de datos aquí...

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  } finally {
    // Liberar la conexión
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

// Llamar a la función run para iniciar la conexión
run();
