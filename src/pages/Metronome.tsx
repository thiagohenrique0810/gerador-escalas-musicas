import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { setMetronomeBpm, setMetronomeTimeSignature } from '@store/slices/settingsSlice';

const Metronome: React.FC = () => {
  const dispatch = useDispatch();
  const { metronomeBpm, metronomeTimeSignature } = useSelector(
    (state: RootState) => state.settings
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [nextNoteTime, setNextNoteTime] = useState(0);
  const [timerID, setTimerID] = useState<number | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    return () => {
      if (timerID) {
        window.clearTimeout(timerID);
      }
      context.close();
    };
  }, []);

  const scheduleNote = (time: number) => {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const envelope = audioContext.createGain();

    osc.frequency.value = 1000;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  };

  const scheduler = () => {
    if (!audioContext) return;

    while (nextNoteTime < audioContext.currentTime + 0.1) {
      scheduleNote(nextNoteTime);
      const secondsPerBeat = 60.0 / metronomeBpm;
      const [beats, unit] = metronomeTimeSignature.split('/').map(Number);
      setNextNoteTime(nextNoteTime + (secondsPerBeat / (beats / unit)));
    }

    const timer = window.setTimeout(scheduler, 25.0);
    setTimerID(timer);
  };

  const startMetronome = () => {
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    setIsPlaying(true);
    setNextNoteTime(audioContext.currentTime);
    scheduler();
  };

  const stopMetronome = () => {
    if (timerID) {
      window.clearTimeout(timerID);
      setTimerID(null);
    }
    setIsPlaying(false);
  };

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