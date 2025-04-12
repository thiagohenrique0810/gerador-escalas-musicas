import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';

// Lazy loading dos componentes de página
const Home = lazy(() => import('../pages/Home'));
const ScaleView = lazy(() => import('../pages/ScaleView'));
const ExerciseView = lazy(() => import('../pages/ExerciseView'));
const MetronomeView = lazy(() => import('../pages/MetronomeView'));
const SettingsView = lazy(() => import('../pages/SettingsView'));

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scales" element={<ScaleView />} />
        <Route path="/exercises" element={<ExerciseView />} />
        <Route path="/metronome" element={<MetronomeView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </Suspense>
  );
} 