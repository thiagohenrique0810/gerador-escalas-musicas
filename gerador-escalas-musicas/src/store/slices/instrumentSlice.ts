import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Instrument = 'violao' | 'guitarra' | 'baixo' | 'teclado';

interface InstrumentState {
  selectedInstrument: Instrument | null;
  tuning: string[];
}

const initialState: InstrumentState = {
  selectedInstrument: null,
  tuning: [],
};

const instrumentSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setInstrument: (state, action: PayloadAction<Instrument>) => {
      state.selectedInstrument = action.payload;
    },
    setTuning: (state, action: PayloadAction<string[]>) => {
      state.tuning = action.payload;
    },
  },
});

export const { setInstrument, setTuning } = instrumentSlice.actions;
export default instrumentSlice.reducer; 