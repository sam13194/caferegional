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

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation if card is wrapped in Link
    event.stopPropagation();
    addToCart(product, 1); // Assuming default grind or handle grind selection in quick view/product page
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} passHref>
          <div className="aspect-[4/3] w-full relative overflow-hidden">
            <Image
              src={product.imageUrl}
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
        <Link href={`/products/${product.slug}`} passHref className="block">
          <CardTitle className="font-lora text-lg mb-1 text-primary hover:underline line-clamp-2">{product.name}</CardTitle>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">{product.region}</p>
        <CardDescription className="text-sm text-foreground line-clamp-3 mb-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${product.price.toLocaleString('es-CO')}</p>
        <Button size="sm" variant="default" onClick={handleAddToCart} className="group/cartbtn">
          <ShoppingCart className="mr-0 md:mr-2 h-4 w-4 transition-transform group-hover/cartbtn:scale-110" />
          <span className="hidden md:inline">Añadir</span>
        </Button>
      </CardFooter>
    </Card>
  );
}