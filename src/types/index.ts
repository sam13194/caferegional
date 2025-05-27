import type { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  imageUrl: string | StaticImageData;
  images?: (string | StaticImageData)[];
  region: string;
  roastType: string[]; // e.g., ["Grano Entero", "Molido Fino"]
  flavorProfile: string[]; // e.g., ["Cítrico", "Achocolatado"]
  intensity: number; // 1-5
  stock: number;
  rating?: number; // Average rating
  slug: string;
  originDetails?: string;
  processDetails?: string;
  preparationRecommendations?: string;
}

export interface Region {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string | StaticImageData;
  mapHighlightPath?: string; // For potential SVG map highlighting
  slug: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  userImage?: string | StaticImageData; // Optional user image
  rating: number; // 1-5
  text: string;
  coffeeReviewed?: string; // Optional: name of coffee
}

export interface CartItem extends Product {
  quantity: number;
  selectedGrind?: string; // If applicable
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}