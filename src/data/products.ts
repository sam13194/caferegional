import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Café Excelso Ragonvalia',
    slug: 'cafe-excelso-ragonvalia',
    description: 'Un café balanceado con notas cítricas de las montañas de Ragonvalia.',
    longDescription: 'Cultivado en las fértiles tierras de Ragonvalia, Norte de Santander, este café Excelso se caracteriza por su acidez brillante y cuerpo medio. Disfruta de sus sutiles notas a naranja y panela que te transportarán a los Andes colombianos.',
    price: 25000,
    images: [
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
    ],
    region: 'Ragonvalia',
    roastType: ['Tueste Medio'],
    flavorProfile: ['Cítrico', 'Dulce', 'Balanceado'],
    intensity: 3,
    stock: 50,
    rating: 4.5,
    originDetails: 'Finca La Esperanza, Vereda San Miguel, Ragonvalia. Altitud: 1600-1800 msnm. Variedad: Castillo, Caturra.',
    processDetails: 'Lavado. Secado al sol en marquesinas.',
    preparationRecommendations: 'Ideal para métodos de goteo (V60, Chemex) y Aeropress. Resalta su acidez y notas frutales.',
    category: 'cafe_premium',
    origin: 'Ragonvalia, Norte de Santander',
    weight: '250g',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "250g", price: 25000 },
      { size: "500g", price: 45000 }
    ]
  },
  {
    id: '2',
    name: 'Café Premium Arboledas',
    slug: 'cafe-premium-arboledas',
    description: 'Sabor intenso y achocolatado, cultivado en las alturas de Arboledas.',
    longDescription: 'Desde el corazón de Arboledas, este café premium ofrece una experiencia robusta con un cuerpo pronunciado y deliciosas notas a chocolate oscuro y nueces. Perfecto para quienes buscan un café con carácter.',
    price: 28000,
    images: [
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
    ],
    region: 'Arboledas',
    roastType: ['Tueste Oscuro'],
    flavorProfile: ['Achocolatado', 'Nuez', 'Intenso'],
    intensity: 5,
    stock: 30,
    rating: 4.8,
    originDetails: 'Cooperativa Cafetera de Arboledas. Altitud: 1700-1900 msnm. Variedad: Tabi, Bourbon.',
    processDetails: 'Natural. Secado en camas africanas.',
    preparationRecommendations: 'Excelente para Espresso y Prensa Francesa. Su intensidad y cuerpo lo hacen ideal para bebidas con leche.',
    category: 'cafe_premium',
    origin: 'Arboledas, Norte de Santander',
    weight: '500g',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "500g", price: 28000 },
      { size: "1000g", price: 52000 }
    ]
  },
  {
    id: '3',
    name: 'Café Tradicional Durania',
    slug: 'cafe-tradicional-durania',
    description: 'Un clásico suave y aromático, perfecto para el día a día.',
    longDescription: 'El café tradicional de Durania es conocido por su suavidad y perfil aromático floral. Con un cuerpo ligero y acidez equilibrada, es una excelente opción para disfrutar en cualquier momento del día.',
    price: 22000,
    images: [
        'https://placehold.co/800x600.png',
    ],
    region: 'Durania',
    roastType: ['Tueste Claro'],
    flavorProfile: ['Floral', 'Suave', 'Aromático'],
    intensity: 2,
    stock: 70,
    rating: 4.2,
    originDetails: 'Asociación de Productores de Durania. Altitud: 1500-1700 msnm. Variedad: Colombia, Castillo.',
    processDetails: 'Lavado. Secado tradicional en patio.',
    preparationRecommendations: 'Recomendado para métodos de infusión como la cafetera de goteo tradicional o Chemex. Perfecto para tomar solo.',
    category: 'cafe_tradicional',
    origin: 'Durania, Norte de Santander',
    weight: '500g',
    featured: false,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "500g", price: 22000 }
    ]
  },
  {
    id: '4',
    name: 'Café Especial "Montaña Dorada"',
    slug: 'cafe-especial-montana-dorada',
    description: 'Edición limitada con notas exóticas y un proceso de fermentación único.',
    longDescription: 'Nuestra Montaña Dorada es una joya de Ragonvalia, procesado con una fermentación anaeróbica controlada que resalta notas exóticas a frutas tropicales y un dulzor complejo. Una experiencia única para paladares aventureros.',
    price: 35000,
    images: [
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
    ],
    region: 'Ragonvalia',
    roastType: ['Tueste Especial'],
    flavorProfile: ['Frutas Tropicales', 'Complejo', 'Exótico'],
    intensity: 4,
    stock: 15,
    rating: 4.9,
    originDetails: 'Finca El Mirador, Vereda El Oro, Ragonvalia. Altitud: 1850 msnm. Variedad: Geisha.',
    processDetails: 'Honey, Fermentación Anaeróbica. Secado lento en camas elevadas.',
    preparationRecommendations: 'Ideal para métodos de preparación manual como V60, Kalita Wave o Sifón. Disfrutar sin leche para apreciar su complejidad.',
    category: 'cafe_especial',
    origin: 'Ragonvalia, Norte de Santander',
    weight: '250g',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "250g", price: 35000 }
    ]
  }
];
