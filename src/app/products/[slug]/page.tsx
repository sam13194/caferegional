
import { notFound } from 'next/navigation';
import ProductClientPage from '@/components/products/ProductClientPage';
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import type { Product } from '@/types';

async function getProductsFromFirebase(): Promise<Product[]> {
    const productsRef = ref(rtdb, 'products');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
        const productsObject = snapshot.val();
        return Object.values(productsObject);
    }
    return [];
}

async function findProductBySlug(slug: string): Promise<Product | undefined> {
    const products = await getProductsFromFirebase();
    return products.find(p => p.slug === slug);
}

export async function generateStaticParams() {
  const products = await getProductsFromFirebase();
  return products.map((product) => ({
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
