import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import interactivityReducer from '../../store/slices/interactivitySlice';
import InteractivityControls from '../InteractivityControls';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { audioService } from '../../services/AudioService';
import { noteRecognitionService } from '../../services/NoteRecognitionService';

// Mock dos serviços
jest.mock('../../services/AudioService', () => ({
  audioService: {
    initialize: jest.fn().mockResolvedValue(undefined),
    playNote: jest.fn(),
  },
}));

jest.mock('../../services/NoteRecognitionService', () => ({
  noteRecognitionService: {
    onNoteDetected: jest.fn(),
    startListening: jest.fn(),
    stopListening: jest.fn(),
    removeNoteCallback: jest.fn(),
  },
}));

// Mock do i18n
jest.mock('../../i18n', () => ({
  __esModule: true,
  default: {
    t: (key: string) => key,
  },
}));

describe('InteractivityControls', () => {
  const renderComponent = () => {
    const store = configureStore({
      reducer: {
        interactivity: interactivityReducer,
      },
      preloadedState: {
        interactivity: {
          isAudioEnabled: false,
          isNoteRecognitionEnabled: false,
          volume: 0.5,
          lastPlayedNote: null,
          lastDetectedNote: null,
          highlightedNotes: [],
        },
      },
    });

    return render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InteractivityControls />
        </I18nextProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o componente corretamente', () => {
    renderComponent();
    
    expect(screen.getByText('interactivity.title')).toBeInTheDocument();
    expect(screen.getByText('interactivity.audio')).toBeInTheDocument();
    expect(screen.getByText('interactivity.disabled')).toBeInTheDocument();
  });

  it('ativa/desativa o áudio quando o botão é clicado', async () => {
    renderComponent();
    
    const audioButton = screen.getByText('interactivity.disabled');
    
    await act(async () => {
      fireEvent.click(audioButton);
    });
    
    expect(screen.getByText('interactivity.enabled')).toBeInTheDocument();
    expect(audioService.initialize).toHaveBeenCalled();
    
    await act(async () => {
      fireEvent.click(screen.getByText('interactivity.enabled'));
    });
    
    expect(screen.getByText('interactivity.disabled')).toBeInTheDocument();
  });

  it('ativa/desativa o reconhecimento de notas quando o botão é clicado', () => {
    renderComponent();
    
    // Primeiro, ativar o áudio para mostrar o botão de reconhecimento
    fireEvent.click(screen.getByText('interactivity.disabled'));
    
    const recognitionButton = screen.getByText('interactivity.disabled');
    
    fireEvent.click(recognitionButton);
    expect(screen.getByText('interactivity.enabled')).toBeInTheDocument();
    expect(noteRecognitionService.onNoteDetected).toHaveBeenCalled();
    expect(noteRecognitionService.startListening).toHaveBeenCalled();
    
    fireEvent.click(screen.getByText('interactivity.enabled'));
    expect(screen.getByText('interactivity.disabled')).toBeInTheDocument();
    expect(noteRecognitionService.stopListening).toHaveBeenCalled();
  });

  it('ajusta o volume quando o slider é movido', () => {
    renderComponent();
    
    // Primeiro, ativar o áudio para mostrar o controle de volume
    fireEvent.click(screen.getByText('interactivity.disabled'));
    
    const volumeSlider = screen.getByRole('slider');
    
    fireEvent.change(volumeSlider, { target: { value: '0.8' } });
    expect(volumeSlider).toHaveValue(0.8);
  });

  it('toca uma nota de teste quando o botão é clicado', () => {
    renderComponent();
    
    // Primeiro, ativar o áudio para mostrar o botão de teste
    fireEvent.click(screen.getByText('interactivity.disabled'));
    
    const testButton = screen.getByText('interactivity.playTestNote');
    
    fireEvent.click(testButton);
    expect(audioService.playNote).toHaveBeenCalledWith('A4', 0.5);
  });
}); 