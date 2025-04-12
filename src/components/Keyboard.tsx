import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Note } from '../types/scales';

interface KeyboardProps {
  octaves?: number;
  startOctave?: number;
}

const Keyboard: React.FC<KeyboardProps> = ({ octaves = 2, startOctave = 4 }) => {
  const { selectedScale } = useSelector((state: RootState) => state.scale);

  // Mapeamento de notas para cores
  const noteColors: Record<Note, string> = {
    'C': 'bg-red-500',
    'C#': 'bg-red-600',
    'D': 'bg-orange-500',
    'D#': 'bg-orange-600',
    'E': 'bg-yellow-500',
    'F': 'bg-green-500',
    'F#': 'bg-green-600',
    'G': 'bg-blue-500',
    'G#': 'bg-blue-600',
    'A': 'bg-purple-500',
    'A#': 'bg-purple-600',
    'B': 'bg-pink-500',
  };

  // Gera as teclas do teclado
  const generateKeys = () => {
    const keys: { note: Note; isBlack: boolean; octave: number }[] = [];
    const whiteNotes: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackNotes: Note[] = ['C#', 'D#', 'F#', 'G#', 'A#'];

    for (let octave = startOctave; octave < startOctave + octaves; octave++) {
      // Teclas brancas
      whiteNotes.forEach((note) => {
        keys.push({ note, isBlack: false, octave });
      });

      // Teclas pretas
      blackNotes.forEach((note) => {
        keys.push({ note, isBlack: true, octave });
      });
    }

    return keys;
  };

  const keys = generateKeys();

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="relative" style={{ height: '200px' }}>
          {/* Teclas brancas */}
          <div className="absolute inset-0 flex">
            {keys
              .filter((key) => !key.isBlack)
              .map((key, index) => (
                <div
                  key={`white-${key.note}-${key.octave}`}
                  className={`flex-1 border border-gray-300 rounded-b-lg
                    ${selectedScale?.notes.includes(key.note)
                      ? noteColors[key.note]
                      : 'bg-white'
                    }`}
                  style={{ height: '100%' }}
                >
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-700">
                    {key.note}{key.octave}
                  </div>
                </div>
              ))}
          </div>

          {/* Teclas pretas */}
          <div className="absolute inset-0 flex">
            {keys
              .filter((key) => key.isBlack)
              .map((key, index) => (
                <div
                  key={`black-${key.note}-${key.octave}`}
                  className={`absolute w-8 h-32 -ml-4 rounded-b-lg
                    ${selectedScale?.notes.includes(key.note)
                      ? noteColors[key.note]
                      : 'bg-gray-800'
                    }`}
                  style={{
                    left: `${(index * 100) / 7}%`,
                    top: 0,
                  }}
                >
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm">
                    {key.note}{key.octave}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard; 