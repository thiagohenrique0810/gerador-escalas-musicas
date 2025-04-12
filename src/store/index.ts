import { configureStore } from '@reduxjs/toolkit';
import instrumentReducer from './slices/instrumentSlice';
import scaleReducer from './slices/scaleSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';
import instrumentSettingsReducer from './slices/instrumentSettingsSlice';
import interactivityReducer from './slices/interactivitySlice';
import exerciseReducer from './slices/exerciseSlice';
import metronomeReducer from './slices/metronomeSlice';

export const store = configureStore({
  reducer: {
    instrument: instrumentReducer,
    scale: scaleReducer,
    settings: settingsReducer,
    user: userReducer,
    instrumentSettings: instrumentSettingsReducer,
    interactivity: interactivityReducer,
    exercise: exerciseReducer,
    metronome: metronomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 