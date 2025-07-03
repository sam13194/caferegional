
import { notFound } from 'next/navigation';
import ProductClientPage from '@/components/products/ProductClientPage';
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import type { Product } from '@/types';
import { groupProductsByVariant } from '@/lib/utils';

// Force dynamic rendering to ensure data is fetched on each request
export const dynamic = 'force-dynamic';

async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const productsRef = ref(rtdb, 'products');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
        const groupedProducts = groupProductsByVariant(snapshot.val());
        return groupedProducts.find(p => p.slug === slug);
    }
    return undefined;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Fetch all products to pass for "related products" section
  const productsRef = ref(rtdb, 'products');
  const allProductsSnapshot = await get(productsRef);
  const allProducts = allProductsSnapshot.exists() ? groupProductsByVariant(allProductsSnapshot.val()) : [];

  return <ProductClientPage initialProduct={product} allProducts={allProducts} />;
}
