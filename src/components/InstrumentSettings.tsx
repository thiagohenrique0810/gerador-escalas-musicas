import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  setCurrentTuning,
  addCustomTuning,
  removeCustomTuning,
  resetToDefaultTuning,
  Tuning,
} from '@store/slices/instrumentSettingsSlice';
import { useTranslation } from 'react-i18next';

const InstrumentSettings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentTuning, customTunings, selectedInstrument } = useSelector(
    (state: RootState) => state.instrumentSettings
  );

  const [newTuningName, setNewTuningName] = useState('');
  const [newTuningStrings, setNewTuningStrings] = useState<string[]>([]);

  const handleAddCustomTuning = () => {
    if (newTuningName && newTuningStrings.length > 0) {
      dispatch(
        addCustomTuning({
          name: newTuningName,
          strings: newTuningStrings,
        })
      );
      setNewTuningName('');
      setNewTuningStrings([]);
    }
  };

  const handleRemoveCustomTuning = (tuningName: string) => {
    dispatch(removeCustomTuning(tuningName));
  };

  const handleResetTuning = () => {
    dispatch(resetToDefaultTuning());
  };

  const handleTuningChange = (tuning: Tuning) => {
    dispatch(setCurrentTuning(tuning));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{t('instrumentSettings.title')}</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('instrumentSettings.currentTuning')}</h3>
        <div className="flex items-center space-x-2">
          <span className="font-medium">{currentTuning.name}:</span>
          <div className="flex space-x-2">
            {currentTuning.strings.map((note, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
              >
                {note}
              </span>
            ))}
          </div>
          <button
            onClick={handleResetTuning}
            className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('instrumentSettings.reset')}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('instrumentSettings.customTunings')}</h3>
        <div className="space-y-2">
          {customTunings.map((tuning) => (
            <div key={tuning.name} className="flex items-center space-x-2">
              <span className="font-medium">{tuning.name}:</span>
              <div className="flex space-x-2">
                {tuning.strings.map((note, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleTuningChange(tuning)}
                className="ml-2 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                {t('instrumentSettings.use')}
              </button>
              <button
                onClick={() => handleRemoveCustomTuning(tuning.name)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t('instrumentSettings.remove')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('instrumentSettings.addCustomTuning')}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('instrumentSettings.tuningName')}
            </label>
            <input
              type="text"
              value={newTuningName}
              onChange={(e) => setNewTuningName(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder={t('instrumentSettings.tuningNamePlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('instrumentSettings.strings')}
            </label>
            <div className="flex space-x-2">
              {Array.from({ length: selectedInstrument === 'bass' ? 4 : 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={newTuningStrings[index] || ''}
                  onChange={(e) => {
                    const newStrings = [...newTuningStrings];
                    newStrings[index] = e.target.value.toUpperCase();
                    setNewTuningStrings(newStrings);
                  }}
                  className="w-16 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder={t('instrumentSettings.notePlaceholder')}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleAddCustomTuning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t('instrumentSettings.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSettings; 