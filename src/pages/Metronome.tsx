import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMetronomeBpm, setMetronomeTimeSignature } from '../store/slices/settingsSlice';

const Metronome: React.FC = () => {
  const dispatch = useDispatch();
  const { metronomeBpm, metronomeTimeSignature } = useSelector(
    (state: RootState) => state.settings
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Inicializa o contexto de áudio
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playClick = () => {
    if (!audioContextRef.current) return;

    const time = audioContextRef.current.currentTime;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    // Configura o oscilador
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.setValueAtTime(1000, time);

    // Configura o envelope do som
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(1, time + 0.001);
    gainNode.gain.linearRampToValueAtTime(0, time + 0.05);

    // Toca o som
    oscillator.start(time);
    oscillator.stop(time + 0.05);
  };

  const startMetronome = () => {
    if (!audioContextRef.current) return;

    // Garante que o contexto de áudio está ativo
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    setIsPlaying(true);
    playClick(); // Toca imediatamente ao iniciar

    // Calcula o intervalo baseado no BPM
    const interval = (60 / metronomeBpm) * 1000; // Converte BPM para milissegundos
    intervalRef.current = window.setInterval(playClick, interval);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Atualiza o intervalo quando o BPM muda
  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  }, [metronomeBpm]);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value);
    dispatch(setMetronomeBpm(newBpm));
  };

  const handleTimeSignatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMetronomeTimeSignature(e.target.value));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-600">Metrônomo</h1>
        <p className="mt-2 text-lg text-gray-600">
          Ajuste o tempo e o compasso para praticar
        </p>
      </header>

      <main className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BPM: {metronomeBpm}
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compasso
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

          <div className="flex justify-center">
            <button
              onClick={isPlaying ? stopMetronome : startMetronome}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}
            >
              {isPlaying ? 'Parar' : 'Iniciar'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Metronome; 