/**
 * Serviço responsável por gerenciar o reconhecimento de notas musicais
 */
class NoteRecognitionService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private isInitialized = false;
  private isListening = false;
  private noteCallbacks: ((note: string) => void)[] = [];

  /**
   * Inicializa o serviço de reconhecimento de notas
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar o serviço de reconhecimento de notas:', error);
    }
  }

  /**
   * Inicia a captura de áudio do microfone
   */
  async startListening(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isListening) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.audioContext!.createMediaStreamSource(this.mediaStream);
      source.connect(this.analyser!);
      this.isListening = true;
      this.startPitchDetection();
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
    }
  }

  /**
   * Para a captura de áudio do microfone
   */
  stopListening(): void {
    if (!this.isListening) return;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    this.isListening = false;
  }

  /**
   * Adiciona um callback para ser chamado quando uma nota for detectada
   * @param callback Função a ser chamada com a nota detectada
   */
  onNoteDetected(callback: (note: string) => void): void {
    this.noteCallbacks.push(callback);
  }

  /**
   * Remove um callback da lista de callbacks
   * @param callback Função a ser removida
   */
  removeNoteCallback(callback: (note: string) => void): void {
    this.noteCallbacks = this.noteCallbacks.filter(cb => cb !== callback);
  }

  /**
   * Inicia a detecção de pitch
   */
  private startPitchDetection(): void {
    if (!this.isListening || !this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const sampleRate = this.audioContext!.sampleRate;

    const detectPitch = () => {
      if (!this.isListening) return;

      this.analyser!.getFloatTimeDomainData(dataArray);
      const pitch = this.autoCorrelate(dataArray, sampleRate);
      
      if (pitch !== -1) {
        const note = this.frequencyToNote(pitch);
        this.noteCallbacks.forEach(callback => callback(note));
      }

      requestAnimationFrame(detectPitch);
    };

    detectPitch();
  }

  /**
   * Converte frequência para nota musical
   * @param frequency Frequência em Hz
   * @returns Nome da nota (ex: 'C4', 'A#5')
   */
  private frequencyToNote(frequency: number): string {
    const noteNum = 12 * (Math.log2(frequency / 440) + 4);
    const note = Math.round(noteNum);
    const octave = Math.floor(note / 12) - 1;
    const noteIndex = note % 12;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return `${notes[noteIndex]}${octave}`;
  }

  /**
   * Algoritmo de autocorrelação para detectar pitch
   * @param buffer Buffer de áudio
   * @param sampleRate Taxa de amostragem
   * @returns Frequência detectada em Hz
   */
  private autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    // Implementação simplificada do algoritmo de autocorrelação
    // Para uma implementação mais precisa, consulte bibliotecas como Pitch.js ou Aubio
    
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i = 0; i < SIZE; i++) {
      sumOfSquares += buffer[i] ** 2;
    }
    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);
    if (rootMeanSquare < 0.01) return -1; // Silêncio

    let r1 = 0, r2 = SIZE - 1;
    const threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) > threshold) {
        r1 = i;
        break;
      }
    }

    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) > threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    const buf2 = buffer.slice(r1, r2);
    const c = new Array(buf2.length).fill(0);
    
    for (let i = 0; i < buf2.length; i++) {
      for (let j = 0; j < buf2.length - i; j++) {
        c[i] += buf2[j] * buf2[j + i];
      }
    }
    
    let d = 0;
    for (let i = 1; i < c.length; i++) {
      if (c[i] > c[d]) d = i;
    }
    
    let maxValue = -1, maxIndex = -1;
    for (let i = d; i < c.length; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }
    
    let t0 = maxIndex;
    const interpolation = (c[t0 + 1] - c[t0 - 1]) / (2 * (2 * c[t0] - c[t0 - 1] - c[t0 + 1]));
    t0 += interpolation;
    
    return sampleRate / t0;
  }
}

export const noteRecognitionService = new NoteRecognitionService(); 