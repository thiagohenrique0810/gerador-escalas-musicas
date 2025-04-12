import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { useTranslation } from 'react-i18next';
import { audioService } from '../services/AudioService';
import { noteRecognitionService } from '../services/NoteRecognitionService';
import {
  setLastPlayedNote,
  setLastDetectedNote,
  addHighlightedNote,
  removeHighlightedNote,
} from '../store/slices/interactivitySlice';
import InteractivityControls from '../components/InteractivityControls';
import ScaleDiagram from '../components/ScaleDiagram';

const ScaleView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedScale, selectedKey } = useSelector((state: RootState) => state.scale);
  const { isAudioEnabled, isNoteRecognitionEnabled, volume } = useSelector(
    (state: RootState) => state.interactivity
  );

  // Efeito para inicializar o serviço de áudio quando necessário
  useEffect(() => {
    const initializeAudio = async () => {
      if (isAudioEnabled) {
        try {
          await audioService.initialize();
        } catch (error) {
          console.error('Erro ao inicializar o serviço de áudio:', error);
        }
      }
    };

    initializeAudio();
  }, [isAudioEnabled]);

  // Efeito para gerenciar o reconhecimento de notas
  useEffect(() => {
    const handleNoteDetected = (note: string) => {
      dispatch(setLastDetectedNote(note));
      
      // Verificar se a nota detectada está na escala atual
      if (selectedScale && selectedKey) {
        const scaleNotes = selectedScale.notes.map(note => `${note}${selectedKey}`);
        if (scaleNotes.includes(note)) {
          dispatch(addHighlightedNote(note));
        } else {
          dispatch(removeHighlightedNote(note));
        }
      }
    };

    if (isNoteRecognitionEnabled) {
      noteRecognitionService.onNoteDetected(handleNoteDetected);
      noteRecognitionService.startListening();
    } else {
      noteRecognitionService.stopListening();
      noteRecognitionService.removeNoteCallback(handleNoteDetected);
      dispatch(setLastDetectedNote(null));
    }

    return () => {
      noteRecognitionService.removeNoteCallback(handleNoteDetected);
      noteRecognitionService.stopListening();
    };
  }, [isNoteRecognitionEnabled, dispatch, selectedScale, selectedKey]);

  // Função para tocar uma nota
  const handlePlayNote = (note: string) => {
    if (isAudioEnabled) {
      audioService.playNote(note, volume);
      dispatch(setLastPlayedNote(note));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">
            {selectedScale ? t(`scales.${selectedScale.id}`) : t('select_scale')}
            {selectedKey && ` - ${selectedKey}`}
          </h1>
          
          {selectedScale && selectedKey ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="mb-4">{t(`scales.${selectedScale.id}_desc`)}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{t('scale_notes')}</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedScale.notes.map((note, index) => {
                    const fullNote = `${note}${selectedKey}`;
                    return (
                      <button
                        key={index}
                        onClick={() => handlePlayNote(fullNote)}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {fullNote}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <ScaleDiagram scale={selectedScale} key={selectedKey} onNoteClick={handlePlayNote} />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <p className="text-lg">{t('select_instrument_and_scale')}</p>
            </div>
          )}
        </div>
        
        <div>
          <InteractivityControls />
        </div>
      </div>
    </div>
  );
};

export default ScaleView; 