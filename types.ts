export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface Palette {
  name: string;
  description: string;
  colors: string[];
}

export interface HarmonyResult {
  base: { hex: string; tag: string; h: number };
  comp: { hex: string; tag: string; h: number };
  ana1: { hex: string; tag: string; h: number };
  ana2: { hex: string; tag: string; h: number };
  tri1: { hex: string; tag: string; h: number };
  tri2: { hex: string; tag: string; h: number };
  split1: { hex: string; tag: string; h: number };
  split2: { hex: string; tag: string; h: number };
}