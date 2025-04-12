export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export type ScaleType = 'major' | 'minor' | 'pentatonic_major' | 'pentatonic_minor' | 'blues' | 'harmonic_minor';

export interface Scale {
  type: ScaleType;
  name: string;
  description: string;
  intervals: number[];
  notes: Note[];
}

export interface ScaleState {
  selectedTonic: Note;
  selectedScale: Scale | null;
  availableScales: Scale[];
}

export const NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALE_TYPES: Record<ScaleType, string> = {
  major: 'Maior',
  minor: 'Menor Natural',
  pentatonic_major: 'Pentatônica Maior',
  pentatonic_minor: 'Pentatônica Menor',
  blues: 'Blues',
  harmonic_minor: 'Menor Harmônica',
};

export const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic_major: [0, 2, 4, 7, 9],
  pentatonic_minor: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
};

export const calculateScaleNotes = (tonic: Note, intervals: number[]): Note[] => {
  const tonicIndex = NOTES.indexOf(tonic);
  return intervals.map(interval => NOTES[(tonicIndex + interval) % 12]);
};

// Definição das escalas padrão
export const defaultScales: Scale[] = [
  {
    type: 'major',
    name: 'scale_major',
    description: 'scale_major_desc',
    intervals: [0, 2, 4, 5, 7, 9, 11], // T T ST T T T ST
    notes: calculateScaleNotes('C', [0, 2, 4, 5, 7, 9, 11])
  },
  {
    type: 'minor',
    name: 'scale_minor',
    description: 'scale_minor_desc',
    intervals: [0, 2, 3, 5, 7, 8, 10], // T ST T T ST T T
    notes: calculateScaleNotes('C', [0, 2, 3, 5, 7, 8, 10])
  },
  {
    type: 'pentatonic_major',
    name: 'scale_pentatonic_major',
    description: 'scale_pentatonic_major_desc',
    intervals: [0, 2, 4, 7, 9], // T T T½ T T½
    notes: calculateScaleNotes('C', [0, 2, 4, 7, 9])
  },
  {
    type: 'pentatonic_minor',
    name: 'scale_pentatonic_minor',
    description: 'scale_pentatonic_minor_desc',
    intervals: [0, 3, 5, 7, 10], // T½ T T T½ T
    notes: calculateScaleNotes('C', [0, 3, 5, 7, 10])
  },
  {
    type: 'blues',
    name: 'scale_blues',
    description: 'scale_blues_desc',
    intervals: [0, 3, 5, 6, 7, 10], // Pentatônica menor + blue note
    notes: calculateScaleNotes('C', [0, 3, 5, 6, 7, 10])
  },
  {
    type: 'harmonic_minor',
    name: 'scale_harmonic_minor',
    description: 'scale_harmonic_minor_desc',
    intervals: [0, 2, 3, 5, 7, 8, 11], // T ST T T ST T½ ST
    notes: calculateScaleNotes('C', [0, 2, 3, 5, 7, 8, 11])
  }
]; 