import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activos, setActivos] = useState(0);
  const [inactivos, setInactivos] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/estudiantes')
      .then(res => {
        const estudiantes = res.data;
        const activosCount = estudiantes.filter(e => e.estado === 'Activo').length;
        const inactivosCount = estudiantes.filter(e => e.estado === 'Inactivo').length;
        setActivos(activosCount);
        setInactivos(inactivosCount);
      })
      .catch(err => console.error('Error al cargar estadísticas:', err));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="bg-green-500 p-4 rounded shadow">
          <h2 className="text-xl">Estudiantes activos</h2>
          <p className="text-3xl font-bold">{activos}</p>
        </div>
        <div className="bg-red-500 p-4 rounded shadow">
          <h2 className="text-xl">Estudiantes inactivos</h2>
          <p className="text-3xl font-bold">{inactivos}</p>
          <button
        onClick={() => navigate('/estudiantes')}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Administrar Estudiantes
      </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
