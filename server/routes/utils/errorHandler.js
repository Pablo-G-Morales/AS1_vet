const errorHandler = (error, res) => {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
      code: error.code,
      message: error.message,
    });
  };
  
  module.exports = { errorHandler };