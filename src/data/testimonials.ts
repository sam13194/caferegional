import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    userName: 'Ana Pérez',
    userImage: 'https://placehold.co/100x100.png',
    rating: 5,
    text: '¡El café de Ragonvalia es simplemente espectacular! Fresco, aromático y con un sabor que enamora. Definitivamente mi nuevo favorito.',
    coffeeReviewed: 'Café Excelso Ragonvalia'
  },
  {
    id: '2',
    userName: 'Carlos Gómez',
    rating: 4,
    text: 'Muy buen café el de Arboledas. Tiene un cuerpo increíble y esas notas a chocolate son deliciosas. El envío fue rápido y todo llegó perfecto.',
    coffeeReviewed: 'Café Premium Arboledas'
  },
  {
    id: '3',
    userName: 'Sofía Rodríguez',
    userImage: 'https://placehold.co/100x100.png',
    rating: 5,
    text: 'Me encantó la suavidad del café de Durania. Es perfecto para mis mañanas. Además, el servicio al cliente fue muy amable y resolvieron mis dudas.',
    coffeeReviewed: 'Café Tradicional Durania'
  },
  {
    id: '4',
    userName: 'Javier Loaiza',
    rating: 5,
    text: 'El "Montaña Dorada" es una experiencia sensorial. Cada sorbo es diferente. ¡Recomendadísimo para los que buscan algo especial!',
    coffeeReviewed: 'Café Especial "Montaña Dorada"'
  }
];