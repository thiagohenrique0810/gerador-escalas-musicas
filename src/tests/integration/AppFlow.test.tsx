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

describe('Fluxo Principal da Aplicação', () => {
  const renderApp = () => {
    const store = configureStore({
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

  it('navega para a página de escalas após selecionar um instrumento', async () => {
    renderApp();
    
    // Verifica se a página inicial está carregada
    expect(screen.getByText('Selecione seu Instrumento')).toBeInTheDocument();
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    // Verifica se foi redirecionado para a página de escalas
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
  });

  it('seleciona uma escala e exibe o diagrama', async () => {
    renderApp();
    
    // Seleciona o instrumento guitarra
    const guitarraButton = screen.getByText('Guitarra');
    fireEvent.click(guitarraButton);
    
    // Aguarda a página de escalas carregar
    await waitFor(() => {
      expect(screen.getByText('Escalas Musicais')).toBeInTheDocument();
    });
    
    // Seleciona a escala maior
    const escalaMaiorButton = screen.getByText('Escala Maior');
    fireEvent.click(escalaMaiorButton);
    
    // Verifica se o diagrama da escala é exibido
    await waitFor(() => {
      expect(screen.getByText('Diagrama da Escala')).toBeInTheDocument();
    });
  });

  it('ativa o áudio e toca uma nota de teste', async () => {
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
    
    // Aguarda o diagrama carregar
    await waitFor(() => {
      expect(screen.getByText('Diagrama da Escala')).toBeInTheDocument();
    });
    
    // Ativa o áudio
    const audioButton = screen.getByText('interactivity.disabled');
    fireEvent.click(audioButton);
    
    // Verifica se o áudio foi ativado
    expect(screen.getByText('interactivity.enabled')).toBeInTheDocument();
    
    // Toca uma nota de teste
    const testNoteButton = screen.getByText('interactivity.playTestNote');
    fireEvent.click(testNoteButton);
    
    // Verifica se a nota foi tocada
    const { audioService } = require('../../services/AudioService');
    expect(audioService.playNote).toHaveBeenCalledWith('A4', 0.5);
  });

  it('ativa o reconhecimento de notas e detecta uma nota', async () => {
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
    
    // Aguarda o diagrama carregar
    await waitFor(() => {
      expect(screen.getByText('Diagrama da Escala')).toBeInTheDocument();
    });
    
    // Ativa o áudio
    const audioButton = screen.getByText('interactivity.disabled');
    fireEvent.click(audioButton);
    
    // Ativa o reconhecimento de notas
    const recognitionButton = screen.getByText('interactivity.disabled');
    fireEvent.click(recognitionButton);
    
    // Verifica se o reconhecimento foi ativado
    expect(screen.getByText('interactivity.enabled')).toBeInTheDocument();
    
    // Simula a detecção de uma nota
    const { noteRecognitionService } = require('../../services/NoteRecognitionService');
    const noteCallback = noteRecognitionService.onNoteDetected.mock.calls[0][0];
    noteCallback('A4');
    
    // Verifica se a nota foi detectada
    await waitFor(() => {
      expect(screen.getByText('A4')).toBeInTheDocument();
    });
  });

  it('muda o idioma da aplicação', async () => {
    renderApp();
    
    // Abre o menu de configurações
    const settingsButton = screen.getByLabelText('Configurações');
    fireEvent.click(settingsButton);
    
    // Verifica se o menu de configurações está aberto
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    
    // Muda o idioma para inglês
    const languageSelect = screen.getByLabelText('Idioma');
    fireEvent.change(languageSelect, { target: { value: 'en-US' } });
    
    // Verifica se o idioma foi alterado
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  it('muda o tema da aplicação', async () => {
    renderApp();
    
    // Abre o menu de configurações
    const settingsButton = screen.getByLabelText('Configurações');
    fireEvent.click(settingsButton);
    
    // Verifica se o menu de configurações está aberto
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    
    // Muda o tema para escuro
    const themeSelect = screen.getByLabelText('Tema');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    
    // Verifica se o tema foi alterado
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
}); 