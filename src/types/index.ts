export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  slug: string;
  origin?: string;
  variants: ProductVariant[];
  rating?: number;
  featured?: boolean;
  active?: boolean;
  createdAt?: string;
  observations?: string;
  packaging?: string;
  weight?: string;
}

export interface ProductVariant {
  size: string;
  price: number;
  stock: number;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  provinces?: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
}

// Declaración global para el widget de Cloudinary
declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (options: any, callback: (error: any, result: any) => void) => void;
    };
  }
}
