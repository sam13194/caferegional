"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, User, MapPin, Heart, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const accountNavLinks = [
  { href: "/account", label: "Panel Principal", icon: LayoutDashboard },
  { href: "/account/orders", label: "Mis Pedidos", icon: ShoppingBag },
  { href: "/account/profile", label: "Detalles de Cuenta", icon: User },
  { href: "/account/addresses", label: "Mis Direcciones", icon: MapPin },
  { href: "/account/wishlist", label: "Lista de Deseos", icon: Heart },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-lora text-3xl font-bold mb-8 text-primary">Mi Cuenta</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <nav className="space-y-1 sticky top-20"> {/* sticky for desktop */}
            {accountNavLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <Button
                  variant={pathname === link.href ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
            <Separator className="my-4"/>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4"/>
              Cerrar Sesión
            </Button>
          </nav>
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5 bg-card p-6 sm:p-8 rounded-lg shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}