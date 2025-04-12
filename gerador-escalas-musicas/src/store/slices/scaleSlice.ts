import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScaleType = 'maior' | 'menor' | 'pentatonica' | 'blues' | 'modo';

export interface Scale {
  type: ScaleType;
  root: string;
  notes: string[];
}

interface ScaleState {
  selectedScale: Scale | null;
  availableScales: Scale[];
}

const initialState: ScaleState = {
  selectedScale: null,
  availableScales: [],
};

const scaleSlice = createSlice({
  name: 'scale',
  initialState,
  reducers: {
    setSelectedScale: (state, action: PayloadAction<Scale>) => {
      state.selectedScale = action.payload;
    },
    setAvailableScales: (state, action: PayloadAction<Scale[]>) => {
      state.availableScales = action.payload;
    },
  },
});

export const { setSelectedScale, setAvailableScales } = scaleSlice.actions;
export default scaleSlice.reducer; 