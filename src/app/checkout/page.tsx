import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  // In a real app, you'd get cart details from context or server
  const mockCartTotal = 53000; // Example total
  const mockShippingCost = 8000; // Example shipping

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
          {/* Mock items - in real app, map through cart items */}
          <div className="flex justify-between text-sm items-center">
            <span className="text-muted-foreground">Café Excelso Ragonvalia (1kg) x 1</span>
            <span className="font-medium text-foreground">$25.000</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-muted-foreground">Café Premium Arboledas (500g) x 1</span>
            <span className="font-medium text-foreground">$28.000</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground">${mockCartTotal.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío:</span>
            <span className="font-medium text-foreground">${mockShippingCost.toLocaleString('es-CO')}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total a Pagar:</span>
            <span className="text-primary">${(mockCartTotal + mockShippingCost).toLocaleString('es-CO')}</span>
          </div>
          <Link href="/checkout/success" passHref className="block w-full">
            <Button size="lg" className="w-full mt-4">PAGAR AHORA</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}