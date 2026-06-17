import { Layers, MessageCircle, Cloud } from 'lucide-react';
import type React from 'react';

export const POPULAR_TAGS = ['react', 'typescript', 'nodejs', 'nestjs', 'postgresql'] as const;

export const GRAINIENT_PROPS = {
  color1: '#772df6',
  color2: '#180931',
  color3: '#ad81fa',
  timeSpeed: 1.1,
  colorBalance: -0.41,
  warpStrength: 0.2,
  warpFrequency: 10,
  warpSpeed: 2,
  warpAmplitude: 600,
  rotationAmount: 650,
  noiseScale: 2,
  contrast: 1.65,
  saturation: 1.45,
};

export const STATS: Array<{ n: string; key: string }> = [
  { n: '120+', key: 'products' },
  { n: '9 yrs', key: 'years' },
  { n: '40+', key: 'team' },
  { n: '99.9%', key: 'uptime' },
];

export const PRODUCTS: Array<{ key: string; Icon: React.ElementType; link: string }> = [
  { key: 'flagship', Icon: Layers, link: 'codeways.software' },
  { key: 'mesh', Icon: MessageCircle, link: 'mesh.codeways.software' },
  { key: 'forge', Icon: Cloud, link: 'forge.codeways.software' },
];
