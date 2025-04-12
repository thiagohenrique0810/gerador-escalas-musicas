import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en-US', name: 'English' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all
            ${i18n.language === language.code
              ? 'bg-blue-500 text-white'
              : 'bg-blue-900/50 hover:bg-blue-700/50 text-white/80'}`}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector; 