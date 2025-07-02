"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Importar el hook de autenticación
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DollarSign, Home, Package, Users, Receipt, BarChart2, Shield, Loader2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/admin/accounting", label: "Contabilidad", icon: DollarSign },
  { href: "/admin/products", label: "Inventario", icon: Package },
  { href: "/admin/invoicing", label: "Facturación", icon: Receipt },
  { href: "/admin/customers", label: "Clientes", icon: Users },
  { href: "/admin/reports", label: "Reportes", icon: BarChart2 },
  { href: "/admin/users", label: "Usuarios", icon: Shield },
];

function AdminPage({ children }: { children: React.ReactNode}) {
  const pathname = usePathname();
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      // Si no está cargando y (no hay usuario O el rol no es admin), redirigir.
      router.push('/'); 
    }
  }, [user, role, loading, router]);

  // Muestra un loader si todavía está verificando el rol, o si está a punto de redirigir.
  if (loading || !user || role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Verificando acceso...</p>
      </div>
    );
  }
  
  // Si el rol es admin, muestra el contenido del panel.
  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader className="p-4 justify-center">
            <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <LogoIcon className="h-7 w-7 text-primary" />
              <span className="font-lora text-xl font-bold text-primary">Café Regional</span>
            </Link>
             <Link href="/" className="items-center gap-2 hidden group-data-[collapsible=icon]:flex">
              <LogoIcon className="h-7 w-7 text-primary" />
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(link.href)}
                  tooltip={{
                    children: link.label,
                  }}
                >
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Panel de Administrador</h2>
            </div>
            <Button variant="outline" asChild>
                <Link href="/">
                    <Home className="mr-2 h-4 w-4"/>
                    Volver a la Tienda
                </Link>
            </Button>
        </header>
        <main className="p-6">
            {children}
        </main>
      </SidebarInset>
    </>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminPage>{children}</AdminPage>
    </SidebarProvider>
  );
}
