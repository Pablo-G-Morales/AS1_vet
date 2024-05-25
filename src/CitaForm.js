// CitaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field } from 'formik';
import './css/CitaForm.css';

const CitaForm = () => {
  // Estado local para almacenar los datos de las citas
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Función para obtener las citas de la base de datos
  const fetchCitas = () => {
    axios.get('http://localhost:5000/api/citas')
      .then(response => {
        setCitas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener citas:', error);
        setError('Error al obtener citas. Por favor, inténtelo de nuevo más tarde.');
      });
  };

  // Llamar a fetchCitas al montar el componente
  useEffect(() => {
    fetchCitas();
  }, []);

  const handleSubmit = (values) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    // Enviar los datos del formulario al backend
    axios.post('http://localhost:5000/api/citas', values)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        console.log('Cita insertada correctamente');
        setSuccess(true);
        setLoading(false);
        // Después de agregar una nueva cita, volver a cargar la lista de citas
        fetchCitas();
      })
      .catch(error => {
        console.error('Error al insertar cita en el backend:', error);
        setError('Error al insertar cita. Por favor, inténtelo de nuevo más tarde.');
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Mostrar citas existentes */}
    </div>
  );
};

export default CitaForm;
