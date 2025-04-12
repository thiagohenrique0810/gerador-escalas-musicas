import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import Fretboard from '../components/Fretboard';
import Keyboard from '../components/Keyboard';
import { Instrument } from '../store/slices/instrumentSlice';

const ScaleViewer: React.FC = () => {
  const { t } = useTranslation();
  const { selectedInstrument } = useSelector((state: RootState) => state.instrument);
  const { selectedScale } = useSelector((state: RootState) => state.scale);
  const [showFretboard, setShowFretboard] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [fretCount, setFretCount] = useState(12);

  if (!selectedInstrument || !selectedScale) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          {t('select_instrument_and_scale')}
        </div>
      </div>
    );
  }

  const getTuning = () => {
    switch (selectedInstrument) {
      case 'guitarra':
        return ['E', 'A', 'D', 'G', 'B', 'E'];
      case 'baixo':
        return ['E', 'A', 'D', 'G'];
      case 'violao':
        return ['E', 'A', 'D', 'G', 'B', 'E'];
      default:
        return ['C'];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho com informações da escala */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t(selectedScale.name)}
        </h1>
        <p className="text-gray-600 mb-4">
          {t('scale_notes')}: {selectedScale.notes.join(' - ')}
        </p>
        <p className="text-gray-600">
          {t(selectedScale.description)}
        </p>
      </div>

      {/* Controles de visualização */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('visualization_controls')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showFretboard"
              checked={showFretboard}
              onChange={(e) => setShowFretboard(e.target.checked)}
              className="h-4 w-4 text-primary-600"
            />
            <label htmlFor="showFretboard" className="text-gray-700">
              {t('show_fretboard')}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showKeyboard"
              checked={showKeyboard}
              onChange={(e) => setShowKeyboard(e.target.checked)}
              className="h-4 w-4 text-primary-600"
            />
            <label htmlFor="showKeyboard" className="text-gray-700">
              {t('show_keyboard')}
            </label>
          </div>
          {selectedInstrument !== 'teclado' && (
            <div className="flex items-center space-x-2">
              <label htmlFor="fretCount" className="text-gray-700">
                {t('fret_count')}:
              </label>
              <select
                id="fretCount"
                value={fretCount}
                onChange={(e) => setFretCount(Number(e.target.value))}
                className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="18">18</option>
                <option value="21">21</option>
                <option value="24">24</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Visualização do braço do instrumento */}
        {selectedInstrument !== 'teclado' && showFretboard && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('fretboard_view')}
            </h2>
            <Fretboard
              instrument={selectedInstrument}
              tuning={getTuning()}
              frets={fretCount}
            />
          </div>
        )}

        {/* Visualização do teclado */}
        {showKeyboard && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('keyboard_view')}
            </h2>
            <Keyboard octaves={2} startOctave={4} />
          </div>
        )}
      </div>

      {/* Seção de exercícios práticos */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('practice_exercises')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              {t('exercise_ascending')}
            </h3>
            <p className="text-gray-600">
              {t('exercise_ascending_desc')}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              {t('exercise_descending')}
            </h3>
            <p className="text-gray-600">
              {t('exercise_descending_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleViewer; 