import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, Theme } from '../../types/settings';

const initialState: SettingsState = {
  metronomeBpm: 120,
  metronomeTimeSignature: '4/4',
  theme: 'system',
  language: 'pt-BR'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMetronomeBpm: (state, action: PayloadAction<number>) => {
      state.metronomeBpm = action.payload;
    },
    setMetronomeTimeSignature: (state, action: PayloadAction<string>) => {
      state.metronomeTimeSignature = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    }
  }
});

export const { setMetronomeBpm, setMetronomeTimeSignature, setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer; 