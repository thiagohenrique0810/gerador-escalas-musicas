import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMetronomeBpm, setMetronomeTimeSignature } from '../store/slices/settingsSlice';
import { useTranslation } from 'react-i18next';

interface MetronomeProps {
  initialBPM?: number;
  initialTimeSignature?: [number, number];
}

const Metronome: React.FC<MetronomeProps> = ({
  initialBPM = 120,
  initialTimeSignature = [4, 4],
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { metronomeBpm, metronomeTimeSignature } = useSelector(
    (state: RootState) => state.settings
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Volume de 0 a 1
  const [currentBeat, setCurrentBeat] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef<number>(0);
  const timerID = useRef<number | null>(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (timerID.current) {
        window.clearTimeout(timerID.current);
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playClick = () => {
    if (!audioContext.current) return;

    const osc = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    // Ajusta o som baseado no tempo
    gainNode.gain.value = currentBeat === 0 ? 1 : 0.5;
    osc.frequency.value = currentBeat === 0 ? 1000 : 800;

    osc.start();
    osc.stop(audioContext.current.currentTime + 0.05);
  };

  const scheduleNote = (beatNumber: number, time: number) => {
    if (!audioContext.current) return;

    // Agenda o próximo clique
    nextNoteTime.current = time + (60.0 / metronomeBpm);
    setCurrentBeat((beatNumber + 1) % metronomeTimeSignature[0]);

    // Agenda o próximo clique
    timerID.current = window.setTimeout(() => {
      playClick();
      scheduleNote(beatNumber + 1, nextNoteTime.current);
    }, 25);
  };

  const toggleMetronome = () => {
    if (!audioContext.current) return;

    if (isPlaying) {
      // Para o metrônomo
      if (timerID.current) {
        window.clearTimeout(timerID.current);
      }
      setIsPlaying(false);
    } else {
      // Inicia o metrônomo
      setIsPlaying(true);
      nextNoteTime.current = audioContext.current.currentTime;
      scheduleNote(0, nextNoteTime.current);
    }
  };

  const handleBPMChange = (newBPM: number) => {
    dispatch(setMetronomeBpm(newBPM));
    if (isPlaying) {
      // Reinicia o metrônomo com o novo BPM
      if (timerID.current) {
        window.clearTimeout(timerID.current);
      }
      nextNoteTime.current = audioContext.current?.currentTime || 0;
      scheduleNote(currentBeat, nextNoteTime.current);
    }
  };

  const handleTimeSignatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMetronomeTimeSignature(e.target.value));
    setCurrentBeat(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('metronome_title')}
          </h1>

          {/* Controles principais */}
          <div className="flex flex-col items-center space-y-8">
            {/* BPM Display e Controles */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary-600 mb-4">
                {metronomeBpm}
              </div>
              <div className="text-gray-600 mb-4">
                {t('bpm_label')}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleBPMChange(metronomeBpm - 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="range"
                  min="40"
                  max="208"
                  value={metronomeBpm}
                  onChange={(e) => handleBPMChange(Number(e.target.value))}
                  className="w-64"
                />
                <button
                  onClick={() => handleBPMChange(metronomeBpm + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Compasso */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {metronomeTimeSignature[0]}/{metronomeTimeSignature[1]}
              </div>
              <div className="text-gray-600 mb-4">
                {t('time_signature_label')}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => dispatch(setMetronomeTimeSignature(`${num}/${metronomeTimeSignature[1]}`))}
                    className={`p-2 rounded ${
                      metronomeTimeSignature[0] === num
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {num}/{metronomeTimeSignature[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Play/Pause */}
            <button
              onClick={toggleMetronome}
              className={`p-4 rounded-full ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary-600 hover:bg-primary-700'
              } text-white text-xl`}
            >
              {isPlaying ? t('stop') : t('start')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metronome; 