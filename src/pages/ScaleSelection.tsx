import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { setSelectedTonic, setSelectedScale } from '../store/slices/scaleSlice';
import { Note, Scale, NOTES } from '../types/scales';

const ScaleSelection: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedTonic, selectedScale, availableScales } = useSelector((state: RootState) => state.scale);

  const handleTonicChange = (tonic: Note) => {
    dispatch(setSelectedTonic(tonic));
  };

  const handleScaleChange = (scale: Scale | null) => {
    dispatch(setSelectedScale(scale));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          {t('scale_selection')}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {t('select_scale_desc')}
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seletor de Tônica */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('tonic')}</h2>
          <div className="grid grid-cols-6 gap-2">
            {NOTES.map((note) => (
              <button
                key={note}
                onClick={() => handleTonicChange(note)}
                className={`p-2 rounded-lg text-center transition-colors duration-200 ${
                  selectedTonic === note
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </section>

        {/* Lista de Escalas */}
        <section className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('available_scales')}</h2>
          <div className="grid grid-cols-1 gap-4">
            {availableScales.map((scale) => (
              <button
                key={scale.type}
                onClick={() => handleScaleChange(scale)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedScale?.type === scale.type
                    ? 'bg-primary-100 border-2 border-primary-600'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <h3 className="text-lg font-medium text-gray-900">{t(scale.name)}</h3>
                <p className="mt-1 text-sm text-gray-600">{t(scale.description)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {scale.notes.map((note, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScaleSelection; 