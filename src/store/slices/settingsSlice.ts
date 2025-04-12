import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, Theme } from '../../types/settings';

const initialState: SettingsState = {
  metronomeBPM: 120,
  timeSignature: '4/4',
  theme: 'light',
  language: 'pt-BR'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMetronomeBPM: (state: SettingsState, action: PayloadAction<number>) => {
      state.metronomeBPM = action.payload;
    },
    setTimeSignature: (state: SettingsState, action: PayloadAction<string>) => {
      state.timeSignature = action.payload;
    },
    setTheme: (state: SettingsState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state: SettingsState, action: PayloadAction<string>) => {
      state.language = action.payload;
    }
  }
});

export const { setMetronomeBPM, setTimeSignature, setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer; 