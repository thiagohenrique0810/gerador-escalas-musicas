import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import instrumentSettingsReducer from '@store/slices/instrumentSettingsSlice';
import InstrumentSettings from './InstrumentSettings';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';

const createTestStore = () => {
  return configureStore({
    reducer: {
      instrumentSettings: instrumentSettingsReducer,
    },
  });
};

describe('InstrumentSettings', () => {
  const renderComponent = () => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InstrumentSettings />
        </I18nextProvider>
      </Provider>
    );
  };

  it('renders the component with initial state', () => {
    renderComponent();
    
    expect(screen.getByText('Configurações de Instrumento')).toBeInTheDocument();
    expect(screen.getByText('Afinação Atual')).toBeInTheDocument();
    expect(screen.getByText('Standard:')).toBeInTheDocument();
  });

  it('allows adding a custom tuning', () => {
    renderComponent();
    
    const nameInput = screen.getByPlaceholderText('Ex: Drop D, DADGAD');
    const noteInputs = screen.getAllByPlaceholderText('Nota');
    
    fireEvent.change(nameInput, { target: { value: 'Custom Tuning' } });
    fireEvent.change(noteInputs[0], { target: { value: 'D' } });
    fireEvent.change(noteInputs[1], { target: { value: 'A' } });
    fireEvent.change(noteInputs[2], { target: { value: 'D' } });
    fireEvent.change(noteInputs[3], { target: { value: 'G' } });
    fireEvent.change(noteInputs[4], { target: { value: 'B' } });
    fireEvent.change(noteInputs[5], { target: { value: 'E' } });
    
    fireEvent.click(screen.getByText('Adicionar'));
    
    expect(screen.getByText('Custom Tuning:')).toBeInTheDocument();
  });

  it('allows removing a custom tuning', () => {
    renderComponent();
    
    // First add a custom tuning
    const nameInput = screen.getByPlaceholderText('Ex: Drop D, DADGAD');
    const noteInputs = screen.getAllByPlaceholderText('Nota');
    
    fireEvent.change(nameInput, { target: { value: 'To Remove' } });
    fireEvent.change(noteInputs[0], { target: { value: 'D' } });
    fireEvent.click(screen.getByText('Adicionar'));
    
    // Then remove it
    fireEvent.click(screen.getByText('Remover'));
    
    expect(screen.queryByText('To Remove:')).not.toBeInTheDocument();
  });

  it('allows resetting to default tuning', () => {
    renderComponent();
    
    // First add a custom tuning
    const nameInput = screen.getByPlaceholderText('Ex: Drop D, DADGAD');
    const noteInputs = screen.getAllByPlaceholderText('Nota');
    
    fireEvent.change(nameInput, { target: { value: 'Custom' } });
    fireEvent.change(noteInputs[0], { target: { value: 'D' } });
    fireEvent.click(screen.getByText('Adicionar'));
    
    // Then reset to default
    fireEvent.click(screen.getByText('Resetar para Padrão'));
    
    expect(screen.getByText('Standard:')).toBeInTheDocument();
  });
}); 