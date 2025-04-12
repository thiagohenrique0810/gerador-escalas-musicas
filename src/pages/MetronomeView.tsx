import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setBPM, setTimeSignature } from '../store/slices/metronomeSlice';

const MetronomeView: React.FC = () => {
  const dispatch = useDispatch();
  const { bpm, timeSignature, isPlaying } = useSelector((state: RootState) => state.metronome);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [nextNoteTime, setNextNoteTime] = useState(0);

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
    return () => context.close();
  }, []);

  const playClick = () => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1000;
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const scheduleNote = (time: number) => {
    playClick();
    const secondsPerBeat = 60.0 / bpm;
    setNextNoteTime(time + secondsPerBeat);
  };

  useEffect(() => {
    if (!isPlaying || !audioContext) return;

    const scheduler = () => {
      while (nextNoteTime < audioContext.currentTime + 0.1) {
        scheduleNote(nextNoteTime);
      }
      requestAnimationFrame(scheduler);
    };

    const animationId = requestAnimationFrame(scheduler);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, bpm, nextNoteTime, audioContext]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Metrônomo</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-6xl font-bold">{bpm} BPM</div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(setBPM(Math.max(40, bpm - 5)))}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              -
            </button>
            
            <input
              type="range"
              min="40"
              max="208"
              value={bpm}
              onChange={(e) => dispatch(setBPM(Number(e.target.value)))}
              className="w-64"
            />
            
            <button
              onClick={() => dispatch(setBPM(Math.min(208, bpm + 5)))}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              +
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={timeSignature}
              onChange={(e) => dispatch(setTimeSignature(e.target.value))}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              <option value="4/4">4/4</option>
              <option value="3/4">3/4</option>
              <option value="6/8">6/8</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetronomeView; 