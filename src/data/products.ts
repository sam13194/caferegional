import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'cafe-ragonvalia',
    name: 'Café Ragonvalia',
    slug: 'cafe-ragonvalia',
    description: 'Un café balanceado con notas cítricas de las montañas de Ragonvalia.',
    longDescription: 'Cultivado en las fértiles tierras de Ragonvalia, Norte de Santander, este café se caracteriza por su acidez brillante y cuerpo medio.',
    price: 7000, // Base price from smallest variant
    images: [
        'https://placehold.co/800x600.png',
        'https://placehold.co/800x600.png',
    ],
    region: 'Ragonvalia',
    roastType: ['Tueste Medio'],
    flavorProfile: ['Cítrico', 'Dulce', 'Balanceado'],
    intensity: 3,
    stock: 80, // Sum of variants
    rating: 4.5,
    originDetails: 'Origen: Ragonvalia, Norte de Santander.',
    packaging: "bolsa Doypack zipper",
    processDetails: 'Procesos de alta calidad para garantizar el mejor sabor.',
    preparationRecommendations: 'Ideal para métodos de goteo y Aeropress.',
    category: 'cafe_premium',
    origin: 'Ragonvalia, Norte de Santander',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "125g", price: 7000 },
      { size: "500g", price: 18000 }
    ]
  },
  {
    id: 'cafe-arboledas',
    name: 'Café Arboledas',
    slug: 'cafe-arboledas',
    description: 'Sabor intenso y achocolatado, cultivado en las alturas de Arboledas.',
    longDescription: 'Desde el corazón de Arboledas, este café ofrece una experiencia robusta con un cuerpo pronunciado y deliciosas notas a chocolate oscuro y nueces.',
    price: 7000,
    images: [
        'https://i.postimg.cc/9QNzc0tK/IMG-20250629-134401.png',
        'https://placehold.co/800x600.png',
    ],
    region: 'Arboledas',
    roastType: ['Tueste Oscuro'],
    flavorProfile: ['Achocolatado', 'Nuez', 'Intenso'],
    intensity: 5,
    stock: 80,
    rating: 4.8,
    originDetails: 'Origen: Arboledas, Norte de Santander.',
    packaging: "bolsa marrón doypack zipper",
    processDetails: 'Natural. Secado en camas africanas.',
    preparationRecommendations: 'Excelente para Espresso y Prensa Francesa.',
    category: 'cafe_premium',
    origin: 'Arboledas, Norte de Santander',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "125g", price: 7000 },
      { size: "500g", price: 18000 }
    ]
  },
  {
    id: 'cafe-durania',
    name: 'Café Durania',
    slug: 'cafe-durania',
    description: 'Un clásico suave y aromático, perfecto para el día a día.',
    longDescription: 'El café tradicional de Durania es conocido por su suavidad y perfil aromático floral. Con un cuerpo ligero y acidez equilibrada, es una excelente opción para disfrutar.',
    price: 7000,
    images: [
        'https://placehold.co/800x600.png',
    ],
    region: 'Durania',
    roastType: ['Tueste Claro'],
    flavorProfile: ['Floral', 'Suave', 'Aromático'],
    intensity: 2,
    stock: 80,
    rating: 4.2,
    originDetails: 'Origen: Durania, Norte de Santander.',
    packaging: "bolsa amarillo Doypack zipper",
    processDetails: 'Lavado. Secado tradicional en patio.',
    preparationRecommendations: 'Recomendado para métodos de infusión como la cafetera de goteo tradicional.',
    category: 'cafe_premium',
    origin: 'Durania, Norte de Santander',
    featured: false,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "125g", price: 7000 },
      { size: "500g", price: 18000 }
    ]
  },
   {
    id: 'cafe-arboledas-premium-pote',
    name: 'Café Arboledas Premium',
    slug: 'cafe-arboledas-premium-pote',
    description: 'Presentación premium en pote plástico transparente.',
    longDescription: 'Una presentación especial de nuestro café de Arboledas, en un práctico pote plástico que conserva su frescura y aroma. Mismo sabor intenso, nueva presentación.',
    price: 25000,
    images: [
        'https://placehold.co/800x600.png',
    ],
    region: 'Arboledas',
    roastType: ['Tueste Oscuro'],
    flavorProfile: ['Achocolatado', 'Nuez', 'Intenso'],
    intensity: 5,
    stock: 20,
    rating: 4.9,
    originDetails: 'Origen: Arboledas, Norte de Santander.',
    packaging: "Pote plástico transparente",
    observations: "Presentación premium",
    processDetails: 'Natural. Secado en camas africanas.',
    preparationRecommendations: 'Excelente para Espresso y Prensa Francesa.',
    category: 'cafe_premium',
    origin: 'Arboledas, Norte de Santander',
    featured: true,
    active: true,
    createdAt: new Date(),
    variants: [
      { size: "500g", price: 25000 }
    ]
  }
];
