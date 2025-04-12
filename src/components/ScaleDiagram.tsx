import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { Scale } from '../types/scale';

interface ScaleDiagramProps {
  scale: Scale;
  key: string;
  onNoteClick: (note: string) => void;
}

const ScaleDiagram: React.FC<ScaleDiagramProps> = React.memo(({ scale, key: scaleKey, onNoteClick }) => {
  const { selectedInstrument } = useSelector((state: RootState) => state.instrumentSettings);
  const { highlightedNotes } = useSelector((state: RootState) => state.interactivity);

  // Função para verificar se uma nota está destacada
  const isNoteHighlighted = useMemo(() => (note: string) => {
    return highlightedNotes.includes(`${note}${scaleKey}`);
  }, [highlightedNotes, scaleKey]);

  // Memoize o diagrama com base no instrumento selecionado
  const diagram = useMemo(() => {
    switch (selectedInstrument) {
      case 'guitar':
      case 'bass':
        return renderFretboardDiagram();
      case 'ukulele':
        return renderUkuleleDiagram();
      case 'keyboard':
        return renderKeyboardDiagram();
      default:
        return <p>Selecione um instrumento para visualizar o diagrama.</p>;
    }
  }, [selectedInstrument, scale, scaleKey, isNoteHighlighted]);

  // Renderiza o diagrama do braço do violão/guitarra/baixo
  function renderFretboardDiagram() {
    const strings = selectedInstrument === 'bass' ? 4 : 6;
    const frets = 12;
    const tuning = selectedInstrument === 'bass' 
      ? ['E', 'A', 'D', 'G'] 
      : ['E', 'A', 'D', 'G', 'B', 'E'];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-13 gap-1">
            {/* Cabeçalho com afinação */}
            <div className="col-span-1"></div>
            {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
              <div key={`fret-${fretIndex}`} className="text-center font-bold">
                {fretIndex === 0 ? '' : fretIndex}
              </div>
            ))}
            
            {/* Cordas */}
            {Array.from({ length: strings }).map((_, stringIndex) => (
              <React.Fragment key={`string-${stringIndex}`}>
                <div className="text-center font-bold">{tuning[stringIndex]}</div>
                {Array.from({ length: frets + 1 }).map((_, fretIndex) => {
                  // Calcular a nota na posição atual
                  const noteIndex = (tuning[stringIndex].charCodeAt(0) - 65 + fretIndex) % 12;
                  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                  const note = notes[noteIndex];
                  const fullNote = `${note}${scaleKey}`;
                  const isInScale = scale.notes.includes(note);
                  const isHighlighted = isNoteHighlighted(note);
                  
                  return (
                    <div 
                      key={`fret-${fretIndex}`}
                      className={`
                        border border-gray-300 dark:border-gray-600 p-2 text-center
                        ${isInScale ? 'bg-blue-100 dark:bg-blue-900' : ''}
                        ${isHighlighted ? 'bg-green-300 dark:bg-green-700' : ''}
                        ${fretIndex === 0 ? 'border-l-2 border-l-black dark:border-l-white' : ''}
                        ${fretIndex === frets ? 'border-r-2 border-r-black dark:border-r-white' : ''}
                        ${stringIndex === 0 ? 'border-t-2 border-t-black dark:border-t-white' : ''}
                        ${stringIndex === strings - 1 ? 'border-b-2 border-b-black dark:border-b-white' : ''}
                      `}
                      onClick={() => onNoteClick(fullNote)}
                    >
                      {isInScale ? note : ''}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderiza o diagrama do ukulele
  function renderUkuleleDiagram() {
    const frets = 12;
    const tuning = ['G', 'C', 'E', 'A'];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-13 gap-1">
            {/* Cabeçalho com afinação */}
            <div className="col-span-1"></div>
            {Array.from({ length: frets + 1 }).map((_, fretIndex) => (
              <div key={`fret-${fretIndex}`} className="text-center font-bold">
                {fretIndex === 0 ? '' : fretIndex}
              </div>
            ))}
            
            {/* Cordas */}
            {Array.from({ length: 4 }).map((_, stringIndex) => (
              <React.Fragment key={`string-${stringIndex}`}>
                <div className="text-center font-bold">{tuning[stringIndex]}</div>
                {Array.from({ length: frets + 1 }).map((_, fretIndex) => {
                  // Calcular a nota na posição atual
                  const noteIndex = (tuning[stringIndex].charCodeAt(0) - 65 + fretIndex) % 12;
                  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                  const note = notes[noteIndex];
                  const fullNote = `${note}${scaleKey}`;
                  const isInScale = scale.notes.includes(note);
                  const isHighlighted = isNoteHighlighted(note);
                  
                  return (
                    <div 
                      key={`fret-${fretIndex}`}
                      className={`
                        border border-gray-300 dark:border-gray-600 p-2 text-center
                        ${isInScale ? 'bg-blue-100 dark:bg-blue-900' : ''}
                        ${isHighlighted ? 'bg-green-300 dark:bg-green-700' : ''}
                        ${fretIndex === 0 ? 'border-l-2 border-l-black dark:border-l-white' : ''}
                        ${fretIndex === frets ? 'border-r-2 border-r-black dark:border-r-white' : ''}
                        ${stringIndex === 0 ? 'border-t-2 border-t-black dark:border-t-white' : ''}
                        ${stringIndex === 3 ? 'border-b-2 border-b-black dark:border-b-white' : ''}
                      `}
                      onClick={() => onNoteClick(fullNote)}
                    >
                      {isInScale ? note : ''}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderiza o diagrama do teclado
  function renderKeyboardDiagram() {
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="relative h-48">
            {/* Teclas brancas */}
            {whiteKeys.map((note, index) => {
              const isInScale = scale.notes.includes(note);
              const isHighlighted = isNoteHighlighted(note);
              
              return (
                <div
                  key={`white-${note}`}
                  className={`
                    absolute top-0 w-16 h-48 border border-gray-300 dark:border-gray-600
                    ${isInScale ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}
                    ${isHighlighted ? 'bg-green-300 dark:bg-green-700' : ''}
                  `}
                  style={{ left: `${index * 64}px` }}
                  onClick={() => onNoteClick(`${note}${scaleKey}`)}
                >
                  <div className="absolute bottom-0 w-full text-center p-2">
                    {note}
                  </div>
                </div>
              );
            })}

            {/* Teclas pretas */}
            {blackKeys.map((note, index) => {
              const isInScale = scale.notes.includes(note);
              const isHighlighted = isNoteHighlighted(note);
              const offset = index >= 2 ? 1 : 0;
              
              return (
                <div
                  key={`black-${note}`}
                  className={`
                    absolute top-0 w-10 h-32 border border-gray-600
                    ${isInScale ? 'bg-blue-900 dark:bg-blue-700' : 'bg-gray-900'}
                    ${isHighlighted ? 'bg-green-700 dark:bg-green-500' : ''}
                  `}
                  style={{ left: `${(index + offset) * 64 + 32}px` }}
                  onClick={() => onNoteClick(`${note}${scaleKey}`)}
                >
                  <div className="absolute bottom-0 w-full text-center p-2 text-white">
                    {note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return diagram;
});

ScaleDiagram.displayName = 'ScaleDiagram';

export default ScaleDiagram; 