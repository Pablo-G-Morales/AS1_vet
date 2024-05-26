import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/comentarios.css';

// Importar las imágenes
import perro_comentarios from './images/perro_comentarios.png';
import gato_comentarios from './images/gato_comentarios.png';
import flecha_arriba from './images/flecha_arriba.png';
import flecha_abajo from './images/flecha_abajo.png';

function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [error, setError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const baseURL = 'http://localhost:5000/api'; 

  useEffect(() => {
    // Función para obtener los comentarios desde el backend
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`${baseURL}/comentariosT`);
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };

    // Llamar a la función para cargar los comentarios al montar el componente
    fetchComentarios();
  }, []);

  // Función para manejar cambios en el input del nuevo comentario
  const handleInputChange = (event) => {
    setNuevoComentario(event.target.value);
    setError('');
    setErrorVisible(false); // Ocultar el mensaje de error al escribir en el input
  };

  // Función para enviar un nuevo comentario al backend
  const enviarComentario = async () => {
    if (!nuevoComentario.trim()) {
      setError('El comentario no puede estar vacío');
      setErrorVisible(true); // Mostrar el mensaje de error
      setTimeout(() => {
        setErrorVisible(false); // Ocultar el mensaje de error después de 3 segundos
      }, 3000);
      return;
    }

    try {
      await axios.post(`${baseURL}/comentariosT`, { texto: nuevoComentario });
      // Actualizar la lista de comentarios después de agregar uno nuevo
      const response = await axios.get(`${baseURL}/comentariosT`);
      setComentarios(response.data);
      // Limpiar el input del nuevo comentario después de enviarlo
      setNuevoComentario('');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  const votarComentario = async (id, tipo) => {
    try {
      await axios.put(`${baseURL}/comentariosT/${id}/votar/${tipo}`);
      const response = await axios.get(`${baseURL}/comentariosT`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al votar comentario:', error);
    }
  };

  return (
    <div className="comentarios-container">
      <div className="header">
        <img src={perro_comentarios} alt="Perro Comentarios" className="comentarios-image" />
        <h2 className="comentarios-title">Comentarios</h2> {/* Aplicamos un estilo al título de comentarios */}
      </div>

      <div className="input-container">
        <input type="text" placeholder="Ingresa tu comentario" value={nuevoComentario} onChange={handleInputChange} />
        <button onClick={enviarComentario}>Enviar</button>
      </div>

      {errorVisible && (
        <div className="error-box">
          <p className="error-message">{error}</p>
        </div>
      )}

      <div className="cantidad-comentarios">
        <p>{comentarios.length} Comentarios</p>
      </div>

      <div className="lista-comentarios">
        {comentarios.map((comentario, index) => (
          <div key={comentario.id} className="comentario">
            <img src={gato_comentarios} alt="Gato Comentario" className="comentario-image" />
            <p>{comentario.texto}</p>
            <div className="votos">
              <img src={flecha_arriba} alt="Flecha Arriba" className="voto-arriba" onClick={() => votarComentario(comentario.id, 'positivo')} />
              <img src={flecha_abajo} alt="Flecha Abajo" className="voto-abajo" onClick={() => votarComentario(comentario.id, 'negativo')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comentarios;
