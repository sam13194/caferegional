import RegionCard from '@/components/ui/RegionCard';
import { regions } from '@/data/regions';
import Image from 'next/image';

export default function RegionsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Nuestras Regiones Cafeteras</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cada región de Colombia ofrece un perfil de sabor único, influenciado por su altitud, clima y tradiciones. Descubre la diversidad del café colombiano.
        </p>
      </header>

      {/* Placeholder for Interactive Map */}
      <section className="mb-12">
        <div className="relative h-64 md:h-96 w-full bg-muted rounded-lg shadow-md overflow-hidden">
          <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Mapa de regiones cafeteras de Colombia" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="colombia map coffee"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-white text-2xl font-semibold p-4 bg-black/50 rounded">
              Mapa Interactivo (Próximamente)
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Visualiza nuestras regiones productoras y explora sus características únicas.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </section>

       <section className="mt-16 text-center py-10 bg-secondary rounded-lg">
        <h2 className="font-lora text-3xl font-semibold text-primary mb-4">¿Nuevas Regiones en el Horizonte?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Estamos constantemente explorando nuevas fincas y cooperativas para ampliar nuestra selección de cafés de origen. ¡Mantente atento a futuras incorporaciones!
        </p>
        {/* Optional: Link to newsletter or contact for suggestions */}
      </section>
    </div>
  );
}