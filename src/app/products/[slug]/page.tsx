import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductClientPage from '@/components/products/ProductClientPage';

function findProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductClientPage initialProduct={product} />;
}
