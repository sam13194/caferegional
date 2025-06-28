import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RegionCard from '@/components/ui/RegionCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { regions } from '@/data/regions';
import { testimonials } from '@/data/testimonials';
import { Package, Award, Leaf, Send } from 'lucide-react'; // Leaf instead of Sparkles

export default function HomePage() {
  const valueProps = [
    { icon: Package, title: "100% Origen Único", description: "Trazabilidad y transparencia desde la finca." },
    { icon: Award, title: "Calidad Artesanal", description: "Granos seleccionados y tostados a la perfección." },
    { icon: Leaf, title: "Frescura Garantizada", description: "Molido al instante para una experiencia superior." }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Cultivos de café colombiano"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
          data-ai-hint="coffee plantation landscape"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 p-6 space-y-6 max-w-3xl">
          <h1 className="font-lora text-4xl md:text-6xl font-bold text-white leading-tight">
            Café Regional: El Auténtico Sabor de Colombia
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Descubre la riqueza y tradición de Ragonvalia, Arboledas y Durania en cada sorbo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" passHref>
              <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                DESCUBRIR NUESTROS CAFÉS
              </Button>
            </Link>
            <Link href="/regions" passHref>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                CONOCE LAS REGIONES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {valueProps.map((prop) => (
            <div key={prop.title} className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <prop.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-lora text-xl font-semibold mb-2 text-foreground">{prop.title}</h3>
              <p className="text-sm text-muted-foreground">{prop.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regions Section */}
      <section>
        <h2 className="font-lora text-3xl font-bold text-center mb-10 text-primary">Explora Nuestras Regiones Cafeteras</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {regions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
        <div className="text-center mt-10">
          <div className="inline-block p-6 border-2 border-dashed border-border rounded-lg text-muted-foreground">
            <h3 className="font-lora text-xl">Próximas Regiones...</h3>
            <p>¡Estamos trabajando para traer más sabores de Colombia a tu taza!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-muted rounded-lg">
        <h2 className="font-lora text-3xl font-bold text-center mb-10 text-primary">Lo que Dicen Nuestros Clientes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* Adjusted for better display */}
          {testimonials.slice(0, 4).map((testimonial) => ( // Display up to 4 testimonials
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Link href="/reviews" passHref>
                 <Button variant="outline">Ver todas las reseñas</Button>
            </Link>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-12 text-center bg-secondary rounded-lg shadow-inner">
        <h2 className="font-lora text-3xl font-bold mb-3 text-primary">Únete a la Familia Café Regional</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Recibe ofertas exclusivas, noticias de nuevas cosechas y consejos de preparación. ¡10% de descuento en tu primera compra!
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="flex-grow text-base"
            aria-label="Correo electrónico para newsletter"
          />
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send size={18} className="mr-2"/> SUSCRIBIRME
          </Button>
        </form>
      </section>
    </div>
  );
}
