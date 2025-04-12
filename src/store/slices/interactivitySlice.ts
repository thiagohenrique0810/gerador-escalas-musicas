import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InteractivityState {
  isAudioEnabled: boolean;
  isNoteRecognitionEnabled: boolean;
  volume: number;
  highlightedNotes: string[];
  lastPlayedNote: string | null;
  lastDetectedNote: string | null;
}

const initialState: InteractivityState = {
  isAudioEnabled: false,
  isNoteRecognitionEnabled: false,
  volume: 0.5,
  highlightedNotes: [],
  lastPlayedNote: null,
  lastDetectedNote: null,
};

const interactivitySlice = createSlice({
  name: 'interactivity',
  initialState,
  reducers: {
    setAudioEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAudioEnabled = action.payload;
    },
    setNoteRecognitionEnabled: (state, action: PayloadAction<boolean>) => {
      state.isNoteRecognitionEnabled = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setHighlightedNotes: (state, action: PayloadAction<string[]>) => {
      state.highlightedNotes = action.payload;
    },
    addHighlightedNote: (state, action: PayloadAction<string>) => {
      if (!state.highlightedNotes.includes(action.payload)) {
        state.highlightedNotes.push(action.payload);
      }
    },
    removeHighlightedNote: (state, action: PayloadAction<string>) => {
      state.highlightedNotes = state.highlightedNotes.filter(
        note => note !== action.payload
      );
    },
    clearHighlightedNotes: (state) => {
      state.highlightedNotes = [];
    },
    setLastPlayedNote: (state, action: PayloadAction<string | null>) => {
      state.lastPlayedNote = action.payload;
    },
    setLastDetectedNote: (state, action: PayloadAction<string | null>) => {
      state.lastDetectedNote = action.payload;
    },
  },
});

export const {
  setAudioEnabled,
  setNoteRecognitionEnabled,
  setVolume,
  setHighlightedNotes,
  addHighlightedNote,
  removeHighlightedNote,
  clearHighlightedNotes,
  setLastPlayedNote,
  setLastDetectedNote,
} = interactivitySlice.actions;

export default interactivitySlice.reducer; 