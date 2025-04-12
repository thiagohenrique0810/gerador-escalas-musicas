export interface SettingsState {
  metronomeBpm: number;
  metronomeTimeSignature: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export type Theme = 'light' | 'dark' | 'system'; 