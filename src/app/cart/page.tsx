"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="font-lora text-3xl font-semibold mb-4 text-primary">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">Parece que aún no has añadido ningún café delicioso.</p>
        <Link href="/products" passHref>
          <Button size="lg">Explorar Cafés</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-lora text-3xl font-bold mb-8 text-primary">Tu Carrito de Compras ({getItemCount()} {getItemCount() === 1 ? 'ítem' : 'ítems'})</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => {
            const cartItemId = `${item.id}-${item.selectedVariant.size}`;
            return (
              <div key={cartItemId} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg bg-card shadow-sm">
                <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-md overflow-hidden shrink-0 bg-muted">
                  <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="coffee product bag" />
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.slug}`} className="hover:underline">
                    <h2 className="text-lg font-semibold text-foreground">{item.name}</h2>
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.region}</p>
                  <p className="text-xs text-muted-foreground">Tamaño: {item.selectedVariant.size}</p>
                  <p className="text-sm font-medium text-primary mt-1 sm:hidden">${item.selectedVariant.price.toLocaleString('es-CO')}</p>
                </div>
                <div className="flex items-center gap-2 w-max border rounded-md p-1">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(cartItemId, item.quantity - 1)} disabled={item.quantity <= 1} className="h-7 w-7">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={item.quantity} 
                    readOnly 
                    className="w-10 h-7 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  />
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(cartItemId, item.quantity + 1)} disabled={item.quantity >= item.stock} className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-md font-semibold text-primary hidden sm:block min-w-[80px] text-right">${(item.selectedVariant.price * item.quantity).toLocaleString('es-CO')}</p>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(cartItemId)} className="text-destructive hover:text-destructive/80 h-7 w-7">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 p-6 bg-card rounded-lg shadow-sm space-y-4 self-start">
          <h2 className="font-lora text-xl font-semibold text-primary border-b pb-3">Resumen del Pedido</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground">${getCartTotal().toLocaleString('es-CO')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío:</span>
            <span className="font-medium text-foreground">Calculado en el checkout</span>
          </div>
          <div className="flex items-center gap-2 py-2">
            <Input placeholder="Código de descuento" className="bg-background"/>
            <Button variant="outline">Aplicar</Button>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total Estimado:</span>
            <span className="text-primary">${getCartTotal().toLocaleString('es-CO')}</span>
          </div>
          <Link href="/checkout" passHref className="block w-full">
            <Button size="lg" className="w-full mt-4">Continuar con la Compra</Button>
          </Link>
          <Link href="/products" passHref className="block w-full">
            <Button variant="link" className="w-full text-primary">Seguir comprando</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
