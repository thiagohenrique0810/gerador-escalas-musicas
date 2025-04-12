import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

const ScaleViewer: React.FC = () => {
  const selectedInstrument = useSelector((state: RootState) => state.instrument.selectedInstrument);
  const selectedScale = useSelector((state: RootState) => state.scale.selectedScale);

  if (!selectedInstrument) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">
          Por favor, selecione um instrumento primeiro
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Visualização de Escalas</h1>
        <p className="mt-2 text-lg text-gray-600">
          Instrumento selecionado: {selectedInstrument}
        </p>
      </header>

      <main>
        {selectedScale ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary-700">
              Escala {selectedScale.type} em {selectedScale.root}
            </h2>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Notas:</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedScale.notes.map((note, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              Selecione uma escala para visualizar
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScaleViewer; 