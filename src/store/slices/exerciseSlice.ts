import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, ExerciseState } from '../../types/exercise';

// Exercícios iniciais
const initialExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Escala Maior - Subida',
    type: 'ascending',
    difficulty: 'beginner',
    scaleId: 'major',
    key: 'C',
    description: 'Toque a escala maior em ordem ascendente',
    instructions: 'Toque cada nota da escala em ordem, da nota mais grave para a mais aguda',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    tempo: 60
  },
  {
    id: 'ex2',
    name: 'Escala Maior - Descida',
    type: 'descending',
    difficulty: 'beginner',
    scaleId: 'major',
    key: 'C',
    description: 'Toque a escala maior em ordem descendente',
    instructions: 'Toque cada nota da escala em ordem, da nota mais aguda para a mais grave',
    notes: ['C', 'B', 'A', 'G', 'F', 'E', 'D', 'C'],
    tempo: 60
  },
  {
    id: 'ex3',
    name: 'Escala Menor - Subida',
    type: 'ascending',
    difficulty: 'beginner',
    scaleId: 'minor',
    key: 'A',
    description: 'Toque a escala menor em ordem ascendente',
    instructions: 'Toque cada nota da escala em ordem, da nota mais grave para a mais aguda',
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
    tempo: 60
  },
  {
    id: 'ex4',
    name: 'Escala Menor - Descida',
    type: 'descending',
    difficulty: 'beginner',
    scaleId: 'minor',
    key: 'A',
    description: 'Toque a escala menor em ordem descendente',
    instructions: 'Toque cada nota da escala em ordem, da nota mais aguda para a mais grave',
    notes: ['A', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
    tempo: 60
  },
  {
    id: 'ex5',
    name: 'Escala Pentatônica - Aleatória',
    type: 'random',
    difficulty: 'intermediate',
    scaleId: 'pentatonic',
    key: 'C',
    description: 'Toque as notas da escala pentatônica em ordem aleatória',
    instructions: 'Toque as notas da escala em ordem aleatória',
    notes: ['C', 'D', 'E', 'G', 'A'],
    tempo: 80
  }
];

const initialState: ExerciseState = {
  exercises: initialExercises,
  selectedExercise: null,
  currentExercise: null,
  isPlaying: false,
  currentNoteIndex: 0,
  score: 0,
  history: []
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    selectExercise: (state, action: PayloadAction<Exercise>) => {
      state.selectedExercise = action.payload;
    },
    startExercise: (state) => {
      if (state.selectedExercise) {
        state.currentExercise = state.selectedExercise;
        state.isPlaying = true;
        state.currentNoteIndex = 0;
        state.score = 0;
      }
    },
    stopExercise: (state) => {
      state.isPlaying = false;
      if (state.currentExercise) {
        state.history.push({
          exerciseId: state.currentExercise.id,
          score: state.score,
          date: new Date().toISOString()
        });
      }
    },
    nextNote: (state) => {
      if (state.currentExercise && state.isPlaying) {
        if (state.currentNoteIndex < state.currentExercise.notes.length - 1) {
          state.currentNoteIndex += 1;
        } else {
          state.isPlaying = false;
          state.history.push({
            exerciseId: state.currentExercise.id,
            score: state.score,
            date: new Date().toISOString()
          });
        }
      }
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    resetExercise: (state) => {
      state.currentExercise = null;
      state.isPlaying = false;
      state.currentNoteIndex = 0;
      state.score = 0;
    }
  }
});

export const {
  selectExercise,
  startExercise,
  stopExercise,
  nextNote,
  updateScore,
  resetExercise
} = exerciseSlice.actions;

export default exerciseSlice.reducer; 