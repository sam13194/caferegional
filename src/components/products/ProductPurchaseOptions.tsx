
"use client";

import type { Product, ProductVariant } from '@/types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";

interface ProductPurchaseOptionsProps {
  product: Product;
  onPriceChange: (newPrice: number) => void;
}

export default function ProductPurchaseOptions({ product, onPriceChange }: ProductPurchaseOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Set the first variant as default when the product changes
    if (product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      setSelectedVariant(defaultVariant);
      onPriceChange(defaultVariant.price);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (selectedVariant) {
      onPriceChange(selectedVariant.price);
      setQuantity(1); // Reset quantity when variant changes
    }
  }, [selectedVariant, onPriceChange]);

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > selectedVariant.stock) return selectedVariant.stock;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (selectedVariant.stock < quantity ) {
        toast({
            title: "Stock insuficiente",
            description: `Solo quedan ${selectedVariant.stock} unidades de ${product.name} (${selectedVariant.size}).`,
            variant: "destructive",
        });
        setQuantity(selectedVariant.stock);
        return;
    }
    if (selectedVariant.stock === 0) {
        toast({
            title: "Producto Agotado",
            description: `${product.name} (${selectedVariant.size}) está actualmente agotado.`,
            variant: "destructive",
        });
        return;
    }
    addToCart(product, quantity, selectedVariant);
    toast({
      title: "Producto añadido al carrito",
      description: `${quantity}x ${product.name} (${selectedVariant.size}) añadido.`,
    });
  };
  
  const handleWishlist = () => {
    toast({
        title: "Funcionalidad no implementada",
        description: "Añadir a la lista de deseos estará disponible pronto.",
    });
  };
  
  const currentStock = selectedVariant?.stock || 0;

  return (
    <div className="space-y-6">
      {/* Variant (Size) Options */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label htmlFor="variant-select" className="block text-sm font-medium text-foreground mb-1">Presentación:</label>
          <Select value={selectedVariant?.id} onValueChange={handleVariantChange}>
            <SelectTrigger id="variant-select" className="w-full md:w-2/3 bg-background">
              <SelectValue placeholder="Selecciona una presentación" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map(variant => (
                <SelectItem key={variant.id} value={variant.id} disabled={variant.stock === 0}>
                  {variant.size} ({variant.packaging}) - ${variant.price.toLocaleString('es-CO')}
                  {variant.stock === 0 && ' (Agotado)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1">Cantidad:</label>
        <div className="flex items-center gap-2 w-max border rounded-md p-1 bg-background">
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input 
            type="number" 
            id="quantity" 
            value={quantity} 
            readOnly 
            className="w-12 h-8 text-center border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Cantidad"
          />
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= currentStock}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {currentStock < 5 && currentStock > 0 && <p className="text-xs text-destructive mt-1">¡Solo quedan {currentStock} unidades!</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          size="lg" 
          onClick={handleAddToCart} 
          disabled={currentStock === 0}
          className="flex-grow"
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> {currentStock === 0 ? 'Agotado' : 'Añadir al Carrito'}
        </Button>
        <Button size="lg" variant="outline" onClick={handleWishlist} className="flex-grow">
          <Heart className="mr-2 h-5 w-5" /> Añadir a Lista de Deseos
        </Button>
      </div>
    </div>
  );
}
