import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetronomeState {
  bpm: number;
  timeSignature: string;
  isPlaying: boolean;
}

const initialState: MetronomeState = {
  bpm: 120,
  timeSignature: '4/4',
  isPlaying: false,
};

const metronomeSlice = createSlice({
  name: 'metronome',
  initialState,
  reducers: {
    setBPM: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    setTimeSignature: (state, action: PayloadAction<string>) => {
      state.timeSignature = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setBPM, setTimeSignature, setIsPlaying } = metronomeSlice.actions;
export default metronomeSlice.reducer; 