import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import {
  setLanguage,
  setTheme,
  setMetronomeBpm,
  setMetronomeTimeSignature,
} from '../store/slices/settingsSlice';
import { Theme } from '../types/settings';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    language,
    theme,
    metronomeBpm,
    metronomeTimeSignature,
  } = useSelector((state: RootState) => state.settings);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as Theme));
  };

  const handleMetronomeBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMetronomeBpm(Number(e.target.value)));
  };

  const handleTimeSignatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMetronomeTimeSignature(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('settings_title')}
          </h1>

          <div className="space-y-6">
            {/* Idioma */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('settings_language')}
              </label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>

            {/* Tema */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('settings_theme')}
              </label>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="light">{t('settings_theme_light')}</option>
                <option value="dark">{t('settings_theme_dark')}</option>
                <option value="system">{t('settings_theme_system')}</option>
              </select>
            </div>

            {/* BPM do Metrônomo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('settings_metronome_bpm')}
              </label>
              <input
                type="range"
                min="40"
                max="208"
                value={metronomeBpm}
                onChange={handleMetronomeBpmChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 text-sm text-gray-500">
                {metronomeBpm} BPM
              </div>
            </div>

            {/* Compasso do Metrônomo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('settings_metronome_time_signature')}
              </label>
              <select
                value={metronomeTimeSignature}
                onChange={handleTimeSignatureChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="2/4">2/4</option>
                <option value="3/4">3/4</option>
                <option value="4/4">4/4</option>
                <option value="6/8">6/8</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 