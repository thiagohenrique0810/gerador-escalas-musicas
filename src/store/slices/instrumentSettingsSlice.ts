import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tuning {
  name: string;
  strings: string[];
}

export interface InstrumentSettings {
  currentTuning: Tuning;
  customTunings: Tuning[];
  selectedInstrument: string;
}

const defaultTunings: Record<string, Tuning[]> = {
  guitar: [
    { name: 'Standard', strings: ['E', 'A', 'D', 'G', 'B', 'E'] },
    { name: 'Drop D', strings: ['D', 'A', 'D', 'G', 'B', 'E'] },
    { name: 'DADGAD', strings: ['D', 'A', 'D', 'G', 'A', 'D'] },
  ],
  bass: [
    { name: 'Standard', strings: ['E', 'A', 'D', 'G'] },
    { name: 'Drop D', strings: ['D', 'A', 'D', 'G'] },
  ],
  ukulele: [
    { name: 'Standard', strings: ['G', 'C', 'E', 'A'] },
    { name: 'Baritone', strings: ['D', 'G', 'B', 'E'] },
  ],
};

const initialState: InstrumentSettings = {
  currentTuning: defaultTunings.guitar[0],
  customTunings: [],
  selectedInstrument: 'guitar',
};

const instrumentSettingsSlice = createSlice({
  name: 'instrumentSettings',
  initialState,
  reducers: {
    setSelectedInstrument: (state, action: PayloadAction<string>) => {
      state.selectedInstrument = action.payload;
      state.currentTuning = defaultTunings[action.payload]?.[0] || state.currentTuning;
    },
    setCurrentTuning: (state, action: PayloadAction<Tuning>) => {
      state.currentTuning = action.payload;
    },
    addCustomTuning: (state, action: PayloadAction<Tuning>) => {
      state.customTunings.push(action.payload);
    },
    removeCustomTuning: (state, action: PayloadAction<string>) => {
      state.customTunings = state.customTunings.filter(tuning => tuning.name !== action.payload);
    },
    resetToDefaultTuning: (state) => {
      state.currentTuning = defaultTunings[state.selectedInstrument]?.[0] || state.currentTuning;
    },
  },
});

export const {
  setSelectedInstrument,
  setCurrentTuning,
  addCustomTuning,
  removeCustomTuning,
  resetToDefaultTuning,
} = instrumentSettingsSlice.actions;

export default instrumentSettingsSlice.reducer; 