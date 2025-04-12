import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import interactivityReducer from '../../store/slices/interactivitySlice';
import instrumentSettingsReducer from '../../store/slices/instrumentSettingsSlice';
import ScaleDiagram from '../ScaleDiagram';
import { Scale } from '../../types/scale';

// Mock do i18n
jest.mock('../../i18n', () => ({
  __esModule: true,
  default: {
    t: (key: string) => key,
  },
}));

describe('ScaleDiagram', () => {
  const mockScale: Scale = {
    id: 'major',
    name: 'Escala Maior',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    description: 'Escala maior natural',
  };

  const renderComponent = (instrument = 'guitar') => {
    const store = configureStore({
      reducer: {
        interactivity: interactivityReducer,
        instrumentSettings: instrumentSettingsReducer,
      },
      preloadedState: {
        interactivity: {
          isAudioEnabled: true,
          isNoteRecognitionEnabled: false,
          volume: 0.5,
          lastPlayedNote: null,
          lastDetectedNote: null,
          highlightedNotes: [],
        },
        instrumentSettings: {
          selectedInstrument: instrument,
          tuning: {
            guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
            bass: ['E', 'A', 'D', 'G'],
            ukulele: ['G', 'C', 'E', 'A'],
          },
        },
      },
    });

    const onNoteClick = jest.fn();

    return {
      ...render(
        <Provider store={store}>
          <ScaleDiagram scale={mockScale} key="C" onNoteClick={onNoteClick} />
        </Provider>
      ),
      onNoteClick,
    };
  };

  it('renderiza o diagrama de guitarra por padrão', () => {
    renderComponent();
    
    // Verifica se o título do diagrama está presente
    expect(screen.getByText('Diagrama da Escala')).toBeInTheDocument();
    
    // Verifica se as cordas da guitarra estão presentes
    expect(screen.getByText('E')).toBeInTheDocument(); // Primeira corda
    expect(screen.getByText('A')).toBeInTheDocument(); // Segunda corda
    expect(screen.getByText('D')).toBeInTheDocument(); // Terceira corda
    expect(screen.getByText('G')).toBeInTheDocument(); // Quarta corda
    expect(screen.getByText('B')).toBeInTheDocument(); // Quinta corda
    expect(screen.getAllByText('E').length).toBeGreaterThan(1); // Sexta corda (aparece duas vezes)
  });

  it('renderiza o diagrama de baixo quando o instrumento é baixo', () => {
    renderComponent('bass');
    
    // Verifica se as cordas do baixo estão presentes
    expect(screen.getByText('E')).toBeInTheDocument(); // Primeira corda
    expect(screen.getByText('A')).toBeInTheDocument(); // Segunda corda
    expect(screen.getByText('D')).toBeInTheDocument(); // Terceira corda
    expect(screen.getByText('G')).toBeInTheDocument(); // Quarta corda
    
    // Verifica se não há cordas de guitarra
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });

  it('renderiza o diagrama de ukulele quando o instrumento é ukulele', () => {
    renderComponent('ukulele');
    
    // Verifica se as cordas do ukulele estão presentes
    expect(screen.getByText('G')).toBeInTheDocument(); // Primeira corda
    expect(screen.getByText('C')).toBeInTheDocument(); // Segunda corda
    expect(screen.getByText('E')).toBeInTheDocument(); // Terceira corda
    expect(screen.getByText('A')).toBeInTheDocument(); // Quarta corda
  });

  it('renderiza o diagrama de teclado quando o instrumento é teclado', () => {
    renderComponent('keyboard');
    
    // Verifica se o diagrama de teclado está presente
    expect(screen.getByText('Diagrama da Escala')).toBeInTheDocument();
    
    // Verifica se as teclas brancas estão presentes
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('chama a função onNoteClick quando uma nota é clicada', () => {
    const { onNoteClick } = renderComponent();
    
    // Encontra uma nota da escala no diagrama e clica nela
    const noteElement = screen.getByText('C');
    fireEvent.click(noteElement);
    
    // Verifica se a função onNoteClick foi chamada com a nota correta
    expect(onNoteClick).toHaveBeenCalledWith('CC');
  });

  it('destaca notas quando estão na lista de notas destacadas', () => {
    const store = configureStore({
      reducer: {
        interactivity: interactivityReducer,
        instrumentSettings: instrumentSettingsReducer,
      },
      preloadedState: {
        interactivity: {
          isAudioEnabled: true,
          isNoteRecognitionEnabled: false,
          volume: 0.5,
          lastPlayedNote: null,
          lastDetectedNote: null,
          highlightedNotes: ['CC'],
        },
        instrumentSettings: {
          selectedInstrument: 'guitar',
          tuning: {
            guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
            bass: ['E', 'A', 'D', 'G'],
            ukulele: ['G', 'C', 'E', 'A'],
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <ScaleDiagram scale={mockScale} key="C" onNoteClick={jest.fn()} />
      </Provider>
    );
    
    // Verifica se a nota C está destacada (com a classe bg-green-300)
    const noteElement = screen.getByText('C');
    expect(noteElement.parentElement).toHaveClass('bg-green-300');
  });
}); 