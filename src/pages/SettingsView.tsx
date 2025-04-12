import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTheme, setLanguage } from '../store/slices/settingsSlice';

const SettingsView: React.FC = () => {
  const dispatch = useDispatch();
  const { theme, language } = useSelector((state: RootState) => state.settings);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Aparência</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={(e) => dispatch(setTheme(e.target.value))}
                  className="mr-2"
                />
                Claro
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={(e) => dispatch(setTheme(e.target.value))}
                  className="mr-2"
                />
                Escuro
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={theme === 'system'}
                  onChange={(e) => dispatch(setTheme(e.target.value))}
                  className="mr-2"
                />
                Sistema
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Idioma</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="pt-BR"
                  checked={language === 'pt-BR'}
                  onChange={(e) => dispatch(setLanguage(e.target.value))}
                  className="mr-2"
                />
                Português
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="en-US"
                  checked={language === 'en-US'}
                  onChange={(e) => dispatch(setLanguage(e.target.value))}
                  className="mr-2"
                />
                English
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="es-ES"
                  checked={language === 'es-ES'}
                  onChange={(e) => dispatch(setLanguage(e.target.value))}
                  className="mr-2"
                />
                Español
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView; 