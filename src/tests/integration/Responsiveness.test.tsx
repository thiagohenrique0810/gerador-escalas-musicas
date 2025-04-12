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

describe('Responsividade da Aplicação', () => {
  const renderApp = (width = 1024) => {
    // Define a largura da janela para simular diferentes tamanhos de tela
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    
    // Dispara o evento de redimensionamento
    window.dispatchEvent(new Event('resize'));
    
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

  it('exibe o menu lateral em telas grandes', () => {
    renderApp(1024); // Tela grande (desktop)
    
    // Verifica se o menu lateral está visível
    expect(screen.getByRole('navigation')).toBeVisible();
    
    // Verifica se os itens do menu estão visíveis
    expect(screen.getByText('Início')).toBeVisible();
    expect(screen.getByText('Escalas')).toBeVisible();
    expect(screen.getByText('Configurações')).toBeVisible();
  });

  it('exibe o menu hamburguer em telas pequenas', () => {
    renderApp(375); // Tela pequena (mobile)
    
    // Verifica se o menu lateral está oculto
    expect(screen.getByRole('navigation')).not.toBeVisible();
    
    // Verifica se o botão do menu hamburguer está visível
    expect(screen.getByLabelText('Abrir menu')).toBeVisible();
    
    // Clica no botão do menu hamburguer
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    
    // Verifica se o menu lateral agora está visível
    expect(screen.getByRole('navigation')).toBeVisible();
  });

  it('ajusta o layout do diagrama da escala para telas pequenas', async () => {
    renderApp(375); // Tela pequena (mobile)
    
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
    
    // Verifica se o diagrama está com a classe de responsividade para mobile
    const diagrama = screen.getByTestId('scale-diagram');
    expect(diagrama).toHaveClass('scale-diagram-mobile');
  });

  it('ajusta o layout dos controles de interatividade para telas pequenas', async () => {
    renderApp(375); // Tela pequena (mobile)
    
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
    
    // Verifica se os controles de interatividade estão com a classe de responsividade para mobile
    const controls = screen.getByTestId('interactivity-controls');
    expect(controls).toHaveClass('interactivity-controls-mobile');
  });

  it('ajusta o layout do teclado virtual para telas pequenas', async () => {
    renderApp(375); // Tela pequena (mobile)
    
    // Navega para a página de escalas
    const tecladoButton = screen.getByText('Teclado');
    fireEvent.click(tecladoButton);
    
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
    
    // Verifica se o teclado virtual está com a classe de responsividade para mobile
    const keyboard = screen.getByTestId('virtual-keyboard');
    expect(keyboard).toHaveClass('virtual-keyboard-mobile');
  });

  it('ajusta o layout do menu de configurações para telas pequenas', async () => {
    renderApp(375); // Tela pequena (mobile)
    
    // Abre o menu de configurações
    const settingsButton = screen.getByLabelText('Configurações');
    fireEvent.click(settingsButton);
    
    // Verifica se o menu de configurações está com a classe de responsividade para mobile
    const settingsMenu = screen.getByTestId('settings-menu');
    expect(settingsMenu).toHaveClass('settings-menu-mobile');
  });
}); 