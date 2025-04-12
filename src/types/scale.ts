export interface Scale {
  id: string;
  name: string;
  notes: string[];
  description: string;
}

export interface ScaleState {
  selectedScale: Scale | null;
  selectedKey: string | null;
  scales: Scale[];
} 