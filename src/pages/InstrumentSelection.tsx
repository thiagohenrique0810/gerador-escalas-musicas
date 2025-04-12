import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInstrument } from '@store/slices/instrumentSlice';
import type { Instrument } from '@store/slices/instrumentSlice';

interface InstrumentCard {
  id: Instrument;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const instruments: InstrumentCard[] = [
  {
    id: 'violao',
    name: 'Violão',
    description: 'Aprenda escalas no violão clássico',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 2C9.5 2 7 3 7 6.5L6 10c-.5 1.5-.5 2.5 0 4l1 3.5c.5 1.5 2 2.5 3.5 2.5h3c1.5 0 3-1 3.5-2.5l1-3.5c.5-1.5.5-2.5 0-4L17 6.5C17 3 14.5 2 12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 6v12M9.5 8.5h5M9.5 11.5h5M9.5 14.5h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'guitarra',
    name: 'Guitarra',
    description: 'Pratique escalas na guitarra elétrica',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 2L9 5l-2 3L5 11l1 4c.5 2 2 3 4 3h4c2 0 3.5-1 4-3l1-4-2-3-2-3-3-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 7v10M9 9.5h6M9 12.5h6M9 15.5h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="19" r="1" fill="currentColor" />
        <circle cx="16" cy="19" r="1" fill="currentColor" />
        <path
          d="M7 5.5l10 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'baixo',
    name: 'Baixo',
    description: 'Explore escalas no baixo elétrico',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 2L8 5l-2 4-1 3 1 4c.5 2 2 3.5 4 3.5h4c2 0 3.5-1.5 4-3.5l1-4-1-3-2-4-4-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 7v10M8 10h8M8 13h8M8 16h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="20" r="1" fill="currentColor" />
        <circle cx="15" cy="20" r="1" fill="currentColor" />
        <path
          d="M6 6l12 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'teclado',
    name: 'Teclado',
    description: 'Estude escalas no teclado/piano',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M3 6h18v12H3V6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 6v8h2V6h2v8h2V6h2v8h2V6h2v8h2V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 14h16v4H4v-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.5 6v4h1V6M11.5 6v4h1V6M15.5 6v4h1V6"
          fill="currentColor"
        />
      </svg>
    ),
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
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Escolha seu Instrumento
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Selecione o instrumento que você deseja praticar
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {instruments.map((instrument) => (
          <button
            key={instrument.id}
            onClick={() => handleInstrumentSelect(instrument.id)}
            className="group p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl 
                     transition-all duration-300 text-left hover:-translate-y-1 
                     border border-gray-200/50"
          >
            <div className="aspect-square mb-4 bg-gradient-to-br from-primary-50 to-primary-100 
                          rounded-xl overflow-hidden p-6 text-primary-600 group-hover:text-primary-700 
                          transition-colors duration-300">
              {instrument.icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">{instrument.name}</h2>
            <p className="mt-2 text-gray-600">{instrument.description}</p>
          </button>
        ))}
      </main>
    </div>
  );
};

export default InstrumentSelection; 