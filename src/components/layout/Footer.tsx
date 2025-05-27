"use client";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react'; // Using Send for newsletter

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-lora text-xl font-semibold mb-4 text-primary">Aroma Origins</h3>
            <p className="text-sm mb-4">
              Descubre la riqueza y tradición del café colombiano, directo de sus orígenes a tu taza.
            </p>
            <div className="flex space-x-3">
              <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Youtube" className="hover:text-primary transition-colors"><Youtube size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-lora text-lg font-semibold mb-4 text-primary">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Tienda</Link></li>
              <li><Link href="/regions" className="hover:text-primary transition-colors">Nuestras Regiones</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-lora text-lg font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-primary transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes (FAQ)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-lora text-lg font-semibold mb-4 text-primary">Suscríbete</h4>
            <p className="text-sm mb-3">Recibe ofertas exclusivas y noticias sobre nuestras nuevas cosechas.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Tu correo electrónico" className="bg-background flex-grow" />
              <Button type="submit" variant="default" size="icon" aria-label="Suscribirse al newsletter">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aroma Origins. Todos los derechos reservados.</p>
          <p className="text-muted-foreground">Diseñado con pasión por el café colombiano.</p>
        </div>
      </div>
    </footer>
  );
}