
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  slug?: string;
  origin?: string;
  variants?: ProductVariant[];
  rating?: number;
  featured?: boolean;
  active?: boolean;
  createdAt?: string | Date;
  observations?: string;
  packaging?: string;
  weight?: string;
  intensity?: number;
  flavorProfile?: string[];
  roastType?: string[];
  longDescription?: string;
  originDetails?: string;
  processDetails?: string;
  preparationRecommendations?: string;
}

export interface ProductVariant {
  size: string;
  price: number;
  stock?: number; // Stock can be at the variant level
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

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
  // Make region optional as it may not exist in all product contexts
  region?: string;
}

// Declaración global para el widget de Cloudinary
declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (options: any, callback: (error: any, result: any) => void) => void;
    };
  }
}
