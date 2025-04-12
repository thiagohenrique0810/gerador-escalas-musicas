import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import {
  setAudioEnabled,
  setNoteRecognitionEnabled,
  setVolume,
  setLastPlayedNote,
  setLastDetectedNote,
} from '../store/slices/interactivitySlice';
import { useTranslation } from 'react-i18next';
import { audioService } from '../services/AudioService';
import { noteRecognitionService } from '../services/NoteRecognitionService';
import { FaVolumeUp, FaMicrophone, FaMicrophoneSlash, FaVolumeMute } from 'react-icons/fa';

const InteractivityControls: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAudioEnabled, isNoteRecognitionEnabled, volume } = useSelector(
    (state: RootState) => state.interactivity
  );
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const initializeAudio = async () => {
      if (isAudioEnabled) {
        setIsInitializing(true);
        try {
          await audioService.initialize();
        } catch (error) {
          console.error('Erro ao inicializar o serviço de áudio:', error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    initializeAudio();
  }, [isAudioEnabled]);

  useEffect(() => {
    const handleNoteDetected = useCallback((note: string) => {
      dispatch(setLastDetectedNote(note));
    }, [dispatch]);

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
  }, [isNoteRecognitionEnabled, dispatch]);

  const handleAudioToggle = useCallback(() => {
    dispatch(setAudioEnabled(!isAudioEnabled));
  }, [dispatch, isAudioEnabled]);

  const handleNoteRecognitionToggle = useCallback(() => {
    dispatch(setNoteRecognitionEnabled(!isNoteRecognitionEnabled));
  }, [dispatch, isNoteRecognitionEnabled]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
  }, [dispatch]);

  const handlePlayTestNote = useCallback(() => {
    if (isAudioEnabled) {
      audioService.playNote('A4', volume);
      dispatch(setLastPlayedNote('A4'));
    }
  }, [isAudioEnabled, volume, dispatch]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{t('interactivity.title')}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isAudioEnabled ? (
              <FaVolumeUp className="text-green-500 text-xl" />
            ) : (
              <FaVolumeMute className="text-gray-400 text-xl" />
            )}
            <span className="font-medium">{t('interactivity.audio')}</span>
          </div>
          <button
            onClick={handleAudioToggle}
            className={`px-4 py-2 rounded ${
              isAudioEnabled
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}
            disabled={isInitializing}
          >
            {isAudioEnabled ? t('interactivity.enabled') : t('interactivity.disabled')}
          </button>
        </div>

        {isAudioEnabled && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('interactivity.volume')}</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
            <button
              onClick={handlePlayTestNote}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {t('interactivity.playTestNote')}
            </button>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isNoteRecognitionEnabled ? (
              <FaMicrophone className="text-green-500 text-xl" />
            ) : (
              <FaMicrophoneSlash className="text-gray-400 text-xl" />
            )}
            <span className="font-medium">{t('interactivity.noteRecognition')}</span>
          </div>
          <button
            onClick={handleNoteRecognitionToggle}
            className={`px-4 py-2 rounded ${
              isNoteRecognitionEnabled
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}
          >
            {isNoteRecognitionEnabled ? t('interactivity.enabled') : t('interactivity.disabled')}
          </button>
        </div>

        {isNoteRecognitionEnabled && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('interactivity.noteRecognitionHelp')}
          </p>
        )}
      </div>
    </div>
  );
});

InteractivityControls.displayName = 'InteractivityControls';

export default InteractivityControls; 