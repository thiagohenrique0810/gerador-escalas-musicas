import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'pt-BR' | 'en-US';

interface SettingsState {
  theme: Theme;
  language: Language;
  metronomeBpm: number;
  metronomeTimeSignature: string;
}

const initialState: SettingsState = {
  theme: 'system',
  language: 'pt-BR',
  metronomeBpm: 120,
  metronomeTimeSignature: '4/4',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setMetronomeBpm: (state, action: PayloadAction<number>) => {
      state.metronomeBpm = action.payload;
    },
    setMetronomeTimeSignature: (state, action: PayloadAction<string>) => {
      state.metronomeTimeSignature = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  setMetronomeBpm,
  setMetronomeTimeSignature,
} = settingsSlice.actions;

export default settingsSlice.reducer; 