import Image from 'next/image';
import { regions } from '@/data/regions';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Mountain, Sun, Coffee } from 'lucide-react';

export async function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }));
}

interface RegionPageProps {
  params: { slug: string };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const region = regions.find(r => r.slug === params.slug);

  if (!region) {
    return <div className="text-center py-10">Región no encontrada.</div>;
  }

  const regionProducts = products.filter(p => p.region.toLowerCase() === region.name.toLowerCase());

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <header className="relative h-[40vh] md:h-[50vh] rounded-lg overflow-hidden shadow-xl mb-12">
         <Image 
            src={region.imageUrl} 
            alt={`Paisaje de ${region.name}`} 
            layout="fill" 
            objectFit="cover"
            priority
            data-ai-hint="coffee landscape region specific"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
            <h1 className="font-lora text-4xl md:text-6xl font-bold text-white leading-tight">{region.name}</h1>
            <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl">{region.shortDescription}</p>
          </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6 mb-12 text-center">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <Mountain className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-lora text-xl font-semibold mb-1">Altitud Promedio</h3>
          <p className="text-muted-foreground">1500 - 1900 msnm (Ejemplo)</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <Sun className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-lora text-xl font-semibold mb-1">Clima Típico</h3>
          <p className="text-muted-foreground">Templado, con temporadas de lluvia (Ejemplo)</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <Coffee className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-lora text-xl font-semibold mb-1">Perfil de Sabor</h3>
          <p className="text-muted-foreground">Notas {region.shortDescription.split(' ').slice(-2).join(' ').toLowerCase()} (Ejemplo)</p>
        </div>
      </section>
      
      <section>
        <h2 className="font-lora text-3xl font-semibold text-primary mb-4">Descubre {region.name}</h2>
        <div className="prose max-w-none text-foreground leading-relaxed">
          <p>{region.description}</p>
          {/* Add more detailed content about the region */}
          <p>La cultura cafetera en {region.name} está profundamente arraigada, con generaciones de familias dedicadas al cultivo de granos de la más alta calidad. Las técnicas tradicionales se combinan con innovaciones para producir cafés que reflejan el terruño único de esta zona.</p>
        </div>
      </section>

      {regionProducts.length > 0 && (
        <section>
          <h2 className="font-lora text-3xl font-semibold text-primary mb-6 mt-12">Cafés de {region.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 text-center">
        <Link href="/products" passHref>
          <Button size="lg" variant="outline">
            <MapPin className="mr-2 h-5 w-5" /> Ver todos los cafés
          </Button>
        </Link>
      </section>
    </div>
  );
}