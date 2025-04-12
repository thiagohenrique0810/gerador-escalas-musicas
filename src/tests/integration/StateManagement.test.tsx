import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from '../../App';
import instrumentReducer from '../../store/slices/instrumentSlice';
import scaleReducer from '../../store/slices/scaleSlice';
import settingsReducer from '../../store/slices/settingsSlice';
import userReducer from '../../store/slices/userSlice';
import instrumentSettingsReducer from '../../store/slices/instrumentSettingsSlice';
import interactivityReducer from '../../store/slices/interactivitySlice';
import { RootState } from '../../store/index';

// Mock do i18n
jest.mock('../../i18n', () => ({
  __esModule: true,
  default: {
    t: (key: string) => key,
  },
}));

// Mock dos serviços de áudio
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

describe('Gerenciamento de Estado da Aplicação', () => {
  let store: ReturnType<typeof configureStore>;

  const renderApp = () => {
    store = configureStore({
      reducer: {
        instrument: instrumentReducer,
        scale: scaleReducer,
        settings: settingsReducer,
        user: userReducer,
        instrumentSettings: instrumentSettingsReducer,
        interactivity: interactivityReducer,
      },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  };

  it('atualiza o estado do instrumento selecionado', async () => {
    renderApp();
    
    // Verifica o estado inicial
    let state = store.getState() as RootState;
    expect(state.instrument.selectedInstrument).toBe('');
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.instrument.selectedInstrument).toBe('guitar');
  });

  it('atualiza o estado da escala selecionada', async () => {
    renderApp();
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Verifica o estado inicial da escala
    let state = store.getState() as RootState;
    expect(state.scale.selectedScale).toBe('');
    
    // Seleciona a escala maior
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.scale.selectedScale).toBe('major');
  });

  it('atualiza o estado do tom selecionado', async () => {
    renderApp();
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Seleciona a escala maior
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Verifica o estado inicial do tom
    let state = store.getState() as RootState;
    expect(state.scale.selectedKey).toBe('C');
    
    // Seleciona o tom D
    const tomDButton = screen.getByText('D');
    fireEvent.click(tomDButton);
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.scale.selectedKey).toBe('D');
  });

  it('atualiza o estado das configurações de áudio', async () => {
    renderApp();
    
    // Navega para a página de escalas
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Seleciona uma escala
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Verifica o estado inicial do áudio
    let state = store.getState() as RootState;
    expect(state.interactivity.isAudioEnabled).toBe(false);
    expect(state.interactivity.volume).toBe(0.5);
    
    // Ativa o áudio
    const audioButton = screen.getByText('interactivity.disabled');
    fireEvent.click(audioButton);
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.interactivity.isAudioEnabled).toBe(true);
    
    // Ajusta o volume
    const volumeSlider = screen.getByRole('slider');
    fireEvent.change(volumeSlider, { target: { value: '0.8' } });
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.interactivity.volume).toBe(0.8);
  });

  it('atualiza o estado do reconhecimento de notas', async () => {
    renderApp();
    
    // Navega para a página de escalas
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Seleciona uma escala
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Verifica o estado inicial do reconhecimento de notas
    let state = store.getState() as RootState;
    expect(state.interactivity.isNoteRecognitionEnabled).toBe(false);
    
    // Ativa o áudio
    const audioButton = screen.getByText('interactivity.disabled');
    fireEvent.click(audioButton);
    
    // Ativa o reconhecimento de notas
    const recognitionButton = screen.getByText('interactivity.disabled');
    fireEvent.click(recognitionButton);
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.interactivity.isNoteRecognitionEnabled).toBe(true);
    
    // Simula a detecção de uma nota
    const { noteRecognitionService } = require('../../services/NoteRecognitionService');
    const noteCallback = noteRecognitionService.onNoteDetected.mock.calls[0][0];
    noteCallback('A4');
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.interactivity.lastDetectedNote).toBe('A4');
  });

  it('atualiza o estado das configurações de tema', async () => {
    renderApp();
    
    // Verifica o estado inicial do tema
    let state = store.getState() as RootState;
    expect(state.settings.theme).toBe('light');
    
    // Abre o menu de configurações
    const settingsButton = screen.getByLabelText('Configurações');
    fireEvent.click(settingsButton);
    
    // Muda o tema para escuro
    const themeSelect = screen.getByLabelText('Tema');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.settings.theme).toBe('dark');
  });

  it('atualiza o estado das configurações de idioma', async () => {
    renderApp();
    
    // Verifica o estado inicial do idioma
    let state = store.getState() as RootState;
    expect(state.settings.language).toBe('pt-BR');
    
    // Abre o menu de configurações
    const settingsButton = screen.getByLabelText('Configurações');
    fireEvent.click(settingsButton);
    
    // Muda o idioma para inglês
    const languageSelect = screen.getByLabelText('Idioma');
    fireEvent.change(languageSelect, { target: { value: 'en-US' } });
    
    // Verifica se o estado foi atualizado
    state = store.getState() as RootState;
    expect(state.settings.language).toBe('en-US');
  });

  it('persiste o estado entre navegações', async () => {
    renderApp();
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Seleciona a escala maior
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Ativa o áudio
    const audioButton = screen.getByText('interactivity.disabled');
    fireEvent.click(audioButton);
    
    // Navega para a página inicial
    const homeButton = screen.getByText('Início');
    fireEvent.click(homeButton);
    
    // Verifica se o estado foi mantido
    let state = store.getState() as RootState;
    expect(state.instrument.selectedInstrument).toBe('guitar');
    expect(state.scale.selectedScale).toBe('major');
    expect(state.interactivity.isAudioEnabled).toBe(true);
    
    // Navega de volta para a página de escalas
    const escalasButton = screen.getByText('Escalas');
    fireEvent.click(escalasButton);
    
    // Verifica se a página de escalas está carregada com o estado correto
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Verifica se o áudio ainda está ativado
    expect(screen.getByText('interactivity.enabled')).toBeInTheDocument();
  });
}); 