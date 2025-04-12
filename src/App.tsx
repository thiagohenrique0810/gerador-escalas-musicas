import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@store/index';
import Layout from '@components/Layout';
import './i18n/config';

// Importação das páginas
import Home from '@pages/Home';
import InstrumentSelection from '@pages/InstrumentSelection';
import ScaleSelection from '@pages/ScaleSelection';
import Metronome from '@pages/Metronome';
import Settings from '@pages/Settings';
import Profile from '@pages/Profile';
import { loadUserData } from '@store/slices/userSlice';
import { RootState } from '@store/index';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instrumentos" element={<InstrumentSelection />} />
          <Route path="/escalas" element={<ScaleSelection />} />
          <Route path="/metronomo" element={<Metronome />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App; 