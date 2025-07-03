
export interface Product {
  id: string; // Will be a slug, e.g., 'cafe-ragonvalia'
  slug: string;
  name: string;
  origin: string;
  images: string[];
  variants: ProductVariant[];
  stock: number; // Total stock of all variants
  category: string;
  featured?: boolean;
  active?: boolean;
  createdAt?: string | Date;
  observations?: string;
  price: number; // Base price of the first variant
  description?: string;
  rating?: number;
  roastType?: string[];
  flavorProfile?: string[];
  longDescription?: string;
  originDetails?: string;
  processDetails?: string;
  preparationRecommendations?: string;
  intensity?: number;
}

export interface ProductVariant {
  id: string; // The original DB key, e.g., 'cafe_ragonvalia_125g'
  size: string; // Corresponds to 'weight' from DB
  price: number;
  stock: number;
  packaging: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  mapHighlightPath: string; // For interactive map
}

export interface Testimonial {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  text: string;
  coffeeReviewed?: string;
}

export interface CartItem extends Omit<Product, 'variants' | 'stock'> {
  quantity: number;
  selectedVariant: ProductVariant;
  stock: number; // Stock of the selected variant
}

// Declaración global para el widget de Cloudinary
declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (options: any, callback: (error: any, result: any) => void) => void;
    };
  }
}
