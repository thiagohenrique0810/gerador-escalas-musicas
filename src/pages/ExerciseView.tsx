import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import InteractivityControls from '../components/InteractivityControls';
import ScaleDiagram from '../components/ScaleDiagram';

const ExerciseView: React.FC = () => {
  const { selectedScale, selectedKey } = useSelector((state: RootState) => state.scale);
  const { selectedInstrument } = useSelector((state: RootState) => state.instrument);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exercícios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Diagrama da Escala</h2>
          <ScaleDiagram
            scale={selectedScale}
            key={selectedKey}
            instrument={selectedInstrument}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Controles de Interatividade</h2>
          <InteractivityControls />
        </div>
      </div>
    </div>
  );
};

export default ExerciseView; 