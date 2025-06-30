import Image from 'next/image';
import { Leaf, Target, Users, GitCommitVertical } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Sobre Café Regional</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Nuestra pasión es llevarte el auténtico sabor del café colombiano, conectándote con las historias, las familias y el esmero detrás de cada grano.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-lora text-3xl font-semibold text-primary mb-4">Nuestra Historia</h2>
          <p className="text-foreground mb-4 leading-relaxed">
            Café Regional nació del amor por el café y el profundo respeto por las tradiciones cafeteras de Colombia. Somos una empresa familiar apasionada por conectar a los amantes del buen café con los tesoros ocultos de las montañas de Norte de Santander.
          </p>
          <p className="text-foreground leading-relaxed">
            Trabajamos de la mano con familias caficultoras de las regiones de <strong>Ragonvalia, Arboledas y Durania</strong>, asegurando no solo un producto de calidad excepcional, sino también un impacto positivo y un trato justo para las comunidades que lo hacen posible.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="https://i.postimg.cc/pdR2xmsY/DALL-E-2025-02-11-17-47-59-Create-a-coffee-label-design-featuring-the-name-CAF-REGIONAL-ARBOLEDA.webp" 
            alt="Logo de Café Regional Arboledas" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="coffee label"
          />
        </div>
      </section>

      <section className="py-10 bg-muted rounded-lg px-6">
        <h2 className="font-lora text-3xl font-semibold text-primary text-center mb-8">Nuestra Filosofía</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-lora text-2xl font-semibold text-primary mb-3 flex items-center gap-2"><Target /> Misión</h3>
            <p className="text-foreground leading-relaxed">
              Ofrecer una experiencia de café auténtica y memorable, destacando la singularidad de cada origen y promoviendo el desarrollo sostenible de nuestros aliados caficultores.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-lora text-2xl font-semibold text-primary mb-3 flex items-center gap-2"><GitCommitVertical /> Visión</h3>
            <p className="text-foreground leading-relaxed">
              Ser la marca líder en cafés especiales de origen de Norte de Santander, reconocida por nuestra calidad, transparencia y por ser un puente directo entre el campo colombiano y tu taza.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-lora text-3xl font-semibold text-primary text-center mb-8">Del Grano a la Taza: Nuestro Compromiso</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="font-lora text-xl font-semibold text-primary mb-2">Siembra</h4>
                <p className="text-sm text-muted-foreground">Cultivado en fincas con altitudes y climas privilegiados para un desarrollo óptimo del grano.</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="font-lora text-xl font-semibold text-primary mb-2">Recolección</h4>
                <p className="text-sm text-muted-foreground">Nuestros aliados recolectan a mano solo las cerezas más maduras, garantizando la máxima dulzura.</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="font-lora text-xl font-semibold text-primary mb-2">Procesamiento</h4>
                <p className="text-sm text-muted-foreground">Aplicamos métodos artesanales de beneficio que resaltan los perfiles únicos de cada región.</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="font-lora text-xl font-semibold text-primary mb-2">Tostado</h4>
                <p className="text-sm text-muted-foreground">Tostamos en pequeños lotes para revelar el máximo potencial de sabor y aroma de cada café.</p>
            </div>
        </div>
      </section>

      <section className="text-center py-10 bg-secondary rounded-lg">
        <h2 className="font-lora text-3xl font-semibold text-primary mb-4">Un Viaje que Continúa</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Actualmente, te ofrecemos las joyas de Ragonvalia, Arboledas y Durania, pero nuestro viaje apenas comienza. Nuestra meta es seguir explorando y creciendo para traer a tu taza nuevas presentaciones y orígenes sorprendentes de Colombia.
        </p>
      </section>
    </div>
  );
}
