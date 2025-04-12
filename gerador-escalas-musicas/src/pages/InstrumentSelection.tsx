import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInstrument } from '@store/slices/instrumentSlice';
import type { Instrument } from '@store/slices/instrumentSlice';

interface InstrumentCard {
  id: Instrument;
  name: string;
  description: string;
  image: string;
}

const instruments: InstrumentCard[] = [
  {
    id: 'violao',
    name: 'Violão',
    description: 'Aprenda escalas no violão clássico',
    image: '/assets/violao.jpg',
  },
  {
    id: 'guitarra',
    name: 'Guitarra',
    description: 'Pratique escalas na guitarra elétrica',
    image: '/assets/guitarra.jpg',
  },
  {
    id: 'baixo',
    name: 'Baixo',
    description: 'Explore escalas no baixo elétrico',
    image: '/assets/baixo.jpg',
  },
  {
    id: 'teclado',
    name: 'Teclado',
    description: 'Estude escalas no teclado/piano',
    image: '/assets/teclado.jpg',
  },
];

const InstrumentSelection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInstrumentSelect = (instrument: Instrument) => {
    dispatch(setInstrument(instrument));
    navigate('/escalas');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Escolha seu Instrumento</h1>
        <p className="mt-2 text-lg text-gray-600">
          Selecione o instrumento que você deseja praticar
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instruments.map((instrument) => (
          <button
            key={instrument.id}
            onClick={() => handleInstrumentSelect(instrument.id)}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={instrument.image}
                alt={instrument.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-primary-700">{instrument.name}</h2>
            <p className="mt-2 text-gray-600">{instrument.description}</p>
          </button>
        ))}
      </main>
    </div>
  );
};

export default InstrumentSelection; 