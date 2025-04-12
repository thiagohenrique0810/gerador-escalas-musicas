import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { 
  selectExercise, 
  startExercise, 
  stopExercise, 
  nextNote, 
  updateScore, 
  resetExercise 
} from '../store/slices/exerciseSlice';
import { Exercise, DifficultyLevel, ExerciseType } from '../types/exercise';
import { audioService } from '../services/AudioService';
import { noteRecognitionService } from '../services/NoteRecognitionService';
import ScaleDiagram from '../components/ScaleDiagram';
import InteractivityControls from '../components/InteractivityControls';

const Exercises: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // Estado do Redux
  const exercises = useSelector((state: RootState) => state.exercise.exercises);
  const selectedExercise = useSelector((state: RootState) => state.exercise.selectedExercise);
  const currentExercise = useSelector((state: RootState) => state.exercise.currentExercise);
  const isPlaying = useSelector((state: RootState) => state.exercise.isPlaying);
  const currentNoteIndex = useSelector((state: RootState) => state.exercise.currentNoteIndex);
  const score = useSelector((state: RootState) => state.exercise.score);
  const selectedInstrument = useSelector((state: RootState) => state.instrument.selectedInstrument);
  const isAudioEnabled = useSelector((state: RootState) => state.interactivity.isAudioEnabled);
  const isNoteRecognitionEnabled = useSelector((state: RootState) => state.interactivity.isNoteRecognitionEnabled);
  
  // Estado local
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  // Filtrar exercícios com base nos filtros selecionados
  useEffect(() => {
    let filtered = [...exercises];
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(exercise => exercise.type === selectedType);
    }
    
    setFilteredExercises(filtered);
  }, [exercises, selectedDifficulty, selectedType]);
  
  // Configurar reconhecimento de notas
  useEffect(() => {
    if (isNoteRecognitionEnabled && currentExercise && isPlaying) {
      const handleNoteDetected = useCallback((note: string) => {
        const expectedNote = currentExercise.notes[currentNoteIndex];
        
        if (note === expectedNote) {
          // Nota correta
          dispatch(updateScore(score + 10));
          dispatch(nextNote());
          setFeedback(t('exercises.correctNote'));
          setShowFeedback(true);
          
          // Tocar a próxima nota
          if (isAudioEnabled && currentNoteIndex < currentExercise.notes.length - 1) {
            audioService.playNote(currentExercise.notes[currentNoteIndex + 1], 0.5);
          }
          
          // Esconder feedback após 1 segundo
          setTimeout(() => {
            setShowFeedback(false);
          }, 1000);
        } else {
          // Nota incorreta
          setFeedback(t('exercises.incorrectNote'));
          setShowFeedback(true);
          
          // Esconder feedback após 1 segundo
          setTimeout(() => {
            setShowFeedback(false);
          }, 1000);
        }
      }, [currentExercise, currentNoteIndex, score, isAudioEnabled, dispatch, t]);
      
      noteRecognitionService.onNoteDetected(handleNoteDetected);
      
      return () => {
        noteRecognitionService.removeNoteCallback(handleNoteDetected);
      };
    }
  }, [isNoteRecognitionEnabled, currentExercise, isPlaying, currentNoteIndex, score, isAudioEnabled, dispatch, t]);
  
  // Iniciar exercício
  const handleStartExercise = useCallback((exercise: Exercise) => {
    dispatch(selectExercise(exercise));
    dispatch(startExercise());
    
    // Tocar a primeira nota
    if (isAudioEnabled) {
      audioService.playNote(exercise.notes[0], 0.5);
    }
  }, [dispatch, isAudioEnabled]);
  
  // Parar exercício
  const handleStopExercise = useCallback(() => {
    dispatch(stopExercise());
  }, [dispatch]);
  
  // Reiniciar exercício
  const handleResetExercise = useCallback(() => {
    dispatch(resetExercise());
  }, [dispatch]);
  
  // Renderizar exercício atual
  const renderCurrentExercise = useMemo(() => {
    if (!currentExercise) return null;
    
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{currentExercise.name}</h2>
        <p className="mb-4">{currentExercise.description}</p>
        <p className="mb-4">{currentExercise.instructions}</p>
        
        <div className="mb-4">
          <p className="font-semibold">{t('exercises.currentNote')}: {currentExercise.notes[currentNoteIndex]}</p>
          <p className="font-semibold">{t('exercises.progress')}: {currentNoteIndex + 1}/{currentExercise.notes.length}</p>
          <p className="font-semibold">{t('exercises.score')}: {score}</p>
        </div>
        
        {showFeedback && (
          <div className={`p-3 rounded-md mb-4 ${feedback.includes('incorreto') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {feedback}
          </div>
        )}
        
        <div className="flex space-x-4">
          <button
            onClick={handleStopExercise}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            {t('exercises.stop')}
          </button>
          <button
            onClick={handleResetExercise}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            {t('exercises.reset')}
          </button>
        </div>
        
        <div className="mt-6">
          <ScaleDiagram
            scale={currentExercise}
            key={currentExercise.key}
            onNoteClick={() => {}}
          />
        </div>
      </div>
    );
  }, [currentExercise, currentNoteIndex, score, showFeedback, feedback, handleStopExercise, handleResetExercise, t]);
  
  // Renderizar lista de exercícios
  const renderExerciseList = useMemo(() => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{t('exercises.availableExercises')}</h2>
        
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('exercises.difficulty')}</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="all">{t('exercises.allDifficulties')}</option>
              <option value="beginner">{t('exercises.beginner')}</option>
              <option value="intermediate">{t('exercises.intermediate')}</option>
              <option value="advanced">{t('exercises.advanced')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">{t('exercises.type')}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ExerciseType | 'all')}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="all">{t('exercises.allTypes')}</option>
              <option value="ascending">{t('exercises.ascending')}</option>
              <option value="descending">{t('exercises.descending')}</option>
              <option value="random">{t('exercises.random')}</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border rounded p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleStartExercise(exercise)}
            >
              <h3 className="font-bold">{exercise.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{exercise.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {t(`exercises.${exercise.difficulty}`)}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {t(`exercises.${exercise.type}`)}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  {exercise.key} {t(`scales.${exercise.scaleId}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [filteredExercises, selectedDifficulty, selectedType, handleStartExercise, t]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('exercises.title')}</h1>
      
      <div className="mb-6">
        <InteractivityControls />
      </div>
      
      {currentExercise ? renderCurrentExercise : renderExerciseList}
    </div>
  );
});

Exercises.displayName = 'Exercises';

export default Exercises; 