import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const mockOrderNumber = "AO-123456789"; // Example order number

  return (
    <div className="container mx-auto py-12 text-center">
      <CheckCircle2 className="h-20 w-20 mx-auto text-green-500 mb-6" />
      <h1 className="font-lora text-3xl md:text-4xl font-bold mb-4 text-primary">¡Gracias por tu compra!</h1>
      <p className="text-lg text-muted-foreground mb-2">Tu pedido <span className="font-semibold text-foreground">{mockOrderNumber}</span> ha sido confirmado.</p>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Hemos enviado un correo electrónico de confirmación con los detalles de tu pedido y la información de envío.
      </p>
      
      <div className="bg-card p-6 rounded-lg shadow-sm inline-block text-left mb-8 max-w-md w-full">
        <h2 className="font-lora text-xl font-semibold mb-4 text-primary">Resumen del Pedido</h2>
        {/* Mock summary - in real app, show actual order details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Café Excelso Ragonvalia (1kg) x 1:</span>
            <span className="text-foreground">$25.000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Café Premium Arboledas (500g) x 1:</span>
            <span className="text-foreground">$28.000</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
            <span className="text-foreground">Total:</span>
            <span className="text-primary">$53.000</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center">
        <Link href="/products" passHref>
          <Button size="lg" variant="outline">Seguir Comprando</Button>
        </Link>
        <Link href="/account/orders" passHref>
          <Button size="lg">Ver Mis Pedidos</Button>
        </Link>
      </div>
    </div>
  );
}