import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Exercise {
  id: string;
  type: 'scale' | 'chord' | 'rhythm';
  name: string;
  completedAt: Date;
  score: number;
  duration: number; // em segundos
}

export interface Goal {
  id: string;
  description: string;
  target: number;
  current: number;
  deadline?: Date;
  completed: boolean;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  registeredAt: Date;
  lastLogin: Date;
  streak: number; // dias consecutivos de prática
  totalPracticeTime: number; // em minutos
}

export interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  achievements: Achievement[];
  exerciseHistory: Exercise[];
  goals: Goal[];
  statistics: {
    dailyPracticeTime: number; // em minutos
    weeklyPracticeTime: number; // em minutos
    monthlyPracticeTime: number; // em minutos
    totalExercisesCompleted: number;
    averageScore: number;
  };
}

const initialState: UserState = {
  profile: null,
  isAuthenticated: false,
  achievements: [],
  exerciseHistory: [],
  goals: [],
  statistics: {
    dailyPracticeTime: 0,
    weeklyPracticeTime: 0,
    monthlyPracticeTime: 0,
    totalExercisesCompleted: 0,
    averageScore: 0,
  },
};

const calculateExperienceForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      const now = new Date();
      state.profile = {
        name: action.payload.name,
        email: action.payload.email,
        level: 1,
        experience: 0,
        experienceToNextLevel: calculateExperienceForLevel(1),
        registeredAt: now,
        lastLogin: now,
        streak: 1,
        totalPracticeTime: 0,
      };
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(state.profile));
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      state.achievements = [];
      state.exerciseHistory = [];
      state.goals = [];
      localStorage.removeItem('user');
    },
    addExperience: (state, action: PayloadAction<number>) => {
      if (!state.profile) return;

      state.profile.experience += action.payload;
      while (state.profile.experience >= state.profile.experienceToNextLevel) {
        state.profile.experience -= state.profile.experienceToNextLevel;
        state.profile.level += 1;
        state.profile.experienceToNextLevel = calculateExperienceForLevel(state.profile.level);
      }
      localStorage.setItem('user', JSON.stringify(state.profile));
    },
    completeExercise: (state, action: PayloadAction<Exercise>) => {
      state.exerciseHistory.push(action.payload);
      state.statistics.totalExercisesCompleted += 1;
      
      // Atualiza média de pontuação
      const totalScores = state.exerciseHistory.reduce((sum, ex) => sum + ex.score, 0);
      state.statistics.averageScore = totalScores / state.exerciseHistory.length;
      
      localStorage.setItem('exerciseHistory', JSON.stringify(state.exerciseHistory));
      localStorage.setItem('statistics', JSON.stringify(state.statistics));
    },
    addGoal: (state, action: PayloadAction<Omit<Goal, 'completed' | 'current'>>) => {
      const newGoal: Goal = {
        ...action.payload,
        completed: false,
        current: 0,
      };
      state.goals.push(newGoal);
      localStorage.setItem('goals', JSON.stringify(state.goals));
    },
    updateGoal: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const goal = state.goals.find(g => g.id === action.payload.id);
      if (goal) {
        goal.current = action.payload.progress;
        goal.completed = goal.current >= goal.target;
        localStorage.setItem('goals', JSON.stringify(state.goals));
      }
    },
    unlockAchievement: (state, action: PayloadAction<Achievement>) => {
      const achievement = state.achievements.find(a => a.id === action.payload.id);
      if (achievement && !achievement.completed) {
        achievement.completed = true;
        achievement.completedAt = new Date();
        localStorage.setItem('achievements', JSON.stringify(state.achievements));
      }
    },
    updatePracticeTime: (state, action: PayloadAction<number>) => {
      if (!state.profile) return;
      
      const minutes = action.payload;
      state.profile.totalPracticeTime += minutes;
      state.statistics.dailyPracticeTime += minutes;
      state.statistics.weeklyPracticeTime += minutes;
      state.statistics.monthlyPracticeTime += minutes;
      
      localStorage.setItem('user', JSON.stringify(state.profile));
      localStorage.setItem('statistics', JSON.stringify(state.statistics));
    },
    loadUserData: (state) => {
      const profile = localStorage.getItem('user');
      const exerciseHistory = localStorage.getItem('exerciseHistory');
      const goals = localStorage.getItem('goals');
      const achievements = localStorage.getItem('achievements');
      const statistics = localStorage.getItem('statistics');

      if (profile) {
        state.profile = JSON.parse(profile);
        state.isAuthenticated = true;
      }
      if (exerciseHistory) state.exerciseHistory = JSON.parse(exerciseHistory);
      if (goals) state.goals = JSON.parse(goals);
      if (achievements) state.achievements = JSON.parse(achievements);
      if (statistics) state.statistics = JSON.parse(statistics);
    },
  },
});

export const {
  login,
  logout,
  addExperience,
  completeExercise,
  addGoal,
  updateGoal,
  unlockAchievement,
  updatePracticeTime,
  loadUserData,
} = userSlice.actions;

export default userSlice.reducer; 