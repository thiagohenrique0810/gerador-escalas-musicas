import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import InstrumentSelection from '../pages/InstrumentSelection';
import instrumentReducer from '../store/slices/instrumentSlice';
import { Instrument } from '../store/slices/instrumentSlice';

interface RootState {
  instrument: {
    selectedInstrument: Instrument | null;
    tuning: string[];
  };
}

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      instrument: instrumentReducer,
    },
    preloadedState: initialState,
  });
};

describe('InstrumentSelection Component', () => {
  it('deve renderizar todos os instrumentos disponíveis', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InstrumentSelection />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByText('instrument_guitar')).toBeInTheDocument();
    expect(screen.getByText('instrument_bass')).toBeInTheDocument();
    expect(screen.getByText('instrument_keyboard')).toBeInTheDocument();
    expect(screen.getByText('instrument_acoustic')).toBeInTheDocument();
  });

  it('deve selecionar um instrumento quando clicado', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InstrumentSelection />
        </I18nextProvider>
      </Provider>
    );

    const guitarButton = screen.getByText('instrument_guitar').closest('button');
    if (guitarButton) {
      fireEvent.click(guitarButton);
    }

    const state = store.getState() as RootState;
    expect(state.instrument.selectedInstrument).toBe('guitarra');
  });

  it('deve mostrar o instrumento selecionado como ativo', () => {
    const initialState = {
      instrument: {
        selectedInstrument: 'baixo',
        tuning: [],
      },
    } as RootState;

    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InstrumentSelection />
        </I18nextProvider>
      </Provider>
    );

    const bassButton = screen.getByText('instrument_bass').closest('button');
    expect(bassButton).toHaveClass('selected');
  });

  it('deve permitir trocar de instrumento', () => {
    const initialState = {
      instrument: {
        selectedInstrument: 'guitarra',
        tuning: [],
      },
    } as RootState;

    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InstrumentSelection />
        </I18nextProvider>
      </Provider>
    );

    const keyboardButton = screen.getByText('instrument_keyboard').closest('button');
    if (keyboardButton) {
      fireEvent.click(keyboardButton);
    }

    const state = store.getState() as RootState;
    expect(state.instrument.selectedInstrument).toBe('teclado');
  });
}); 