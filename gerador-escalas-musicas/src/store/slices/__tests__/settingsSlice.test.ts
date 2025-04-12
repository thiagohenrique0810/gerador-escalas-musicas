import { describe, it, expect } from 'vitest';
import settingsReducer, {
  setMetronomeBPM,
  setTimeSignature,
  setTheme,
  setLanguage,
} from '../settingsSlice';
import { SettingsState } from '../../../types/settings';

describe('settingsSlice', () => {
  const initialState: SettingsState = {
    metronomeBPM: 120,
    timeSignature: '4/4',
    theme: 'light',
    language: 'pt-BR',
  };

  it('deve retornar o estado inicial', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('deve atualizar o BPM do metrônomo', () => {
    const newBPM = 140;
    const nextState = settingsReducer(initialState, setMetronomeBPM(newBPM));
    expect(nextState.metronomeBPM).toBe(newBPM);
  });

  it('deve atualizar o compasso', () => {
    const newTimeSignature = '3/4';
    const nextState = settingsReducer(initialState, setTimeSignature(newTimeSignature));
    expect(nextState.timeSignature).toBe(newTimeSignature);
  });

  it('deve atualizar o tema', () => {
    const newTheme = 'dark';
    const nextState = settingsReducer(initialState, setTheme(newTheme));
    expect(nextState.theme).toBe(newTheme);
  });

  it('deve atualizar o idioma', () => {
    const newLanguage = 'en-US';
    const nextState = settingsReducer(initialState, setLanguage(newLanguage));
    expect(nextState.language).toBe(newLanguage);
  });
}); 