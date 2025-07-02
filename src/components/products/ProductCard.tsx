"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Defensive coding: Ensure variants is an array before using it
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    event.stopPropagation();
    
    if (hasVariants) {
      const defaultVariant = product.variants[0];
      addToCart(product, 1, defaultVariant);
      toast({
        title: "Producto añadido",
        description: `${product.name} (${defaultVariant.size}) ha sido añadido a tu carrito.`,
      });
    } else {
      // Handle products without variants, if applicable
      // For now, we'll log a message and prevent adding to cart
      console.log("This product does not have variants and cannot be added to the cart yet.");
      toast({
        title: "Producto no disponible",
        description: `Este producto no se puede añadir al carrito en este momento.`,
        variant: "destructive"
      });
    }
  };

  // Use the first variant's price if available, otherwise fallback to the main product price.
  const displayPrice = hasVariants ? product.variants[0].price : product.price;
  
  // Fallback for slug
  const productLink = product.slug ? `/products/${product.slug}` : '/products';
  
  // Fallback for image
  const imageUrl = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '/placeholder.svg';

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg group">
      <CardHeader className="p-0 relative">
        <Link href={productLink} passHref>
          <div className="aspect-[4/3] w-full relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="coffee bag product"
            />
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" size="icon" className="bg-background/80 hover:bg-background" aria-label="Vista rápida">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/80 hover:bg-background" aria-label="Añadir a favoritos">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {product.rating && (
          <div className="absolute bottom-2 left-2 bg-background/80 text-primary px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {product.rating.toFixed(1)}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={productLink} passHref className="block">
          <CardTitle className="font-lora text-lg mb-1 text-primary hover:underline line-clamp-2">{product.name}</CardTitle>
        </Link>
        {/* The 'region' property doesn't exist in the firebase data, so it is commented out. */}
        {/* <p className="text-xs text-muted-foreground mb-2">{product.region}</p> */}

        {/* The 'description' property doesn't exist in the firebase data, so it is commented out. */}
        {/* <CardDescription className="text-sm text-foreground line-clamp-3 mb-2">{product.description}</CardDescription> */}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${(displayPrice || 0).toLocaleString('es-CO')}</p>
        <Button size="sm" variant="default" onClick={handleAddToCart} className="group/cartbtn" disabled={!hasVariants}>
          <ShoppingCart className="mr-0 md:mr-2 h-4 w-4 transition-transform group-hover/cartbtn:scale-110" />
          <span className="hidden md:inline">Añadir</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
