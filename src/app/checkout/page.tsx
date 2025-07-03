"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, Lock, Info } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-lora text-3xl font-bold mb-8 text-primary">Finalizar Compra</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8 bg-card p-6 sm:p-8 rounded-lg shadow-sm">
          {/* Shipping Information */}
          <section>
            <h2 className="font-lora text-xl font-semibold mb-4 text-primary flex items-center"><Truck className="mr-2 h-5 w-5"/>Información de Envío</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" placeholder="Juan Pérez" className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input type="email" id="email" placeholder="juan.perez@example.com" className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input type="tel" id="phone" placeholder="3001234567" className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Calle 123 #45-67" className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Bogotá D.C." className="bg-background"/>
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Input id="department" placeholder="Cundinamarca" className="bg-background"/>
              </div>
               <div>
                <Label htmlFor="country">País</Label>
                <Input id="country" defaultValue="Colombia" className="bg-background"/>
              </div>
            </div>
          </section>

          <Separator />

          {/* Payment Method */}
          <section>
            <h2 className="font-lora text-xl font-semibold mb-4 text-primary flex items-center"><CreditCard className="mr-2 h-5 w-5"/>Método de Pago</h2>
            {/* Placeholder for payment options. Actual integration with PayU, Stripe, etc. needed */}
            <div className="space-y-2">
              <div className="p-4 border rounded-md bg-background">
                <Label className="flex items-center">
                  <Input type="radio" name="paymentMethod" value="card" className="mr-2" defaultChecked />
                  Tarjeta de Crédito/Débito
                </Label>
              </div>
              <div className="p-4 border rounded-md bg-background">
                <Label className="flex items-center">
                  <Input type="radio" name="paymentMethod" value="pse" className="mr-2" />
                  PSE (Pagos Seguros en Línea)
                </Label>
              </div>
               <div className="p-4 border rounded-md bg-background">
                <Label className="flex items-center">
                  <Input type="radio" name="paymentMethod" value="transfer" className="mr-2" />
                  Transferencia Bancaria
                </Label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center"><Lock className="mr-1 h-3 w-3"/> Tus pagos son seguros y están encriptados.</p>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 p-6 bg-card rounded-lg shadow-sm space-y-4 self-start">
          <h2 className="font-lora text-xl font-semibold text-primary border-b pb-3">Resumen del Pedido</h2>
          
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.selectedVariant.id} className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground truncate pr-2">{item.name} ({item.selectedVariant.size}) x {item.quantity}</span>
                <span className="font-medium text-foreground whitespace-nowrap">${(item.selectedVariant.price * item.quantity).toLocaleString('es-CO')}</span>
              </div>
            ))}
          </div>

          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground">${getCartTotal().toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío:</span>
            <span className="font-medium text-foreground">Pago contraentrega</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total Productos:</span>
            <span className="text-primary">${(getCartTotal()).toLocaleString('es-CO')}</span>
          </div>

          <div className="flex items-start gap-2 p-3 text-xs bg-muted rounded-md border text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>El costo del envío se paga directamente a la transportadora al momento de recibir tu pedido.</p>
          </div>

          <Link href="/checkout/success" passHref className="block w-full">
            <Button size="lg" className="w-full mt-4" disabled={cart.length === 0}>PAGAR AHORA</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}