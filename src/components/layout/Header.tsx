"use client";

import Link from 'next/link';
import { Shirt, Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/regions', label: 'Nuestras Regiones' },
  { href: '/products', label: 'Tienda' },
  { href: '/about', label: 'Sobre Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);


  const NavLinksComponent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${mobile ? 'block py-2 px-4 hover:bg-muted' : ''}`}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Shirt className="h-7 w-7 text-primary" /> {/* Using Shirt as a placeholder for a coffee/logo icon */}
          <span className="font-lora text-2xl font-bold text-primary">Aroma Origins</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <NavLinksComponent />
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/account" passHref>
            <Button variant="ghost" size="icon" aria-label="Cuenta de usuario">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" aria-label="Carrito de compras" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Shirt className="h-7 w-7 text-primary" />
                    <span className="font-lora text-xl font-bold text-primary">Aroma Origins</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Cerrar menú">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex-grow py-4">
                  <NavLinksComponent mobile={true} />
                </nav>
                <div className="p-4 border-t">
                  <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Aroma Origins</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}