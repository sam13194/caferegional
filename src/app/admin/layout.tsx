"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
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

// Define all possible links with the roles that can see them
const navLinksConfig = [
  { href: "/admin/accounting", label: "Contabilidad", icon: DollarSign, roles: ['admin'] },
  { href: "/admin/products", label: "Inventario", icon: Package, roles: ['admin', 'employee'] },
  { href: "/admin/invoicing", label: "Facturación", icon: Receipt, roles: ['admin', 'employee'] },
  { href: "/admin/customers", label: "Clientes", icon: Users, roles: ['admin', 'employee'] },
  { href: "/admin/reports", label: "Reportes", icon: BarChart2, roles: ['admin'] },
  { href: "/admin/users", label: "Usuarios", icon: Shield, roles: ['admin'] },
];

function AdminPage({ children }: { children: React.ReactNode}) {
  const pathname = usePathname();
  const { user, role, loading } = useAuth();
  const router = useRouter();

  // Filter links based on the user's role
  const navLinks = role ? navLinksConfig.filter(link => link.roles.includes(role)) : [];

  useEffect(() => {
    // Redirect if not loading and user is not an admin or employee
    if (!loading && (!user || !['admin', 'employee'].includes(role as string))) {
      router.push('/'); 
    }
  }, [user, role, loading, router]);

  // Show a loader while verifying access
  if (loading || !user || !['admin', 'employee'].includes(role as string)) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Verificando acceso...</p>
      </div>
    );
  }
  
  // If user is admin or employee, show the admin panel content
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
