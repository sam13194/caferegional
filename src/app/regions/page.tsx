
"use client";

import RegionCard from '@/components/ui/RegionCard';
import { regions } from '@/data/regions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const regionViews = {
  ragonvalia: "https://earth.google.com/web/search/Ragonvalia,+Norte+de+Santander/@7.58127154,-72.4762402,1559.49161557a,2478.9688543d,35y,-0.00047692h,76.9989825t,359.99999864r/data=CiwiJgokCXHIIP1TmR5AER_zBV-Eix5AGU1hcN0YMlLAIdvnVbPYM1LAQgIIAUICCABKDQj___________8BEAA",
  arboledas: "https://earth.google.com/web/search/Arboledas,+North+Santander/@7.64193995,-72.79721486,929.3962823a,1896.56918358d,35y,-50.00135106h,88.24362849t,0r/data=CiwiJgokCTkKjJ_y3h5AEVbq_cDrUR5AGQKEVbhtGFLAIXQf0TFlIlLAQgIIATIpCicKJQohMUhFSlk2dU1wTkloTVlmMTg5OWdCVmdsVVJkQmV2SmxMIAE6AwoBMEICCABKCAjZ9_7kAhAB",
  durania: "https://earth.google.com/web/search/Durania,+Duran%c3%ada,+Norte+de+Santander/@7.72027764,-72.66922229,999.82965182a,2581.41810815d,35y,-68.00213826h,85.25076781t,360r/data=CiwiJgokCZ6vdEwWXh5AES28b7P8PB5AGUYT6UMFHVLAIRZYn2XwH1LAQgIIAUICCABKDQj___________8BEAA",
};


export default function RegionsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Nuestras Regiones Cafeteras</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cada región de Colombia ofrece un perfil de sabor único, influenciado por su altitud, clima y tradiciones. Descubre la diversidad del café colombiano.
        </p>
      </header>

      {/* Google Earth Views section */}
      <section className="mb-12">
        <Tabs defaultValue="ragonvalia" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
            {regions.map(region => (
              <TabsTrigger key={region.slug} value={region.slug}>{region.name}</TabsTrigger>
            ))}
          </TabsList>
          {regions.map(region => (
            <TabsContent key={region.slug} value={region.slug}>
              <div className="relative h-96 lg:h-[500px] w-full bg-muted rounded-lg shadow-md overflow-hidden mt-2 flex flex-col items-center justify-center text-center p-4">
                  <Image 
                    src={region.imageUrl} 
                    alt={`Paisaje de ${region.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                    data-ai-hint="coffee landscape region specific"
                  />
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>
                  <div className="relative z-10 text-white">
                      <h3 className="font-lora text-3xl font-bold mb-4">Explora {region.name}</h3>
                      <p className="mb-6 max-w-md mx-auto text-gray-200">
                        Descubre la geografía única que da a nuestro café su sabor distintivo. Abre una vista interactiva de la región en Google Earth.
                      </p>
                      <Button asChild size="lg">
                        <Link href={regionViews[region.slug as keyof typeof regionViews]} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-5 w-5"/>
                          Ver {region.name} en Google Earth
                        </Link>
                      </Link>
                  </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Selecciona una región para explorar su geografía.
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
      </section>
    </div>
  );
}
