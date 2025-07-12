import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h1 className="text-3xl font-bold mb-6 animate-fade-in">¡Bienvenido a la escuelita!</h1>
      <p>Cargando...</p>  
      <PacmanLoader color="#ffffff" size={40} />
    </div>
  );
};

export default Welcome;
