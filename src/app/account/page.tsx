"use client";

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, User, Edit, Loader2 } from "lucide-react";

export default function AccountDashboardPage() {
  const { user, role, loading } = useAuth();

  // Muestra un estado de carga mientras se obtiene la información del usuario
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">Cargando tu información...</p>
      </div>
    );
  }

  // Si no hay usuario (lo que no debería pasar si está protegido, pero es buena práctica)
  if (!user) {
    return (
      <div className="text-center py-24">
        <p>No has iniciado sesión.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Ir a Iniciar Sesión</Link>
        </Button>
      </div>
    );
  }

  // TODO: Reemplazar con datos reales de pedidos
  const recentOrder = null; // { id: "AO-123456789", date: "15 Julio, 2024", total: "$53.000", status: "Enviado" };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-lora text-2xl font-semibold mb-1 text-foreground">
          Bienvenido, {user.displayName || 'a Café Regional'}!
        </h2>
        <p className="text-muted-foreground">Desde aquí puedes gestionar tus pedidos, información personal y más.</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <ShoppingBag className="mr-2 h-5 w-5"/> Pedido Reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {recentOrder ? (
              <>
                <p><span className="font-semibold">ID Pedido:</span> {recentOrder.id}</p>
                <p><span className="font-semibold">Fecha:</span> {recentOrder.date}</p>
                <p><span className="font-semibold">Total:</span> {recentOrder.total}</p>
                <p><span className="font-semibold">Estado:</span> <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">{recentOrder.status}</span></p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href={`/account/orders/${recentOrder.id}`}>Ver Detalles</Link>
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground">No tienes pedidos recientes.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <User className="mr-2 h-5 w-5"/> Información de Cuenta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="font-semibold">Nombre:</span> {user.displayName || 'No especificado'}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Rol:</span> <span className="capitalize px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">{role}</span></p>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href="/account/profile"><Edit className="mr-2 h-3 w-3"/> Editar Perfil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section>
        <h3 className="font-lora text-xl font-semibold mb-4 text-foreground">Accesos Rápidos</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="secondary" asChild className="justify-start p-6 text-left h-auto">
            <Link href="/account/orders">
              <div className="flex flex-col">
                <span className="font-semibold text-base">Ver todos mis pedidos</span>
                <span className="text-xs text-muted-foreground">Historial y seguimiento</span>
              </div>
            </Link>
          </Button>
          <Button variant="secondary" asChild className="justify-start p-6 text-left h-auto">
            <Link href="/account/addresses">
              <div className="flex flex-col">
                <span className="font-semibold text-base">Gestionar direcciones</span>
                <span className="text-xs text-muted-foreground">Envío y facturación</span>
              </div>
            </Link>
          </Button>
          <Button variant="secondary" asChild className="justify-start p-6 text-left h-auto">
            <Link href="/account/wishlist">
              <div className="flex flex-col">
                <span className="font-semibold text-base">Mi lista de deseos</span>
                <span className="text-xs text-muted-foreground">Tus cafés favoritos</span>
              </div>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
