import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, Scale, ScaleState, NOTES, SCALE_INTERVALS, calculateScaleNotes } from '../../types/scales';

const initialState: ScaleState = {
  selectedTonic: 'C',
  selectedScale: null,
  availableScales: Object.entries(SCALE_INTERVALS).map(([type, intervals]) => ({
    type: type as Scale['type'],
    name: `scale_${type}`,
    description: `scale_${type}_desc`,
    intervals,
    notes: calculateScaleNotes('C', intervals),
  })),
};

const scaleSlice = createSlice({
  name: 'scale',
  initialState,
  reducers: {
    setSelectedTonic: (state, action: PayloadAction<Note>) => {
      state.selectedTonic = action.payload;
      if (state.selectedScale) {
        const updatedScale = { ...state.selectedScale };
        updatedScale.notes = calculateScaleNotes(action.payload, updatedScale.intervals);
        state.selectedScale = updatedScale;
      }
    },
    setSelectedScale: (state, action: PayloadAction<Scale | null>) => {
      if (action.payload) {
        const updatedScale = { ...action.payload };
        updatedScale.notes = calculateScaleNotes(state.selectedTonic, updatedScale.intervals);
        state.selectedScale = updatedScale;
      } else {
        state.selectedScale = null;
      }
    },
  },
});

export const { setSelectedTonic, setSelectedScale } = scaleSlice.actions;
export default scaleSlice.reducer; 