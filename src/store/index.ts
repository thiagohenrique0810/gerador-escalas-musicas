import { configureStore } from '@reduxjs/toolkit';
import instrumentReducer from './slices/instrumentSlice';
import scaleReducer from './slices/scaleSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    instrument: instrumentReducer,
    scale: scaleReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 