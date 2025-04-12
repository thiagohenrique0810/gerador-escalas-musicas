import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import Profile from './Profile';
import userReducer from '../store/slices/userSlice';

// Mock do store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  });
};

describe('Profile Component', () => {
  it('deve mostrar a tela de login quando não autenticado', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Profile />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByText('profile_login_title')).toBeInTheDocument();
    expect(screen.getByText('profile_login_button')).toBeInTheDocument();
  });

  it('deve fazer login quando o botão é clicado', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Profile />
        </I18nextProvider>
      </Provider>
    );

    const loginButton = screen.getByText('profile_login_button');
    fireEvent.click(loginButton);

    const state = store.getState();
    expect(state.user.isAuthenticated).toBe(true);
    expect(state.user.profile).toBeTruthy();
  });

  it('deve mostrar informações do perfil quando autenticado', () => {
    const initialState = {
      user: {
        isAuthenticated: true,
        profile: {
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          level: 1,
          experience: 0,
          experienceToNextLevel: 100,
          streak: 1,
          totalPracticeTime: 60,
        },
        statistics: {
          dailyPracticeTime: 30,
          weeklyPracticeTime: 120,
          totalExercisesCompleted: 5,
          averageScore: 85,
        },
        goals: [],
        achievements: [],
      },
    };

    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Profile />
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByText('Usuário Teste')).toBeInTheDocument();
    expect(screen.getByText('teste@exemplo.com')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Nível
    expect(screen.getByText('30 min')).toBeInTheDocument(); // Prática diária
  });

  it('deve fazer logout quando o botão é clicado', () => {
    const initialState = {
      user: {
        isAuthenticated: true,
        profile: {
          name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          level: 1,
          experience: 0,
          experienceToNextLevel: 100,
          streak: 1,
          totalPracticeTime: 60,
        },
        statistics: {
          dailyPracticeTime: 30,
          weeklyPracticeTime: 120,
          totalExercisesCompleted: 5,
          averageScore: 85,
        },
        goals: [],
        achievements: [],
      },
    };

    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Profile />
        </I18nextProvider>
      </Provider>
    );

    const logoutButton = screen.getByText('profile_logout');
    fireEvent.click(logoutButton);

    const state = store.getState();
    expect(state.user.isAuthenticated).toBe(false);
    expect(state.user.profile).toBeNull();
  });
}); 