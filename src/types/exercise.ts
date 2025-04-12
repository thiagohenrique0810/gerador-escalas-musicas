export type ExerciseType = 'ascending' | 'descending' | 'random';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  difficulty: DifficultyLevel;
  scaleId: string;
  key: string;
  description: string;
  instructions: string;
  notes: string[];
  tempo: number;
}

export interface ExerciseState {
  exercises: Exercise[];
  selectedExercise: Exercise | null;
  currentExercise: Exercise | null;
  isPlaying: boolean;
  currentNoteIndex: number;
  score: number;
  history: {
    exerciseId: string;
    score: number;
    date: string;
  }[];
} 