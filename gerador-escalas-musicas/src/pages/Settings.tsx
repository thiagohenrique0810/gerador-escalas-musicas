import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import {
  setMetronomeBpm,
  setMetronomeTimeSignature,
  setTheme,
  setLanguage,
} from '@store/slices/settingsSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { metronomeBpm, metronomeTimeSignature, theme, language } = useSelector(
    (state: RootState) => state.settings
  );

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value);
    dispatch(setMetronomeBpm(newBpm));
  };

  const handleTimeSignatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMetronomeTimeSignature(e.target.value));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Configurações</h1>
        <p className="mt-2 text-lg text-gray-600">
          Personalize sua experiência de aprendizado
        </p>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Metrônomo
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BPM Padrão: {metronomeBpm}
                </label>
                <input
                  type="range"
                  min="40"
                  max="208"
                  value={metronomeBpm}
                  onChange={handleBpmChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compasso Padrão
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
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Aparência
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tema
              </label>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="system">Sistema</option>
              </select>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Idioma</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idioma da Interface
              </label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </select>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings; 