/**
 * Tipo para o tema da aplicação
 */
export type Theme = 'light' | 'dark';

/**
 * Interface que define o estado das configurações
 */
export interface SettingsState {
  /** BPM do metrônomo */
  metronomeBPM: number;
  /** Compasso musical */
  timeSignature: string;
  /** Tema da aplicação */
  theme: Theme;
  /** Idioma da aplicação */
  language: string;
} 