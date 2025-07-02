import { regions } from '@/data/regions';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import RegionClientPage from '@/components/ui/RegionClientPage';

export async function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

interface RegionPageProps {
  params: { slug: string };
}

export default function RegionPage({ params }: RegionPageProps) {
  const region = regions.find(r => r.slug === params.slug);

  if (!region) {
    notFound();
  }

  const regionProducts = products.filter(p => p.region.toLowerCase() === region.name.toLowerCase());

  return <RegionClientPage region={region} regionProducts={regionProducts} />;
}
