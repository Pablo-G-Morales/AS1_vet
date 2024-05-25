import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/FichaDueno.css';

function FichaDueno() {
  const [duenos, setDuenos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDueno, setEditingDueno] = useState(null);

  useEffect(() => {
    fetchDuenos();
  }, []);

  const fetchDuenos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dueno');
      setDuenos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de dueños:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este dueño?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/dueno/${id}`);
        fetchDuenos();
      } catch (error) {
        console.error('Error al eliminar el dueño:', error);
      }
    }
  };

  const handleEdit = (dueno) => {
    setEditingDueno(dueno);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingDueno((prevDueno) => ({
      ...prevDueno,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/dueno/${editingDueno.id}`, editingDueno);
      setEditingDueno(null);
      fetchDuenos();
    } catch (error) {
      console.error('Error al actualizar el dueño:', error);
    }
  };

  const filteredDuenos = duenos.filter((dueno) =>
    dueno.identificacion && dueno.identificacion.toString().includes(searchTerm.toString())
  );

  return (
    <div className="ficha-dueno">
      <h2>Ficha de Dueños</h2>
      <input
        type="text"
        placeholder="Buscar por identificación del dueño"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="dueno-list">
        {filteredDuenos.map((dueno) => (
          <div key={dueno.id} className="dueno-card">
            <h3>{dueno.nombre} {dueno.apellido}</h3>
            <p>ID: {dueno.id}</p>
            <p>Identificación: {dueno.identificacion}</p>
            <p>Correo: {dueno.correo}</p>
            <p>Teléfono: {dueno.telefono}</p>
            <button onClick={() => handleEdit(dueno)}>Editar</button>
            <button onClick={() => handleDelete(dueno.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      {editingDueno && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleEditSubmit} className="edit-form">
              <h2>Editar Dueño</h2>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={editingDueno.nombre}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={editingDueno.apellido}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="identificacion"
                placeholder="Identificación"
                value={editingDueno.identificacion}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="correo"
                placeholder="Correo"
                value={editingDueno.correo}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={editingDueno.telefono}
                onChange={handleEditChange}
              />
              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={() => setEditingDueno(null)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FichaDueno;
