import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, ProductVariant } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to generate a URL-friendly slug
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export function groupProductsByVariant(rawProducts: { [key: string]: any }): Product[] {
  if (!rawProducts) return [];

  const grouped: { [key: string]: Product } = {};

  for (const key in rawProducts) {
    const p = rawProducts[key];
    const groupKey = p.name; // Group by name

    if (!grouped[groupKey]) {
      const slug = generateSlug(p.name);
      grouped[groupKey] = {
        id: slug,
        slug: slug,
        name: p.name,
        origin: p.origin,
        images: p.images && p.images.length > 0 ? p.images : ['https://placehold.co/800x600.png'],
        variants: [],
        stock: 0,
        category: p.category,
        featured: p.featured,
        active: p.active,
        createdAt: p.createdAt,
        observations: p.observations,
        price: p.price, // Will be overwritten by first variant's price
      };
    }
    
    const variant: ProductVariant = {
      id: p.id,
      size: p.weight,
      price: p.price,
      stock: p.stock,
      packaging: p.packaging,
    };

    grouped[groupKey].variants.push(variant);
  }

  // Post-process to calculate total stock and set base price
  return Object.values(grouped).map(product => {
    // Sort variants by price to have a consistent default
    product.variants.sort((a, b) => a.price - b.price);
    
    product.stock = product.variants.reduce((total, v) => total + v.stock, 0);
    product.price = product.variants[0]?.price || 0;
    
    // Use first observation found if multiple exist and combine images
    const allImages = new Set<string>();
    let firstObservation: string | undefined = undefined;

    Object.values(rawProducts).forEach(rp => {
      if (rp.name === product.name) {
        if (rp.observations && !firstObservation) {
          firstObservation = rp.observations;
        }
        if (rp.images && rp.images.length > 0) {
          rp.images.forEach((img: string) => allImages.add(img));
        }
      }
    });
    
    product.observations = firstObservation || product.observations;
    const images = Array.from(allImages);
    if(images.length > 0) {
      product.images = images;
    }


    return product;
  });
}
