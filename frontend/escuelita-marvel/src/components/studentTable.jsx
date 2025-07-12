import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/estudiantes';

const initialForm = {
  carnet: '',
  nombre: '',
  apellido: '',
  grado: '',
  estado: 'Activo'
};

const StudentTable = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const res = await axios.get(API_URL);
      setEstudiantes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm(initialForm);
      setEditId(null);
      fetchEstudiantes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = estudiante => {
    setForm({
      carnet: estudiante.carnet,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      grado: estudiante.grado,
      estado: estudiante.estado
    });
    setEditId(estudiante._id);
  };

  const handleDelete = async id => {
    if (confirm('¿Seguro que querés eliminar este estudiante?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEstudiantes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editId ? 'Editar estudiante' : 'Agregar estudiante'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-6">
        {['carnet', 'nombre', 'apellido', 'grado'].map(field => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="border p-2"
            required
          />
        ))}
        <select name="estado" value={form.estado} onChange={handleChange} className="border p-2">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit" className="col-span-5 bg-blue-600 text-white py-2 hover:bg-blue-700">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Estudiantes registrados</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Carnet</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Apellido</th>
            <th className="border px-2 py-1">Grado</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est._id}>
              <td className="border px-2 py-1">{est.carnet}</td>
              <td className="border px-2 py-1">{est.nombre}</td>
              <td className="border px-2 py-1">{est.apellido}</td>
              <td className="border px-2 py-1">{est.grado}</td>
              <td className="border px-2 py-1">{est.estado}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleEdit(est)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => handleDelete(est._id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
