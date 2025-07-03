import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product, ProductVariant } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to generate a URL-friendly slug
const generateSlug = (name: string): string => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return name.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function groupProductsByVariant(rawProducts: { [key: string]: any }): Product[] {
  if (!rawProducts) return [];

  const productGroups: { [key: string]: {
    id: string; // This will be the slug
    slug: string;
    name: string;
    variants: ProductVariant[];
    allImages: Set<string>;
    allObservations: Set<string>;
    allRoastTypes: Set<string>;
    allFlavorProfiles: Set<string>;
    // Keep track of first values found for properties that should be consistent across variants
    baseProperties: Partial<Omit<Product, 'id' | 'slug' | 'name' | 'variants' | 'images'>>
  } } = {};

  // First pass: group variants and collect all data
  for (const dbKey in rawProducts) {
    const p = rawProducts[dbKey];
    if (!p || !p.name) continue; // Skip malformed entries

    const groupKey = p.name;

    if (!productGroups[groupKey]) {
      const slug = generateSlug(groupKey);
      productGroups[groupKey] = {
        id: slug,
        slug: slug,
        name: groupKey,
        variants: [],
        allImages: new Set(),
        allObservations: new Set(),
        allRoastTypes: new Set(),
        allFlavorProfiles: new Set(),
        baseProperties: {
          origin: p.origin,
          category: p.category,
          featured: p.featured,
          active: p.active,
          createdAt: p.createdAt,
          description: p.description,
          longDescription: p.longDescription,
          originDetails: p.originDetails,
          processDetails: p.processDetails,
          preparationRecommendations: p.preparationRecommendations,
          rating: p.rating,
          intensity: p.intensity
        }
      };
    }

    const group = productGroups[groupKey];
    
    // Add variant
    const variant: ProductVariant = {
      id: p.id || dbKey, // Use product id if it exists, otherwise the db key
      size: p.weight || 'N/A',
      price: p.price || 0,
      stock: p.stock || 0,
      packaging: p.packaging || 'N/A',
    };
    group.variants.push(variant);

    // Collect unique images, observations, etc.
    if (p.images && Array.isArray(p.images)) {
      p.images.forEach((img: string) => group.allImages.add(img));
    }
    if (p.observations) {
      group.allObservations.add(p.observations);
    }
    if (p.roastType && Array.isArray(p.roastType)) {
        p.roastType.forEach((rt: string) => group.allRoastTypes.add(rt));
    }
    if (p.flavorProfile && Array.isArray(p.flavorProfile)) {
        p.flavorProfile.forEach((fp: string) => group.allFlavorProfiles.add(fp));
    }
  }

  // Second pass: Finalize each product object
  return Object.values(productGroups).map(group => {
    // Sort variants by price to have a consistent default
    group.variants.sort((a, b) => a.price - b.price);

    const totalStock = group.variants.reduce((total, v) => total + v.stock, 0);
    const basePrice = group.variants[0]?.price || 0;
    const images = Array.from(group.allImages);

    const finalProduct: Product = {
      ...group.baseProperties,
      id: group.id,
      slug: group.slug,
      name: group.name,
      variants: group.variants,
      images: images.length > 0 ? images : ['https://placehold.co/800x600.png'],
      stock: totalStock,
      price: basePrice,
      observations: Array.from(group.allObservations).join(' '),
      roastType: Array.from(group.allRoastTypes),
      flavorProfile: Array.from(group.allFlavorProfiles),
    };

    return finalProduct;
  });
}
