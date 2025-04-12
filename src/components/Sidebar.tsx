import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme } = useSelector((state: RootState) => state.settings);

  const menuItems = [
    { path: '/', label: t('menu_instruments'), icon: '🎸' },
    { path: '/escalas', label: t('menu_scales'), icon: '🎵' },
    { path: '/visualizacao', label: t('menu_visualization'), icon: '📊' },
    { path: '/metronomo', label: t('menu_metronome'), icon: '⏱️' },
    { path: '/configuracoes', label: t('menu_settings'), icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('app_title')}
        </h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              location.pathname === item.path
                ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-primary-500'
                : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 