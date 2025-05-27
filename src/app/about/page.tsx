import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Sobre Aroma Origins</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Nuestra pasión es llevarte el auténtico sabor del café colombiano, conectándote con las historias y el esmero de nuestros caficultores.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-lora text-3xl font-semibold text-primary mb-4">Nuestra Historia</h2>
          <p className="text-foreground mb-4 leading-relaxed">
            Aroma Origins nació del amor por el café y el profundo respeto por las tradiciones cafeteras de Colombia. Fundada en [Año de Fundación Placeholder], comenzamos nuestro viaje con la misión de destacar la calidad única de los cafés de origen de regiones emblemáticas como Ragonvalia, Arboledas y Durania.
          </p>
          <p className="text-foreground leading-relaxed">
            Creemos que cada grano cuenta una historia: la de la tierra que lo vio nacer, las manos que lo cultivaron y el proceso artesanal que resalta sus mejores atributos. Nos asociamos directamente con fincas y cooperativas locales, asegurando prácticas justas y sostenibles que benefician tanto a los productores como al medio ambiente.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="https://placehold.co/800x600.png" 
            alt="Equipo de Aroma Origins o caficultores" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="coffee team work"
          />
        </div>
      </section>

      <section className="py-10 bg-muted rounded-lg px-6">
        <h2 className="font-lora text-3xl font-semibold text-primary text-center mb-8">Nuestra Misión y Visión</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-lora text-2xl font-semibold text-primary mb-3">Misión</h3>
            <p className="text-foreground leading-relaxed">
              Ofrecer a nuestros clientes una experiencia de café colombiano auténtica y memorable, promoviendo la trazabilidad, la calidad artesanal y el desarrollo sostenible de las comunidades cafeteras con las que trabajamos.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="font-lora text-2xl font-semibold text-primary mb-3">Visión</h3>
            <p className="text-foreground leading-relaxed">
              Ser la marca líder y referente en cafés especiales de origen colombiano, reconocida por nuestra excelencia, compromiso social y por conectar a los amantes del café de todo el mundo con la riqueza y diversidad de nuestras regiones.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-lora text-3xl font-semibold text-primary text-center mb-8">Compromiso con las Regiones</h2>
        <p className="text-foreground text-center max-w-3xl mx-auto mb-6 leading-relaxed">
          En Aroma Origins, nuestro lazo con las regiones cafeteras va más allá del comercio. Buscamos construir relaciones a largo plazo basadas en la confianza, el respeto y el beneficio mutuo.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h4 className="font-lora text-xl font-semibold text-primary mb-2">Comercio Justo</h4>
            <p className="text-sm text-muted-foreground">Aseguramos precios justos que reflejen el arduo trabajo de los caficultores.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h4 className="font-lora text-xl font-semibold text-primary mb-2">Sostenibilidad</h4>
            <p className="text-sm text-muted-foreground">Apoyamos prácticas agrícolas amigables con el medio ambiente.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h4 className="font-lora text-xl font-semibold text-primary mb-2">Desarrollo Comunitario</h4>
            <p className="text-sm text-muted-foreground">Contribuimos al bienestar y progreso de las comunidades productoras.</p>
          </div>
        </div>
      </section>
    </div>
  );
}