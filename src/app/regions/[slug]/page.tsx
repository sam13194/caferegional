import { regions } from '@/data/regions';
import { notFound } from 'next/navigation';
import RegionClientPage from '@/components/ui/RegionClientPage';
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import { groupProductsByVariant } from '@/lib/utils';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  // This can still be used to hint Next.js about possible paths
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

interface RegionPageProps {
  params: { slug: string };
}

async function getProducts(): Promise<Product[]> {
  const productsRef = ref(rtdb, 'products');
  const snapshot = await get(productsRef);
  if (snapshot.exists()) {
    return groupProductsByVariant(snapshot.val());
  }
  return [];
}

export default async function RegionPage({ params }: RegionPageProps) {
  const region = regions.find(r => r.slug === params.slug);

  if (!region) {
    notFound();
  }

  const allProducts = await getProducts();
  
  // Filter products where the origin string includes the region name, case-insensitively
  const regionProducts = allProducts.filter(p => 
    p.origin && p.origin.toLowerCase().includes(region.name.toLowerCase())
  );

  return <RegionClientPage region={region} regionProducts={regionProducts} />;
}
