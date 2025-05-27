import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Contáctanos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas, comentarios o simplemente quieres charlar sobre café? Estamos aquí para ayudarte.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <section className="bg-card p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="font-lora text-2xl font-semibold text-primary mb-6">Envíanos un Mensaje</h2>
          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Tu nombre" className="bg-background" />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input type="email" id="email" placeholder="tu.correo@example.com" className="bg-background" />
            </div>
            <div>
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" placeholder="Ej: Consulta sobre un pedido" className="bg-background" />
            </div>
            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} className="bg-background" />
            </div>
            <Button type="submit" size="lg" className="w-full">Enviar Mensaje</Button>
          </form>
        </section>

        {/* Contact Information */}
        <section className="space-y-8">
          <div>
            <h2 className="font-lora text-2xl font-semibold text-primary mb-4">Información de Contacto</h2>
            <div className="space-y-4 text-foreground">
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Correo Electrónico</h3>
                  <a href="mailto:hola@aromaorigins.com" className="text-muted-foreground hover:text-primary">hola@aromaorigins.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Teléfono / WhatsApp</h3>
                  <a href="tel:+573001234567" className="text-muted-foreground hover:text-primary">+57 300 123 4567</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Nuestra Oficina (Cita Previa)</h3>
                  <p className="text-muted-foreground">Calle Falsa 123, Bogotá, Colombia</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Link */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-lora text-xl font-semibold text-primary mb-2">¿Preguntas Frecuentes?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Muchas dudas comunes ya están resueltas en nuestra sección de FAQ.
            </p>
            <Button variant="outline" asChild>
              <a href="/faq">Visitar FAQ</a>
            </Button>
          </div>

          {/* Placeholder for Map */}
          <div className="h-64 bg-muted rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-muted-foreground">(Aquí iría un mapa de ubicación)</p>
          </div>
        </section>
      </div>
    </div>
  );
}