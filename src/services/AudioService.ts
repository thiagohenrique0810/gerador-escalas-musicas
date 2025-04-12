/**
 * Serviço responsável por gerenciar a reprodução de sons das notas musicais
 */
class AudioService {
  private audioContext: AudioContext | null = null;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private isInitialized = false;

  /**
   * Inicializa o contexto de áudio e carrega os sons das notas
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadSounds();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar o serviço de áudio:', error);
    }
  }

  /**
   * Carrega os sons das notas musicais
   */
  private async loadSounds(): Promise<void> {
    if (!this.audioContext) return;

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octaves = [3, 4, 5, 6];

    for (const octave of octaves) {
      for (const note of notes) {
        const noteName = `${note}${octave}`;
        try {
          const response = await fetch(`/sounds/notes/${noteName}.mp3`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
          this.audioBuffers.set(noteName, audioBuffer);
        } catch (error) {
          console.warn(`Não foi possível carregar o som da nota ${noteName}:`, error);
        }
      }
    }
  }

  /**
   * Reproduz o som de uma nota musical
   * @param note Nome da nota (ex: 'C4', 'A#5')
   * @param volume Volume do som (0-1)
   */
  playNote(note: string, volume = 0.5): void {
    if (!this.audioContext || !this.isInitialized) {
      console.warn('Serviço de áudio não inicializado');
      return;
    }

    const buffer = this.audioBuffers.get(note);
    if (!buffer) {
      console.warn(`Som da nota ${note} não encontrado`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start(0);
  }

  /**
   * Para a reprodução de todos os sons
   */
  stopAllSounds(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = false;
    }
  }
}

export const audioService = new AudioService(); 