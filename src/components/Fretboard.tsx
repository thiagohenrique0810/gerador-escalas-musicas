import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Note } from '../types/scales';

interface FretboardProps {
  instrument: 'violao' | 'guitarra' | 'baixo';
  tuning: string[];
  frets?: number;
}

const Fretboard: React.FC<FretboardProps> = ({ instrument, tuning, frets = 12 }) => {
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

  // Gera as notas para cada corda e traste
  const generateFretboardNotes = () => {
    const notes: string[][] = [];
    const allNotes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    tuning.forEach((openNote) => {
      const stringNotes: string[] = [];
      const startIndex = allNotes.indexOf(openNote as Note);

      for (let fret = 0; fret <= frets; fret++) {
        const noteIndex = (startIndex + fret) % 12;
        stringNotes.push(allNotes[noteIndex]);
      }

      notes.push(stringNotes);
    });

    return notes;
  };

  const fretboardNotes = generateFretboardNotes();

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] bg-amber-900 p-4 rounded-lg shadow-lg">
        {/* Cabeça do braço */}
        <div className="flex justify-between mb-2">
          {tuning.map((note, index) => (
            <div
              key={`tuning-${index}`}
              className="w-8 h-8 flex items-center justify-center text-white font-bold"
            >
              {note}
            </div>
          ))}
        </div>

        {/* Braço */}
        <div className="relative">
          {/* Cordas */}
          {fretboardNotes.map((stringNotes, stringIndex) => (
            <div
              key={`string-${stringIndex}`}
              className="flex relative"
              style={{ height: '40px' }}
            >
              {/* Linha da corda */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-gray-300"></div>
              </div>

              {/* Notas */}
              {stringNotes.map((note, fretIndex) => (
                <div
                  key={`note-${stringIndex}-${fretIndex}`}
                  className="relative w-12 flex items-center justify-center"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                      ${selectedScale?.notes.includes(note as Note) ? noteColors[note as Note] : 'bg-gray-700'}`}
                  >
                    {note}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Trastes */}
          {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
            <div
              key={`fret-${fretIndex}`}
              className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
              style={{ left: `${fretIndex * 48}px` }}
            />
          ))}
        </div>

        {/* Números dos trastes */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: frets + 1 }).map((_, index) => (
            <div
              key={`fret-number-${index}`}
              className="w-12 text-center text-white font-bold"
            >
              {index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fretboard; 