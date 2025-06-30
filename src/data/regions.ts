import type { Region } from '@/types';

export const regions: Region[] = [
  {
    id: '1',
    name: 'Ragonvalia',
    slug: 'ragonvalia',
    shortDescription: 'Sabores balanceados con notas cítricas de las montañas.',
    description: 'Ragonvalia, enclavada en las montañas de Norte de Santander, es una tierra de café excepcional. Sus altitudes y microclimas únicos producen granos con una acidez brillante y perfiles de sabor complejos, a menudo con notas cítricas y dulces reminiscentes de la panela.',
    imageUrl: 'https://i.postimg.cc/bNBkFhNR/download.jpg',
    mapHighlightPath: 'M10 80 Q 95 10 180 80 Q 95 200 10 80 Z', // Placeholder SVG path
  },
  {
    id: '2',
    name: 'Arboledas',
    slug: 'arboledas',
    shortDescription: 'Cafés intensos y achocolatados de gran altura.',
    description: 'Arboledas, con sus imponentes picos y valles fértiles, es cuna de cafés con cuerpo y carácter. Los granos cultivados aquí suelen desarrollar notas profundas a chocolate, nueces y un dulzor residual que perdura en el paladar. Es una región que produce cafés robustos y memorables.',
    imageUrl: 'https://i.postimg.cc/L8sTWDpz/download.jpg',
    mapHighlightPath: 'M50 50 Q 100 0 150 50 Q 100 150 50 50 Z', // Placeholder SVG path
  },
  {
    id: '3',
    name: 'Durania',
    slug: 'durania',
    shortDescription: 'Aromas florales y suavidad en cada taza.',
    description: 'Durania, con su tradición cafetera arraigada, nos regala cafés de perfil suave y aromático. Sus granos, cultivados con esmero por generaciones de caficultores, se distinguen por sus delicadas notas florales y una acidez equilibrada, resultando en una taza limpia y reconfortante.',
    imageUrl: 'https://i.postimg.cc/qRpgmbfr/download.jpg',
    mapHighlightPath: 'M30 40 Q 120 30 200 100 Q 50 180 30 40 Z', // Placeholder SVG path
  }
];
