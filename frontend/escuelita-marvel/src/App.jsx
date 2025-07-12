import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome';
import Dashboard from './components/dashboard';
import StudentTable from './components/studentTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estudiantes" element={<StudentTable />} />
      </Routes>
    </Router>
  );
}

export default App;
