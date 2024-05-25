import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/FichaMascotas.css';

function FichaMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [editingMascota, setEditingMascota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/mascotas');
      setMascotas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
      setError('Error al obtener la lista de mascotas. Por favor, intenta de nuevo más tarde.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/mascotas/${id}`);
        fetchMascotas();
      } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        setError('Error al eliminar la mascota. Por favor, intenta de nuevo más tarde.');
      }
    }
  };

  const handleEdit = (mascota) => {
    setEditingMascota(mascota);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingMascota((prevMascota) => ({
      ...prevMascota,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/mascotas/${editingMascota.id}`, editingMascota);
      setEditingMascota(null);
      fetchMascotas();
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      setError('Error al actualizar la mascota. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="ficha-mascotas">
      <h2>Ficha de Mascotas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="mascota-list">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="mascota-card">
              <h3>{mascota.nombre}</h3>
              <p>ID del due: {mascota.dueñoId}</p>
              <p>Especie: {mascota.especie}</p>
              <p>Raza: {mascota.raza}</p>
              <p>Sexo: {mascota.sexo}</p>
              <p>Fecha de Nacimiento: {new Date(mascota.fechaNacimiento).toISOString().split('T')[0]}</p>
              <p>Vacunas: {mascota.vacunas}</p>
              <p>Alergias: {mascota.alergias}</p>
              <button onClick={() => handleEdit(mascota)}>Editar</button>
              <button onClick={() => handleDelete(mascota.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      {editingMascota && (
        <div className="modal">
          <form onSubmit={handleEditSubmit} className="edit-form">
            <h2>Editar Mascota</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editingMascota.nombre}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="especie"
              placeholder="Especie"
              value={editingMascota.especie}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="raza"
              placeholder="Raza"
              value={editingMascota.raza}
              onChange={handleEditChange}
            />
            <select name="sexo" value={editingMascota.sexo} onChange={handleEditChange}>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
            <input
              type="date"
              name="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              value={editingMascota.fechaNacimiento}
              onChange={handleEditChange}
            />
            <textarea
              name="vacunas"
              placeholder="Vacunas"
              value={editingMascota.vacunas}
              onChange={handleEditChange}
            />
            <textarea
              name="alergias"
              placeholder="Alergias"
              value={editingMascota.alergias}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="duenoNombre"
              placeholder="Nombre del Dueño"
              value={editingMascota.duenoNombre}
              onChange={handleEditChange}
            />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setEditingMascota(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FichaMascotas;
