
import { notFound } from 'next/navigation';
import ProductClientPage from '@/components/products/ProductClientPage';
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import type { Product } from '@/types';

async function getProductsFromFirebase(): Promise<Product[]> {
    const productsRef = ref(rtdb, 'products');
    try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
            const productsObject = snapshot.val();
            // Ensure we return an array of products, filtering out any null/undefined entries
            return Object.values(productsObject || {}).filter(p => p) as Product[];
        }
    } catch (error) {
        console.error("Error fetching products from Firebase for build:", error);
    }
    return [];
}

async function findProductBySlug(slug: string): Promise<Product | undefined> {
    const products = await getProductsFromFirebase();
    return products.find(p => p.slug === slug);
}

export async function generateStaticParams() {
  const products = await getProductsFromFirebase();
  
  return products
    // Filter out products that don't have a valid slug property
    .filter(product => product && typeof product.slug === 'string' && product.slug.length > 0)
    .map((product) => ({
      slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await findProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductClientPage initialProduct={product} />;
}
