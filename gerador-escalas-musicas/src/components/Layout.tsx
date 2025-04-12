import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Início
              </Link>
              <Link
                to="/instrumentos"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/instrumentos')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Instrumentos
              </Link>
              <Link
                to="/escalas"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/escalas')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Escalas
              </Link>
              <Link
                to="/metronomo"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/metronomo')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Metrônomo
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                to="/configuracoes"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/configuracoes')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                Configurações
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

export default Layout; 