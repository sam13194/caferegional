
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DollarSign, Home, Package, Users } from "lucide-react";
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
  { href: "/admin/products", label: "Productos", icon: Package },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
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
                  isActive={pathname === link.href}
                  tooltip={{
                    children: link.label,
                  }}
                >
                  <Link href={link.href}>
                    <link.icon/>
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6">
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
    </SidebarProvider>
  );
}
