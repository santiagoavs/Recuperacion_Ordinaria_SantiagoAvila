import { students } from '../data/students';

export default function Dashboard() {
  const activos = students.filter(s => s.estado === 'Activo').length;
  const inactivos = students.filter(s => s.estado === 'Inactivo').length;

  return (
    <section style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      <p>Estudiantes activos: {activos}</p>
      <p>Estudiantes inactivos: {inactivos}</p>
    </section>
  );
}
