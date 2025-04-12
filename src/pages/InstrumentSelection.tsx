import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInstrument } from '../store/slices/instrumentSlice';
import type { Instrument } from '../store/slices/instrumentSlice';
import { GiGuitarHead, GiPianoKeys, GiGuitar } from 'react-icons/gi';

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
    icon: <GiGuitarHead className="w-full h-full" />,
  },
  {
    id: 'guitarra',
    name: 'Guitarra',
    description: 'Pratique escalas na guitarra elétrica',
    icon: <GiGuitar className="w-full h-full" />,
  },
  {
    id: 'baixo',
    name: 'Baixo',
    description: 'Explore escalas no baixo elétrico',
    icon: <GiGuitar className="w-full h-full transform rotate-180" />,
  },
  {
    id: 'teclado',
    name: 'Teclado',
    description: 'Estude escalas no teclado/piano',
    icon: <GiPianoKeys className="w-full h-full" />,
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