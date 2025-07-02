import type { Timestamp } from 'firebase/firestore';
import type { StaticImageData } from 'next/image';

export interface ProductVariant {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Base price, variants can override
  images: (string | StaticImageData)[];
  region: string; // UI-friendly version of origin
  stock: number;
  
  // Existing fields for UI that can be mapped from firestore
  longDescription?: string;
  roastType: string[];
  flavorProfile: string[];
  intensity: number;
  rating?: number;
  originDetails?: string;
  processDetails?: string;
  preparationRecommendations?: string;
  packaging?: string;
  observations?: string;

  // Fields from Firestore schema
  category?: string;
  origin?: string;
  featured?: boolean;
  active?: boolean;
  createdAt?: Timestamp | Date;
  variants: ProductVariant[];
}

export interface Region {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string | StaticImageData;
  mapHighlightPath?: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  userImage?: string | StaticImageData;
  rating: number;
  text: string;
  coffeeReviewed?: string;
}

export interface CartItem {
  // Store a snapshot of the product info at time of adding
  id: string; // Product ID
  name: string;
  slug: string;
  image: string | StaticImageData;
  region: string;
  stock: number;
  quantity: number;
  selectedVariant: ProductVariant;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
}

export interface Address {
    id: string;
    street: string;
    city: string;
    department: string;
    postalCode: string;
    isDefault: boolean;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: Address[];
  createdAt?: Timestamp | Date;
}

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number; // Price at time of purchase
    size: string;
    total: number;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Timestamp | Date;
  estimatedDelivery?: Timestamp | Date;
}
