import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Gerador de Escalas Musicais</h1>
        <p className="mt-2 text-lg text-gray-600">
          Aprenda e pratique escalas musicais de forma interativa
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/instrumentos"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary-700">Instrumentos</h2>
          <p className="mt-2 text-gray-600">Escolha seu instrumento para começar</p>
        </Link>

        <Link
          to="/escalas"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary-700">Escalas</h2>
          <p className="mt-2 text-gray-600">Explore diferentes tipos de escalas</p>
        </Link>

        <Link
          to="/metronomo"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary-700">Metrônomo</h2>
          <p className="mt-2 text-gray-600">Pratique com o metrônomo</p>
        </Link>

        <Link
          to="/configuracoes"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary-700">Configurações</h2>
          <p className="mt-2 text-gray-600">Personalize sua experiência</p>
        </Link>
      </main>
    </div>
  );
};

export default Home; 