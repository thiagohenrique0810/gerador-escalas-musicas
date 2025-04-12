import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';

// Importação das páginas
import Home from './pages/Home';
import InstrumentSelection from './pages/InstrumentSelection';
import ScaleViewer from './pages/ScaleViewer';
import Metronome from './pages/Metronome';
import Settings from './pages/Settings';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout><Home /></Layout>,
    },
    {
      path: '/instrumentos',
      element: <Layout><InstrumentSelection /></Layout>,
    },
    {
      path: '/escalas',
      element: <Layout><ScaleViewer /></Layout>,
    },
    {
      path: '/metronomo',
      element: <Layout><Metronome /></Layout>,
    },
    {
      path: '/configuracoes',
      element: <Layout><Settings /></Layout>,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
  }
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App; 