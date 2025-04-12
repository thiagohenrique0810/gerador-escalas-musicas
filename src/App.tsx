import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';

// Importação das páginas
import Home from './pages/Home';
import InstrumentSelection from './pages/InstrumentSelection';
import ScaleViewer from './pages/ScaleViewer';
import Metronome from './pages/Metronome';
import Settings from './pages/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instrumentos" element={<InstrumentSelection />} />
            <Route path="/escalas" element={<ScaleViewer />} />
            <Route path="/metronomo" element={<Metronome />} />
            <Route path="/configuracoes" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App; 