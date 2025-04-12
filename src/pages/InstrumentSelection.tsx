import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { setSelectedInstrument } from '@store/slices/instrumentSettingsSlice';
import { useTranslation } from 'react-i18next';
import InstrumentSettings from '@components/InstrumentSettings';

const InstrumentSelection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedInstrument = useSelector(
    (state: RootState) => state.instrumentSettings.selectedInstrument
  );

  const instruments = [
    { id: 'guitar', name: t('instruments.guitar'), icon: '🎸' },
    { id: 'bass', name: t('instruments.bass'), icon: '🎸' },
    { id: 'ukulele', name: t('instruments.ukulele'), icon: '🎸' },
    { id: 'keyboard', name: t('instruments.keyboard'), icon: '🎹' },
  ];

  const handleInstrumentSelect = (instrumentId: string) => {
    dispatch(setSelectedInstrument(instrumentId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('instrumentSelection.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('instrumentSelection.select')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {instruments.map((instrument) => (
              <button
                key={instrument.id}
                onClick={() => handleInstrumentSelect(instrument.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedInstrument === instrument.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{instrument.icon}</span>
                  <span className="text-lg font-medium">{instrument.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <InstrumentSettings />
        </div>
      </div>
    </div>
  );
};

export default InstrumentSelection; 