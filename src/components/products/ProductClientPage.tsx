
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import CoffeeRecommender from '@/components/ai/CoffeeRecommender';
import ProductPurchaseOptions from '@/components/products/ProductPurchaseOptions';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';

interface ProductClientPageProps {
  initialProduct: Product;
  allProducts: Product[]; // Pass all products for related items
}

export default function ProductClientPage({ initialProduct, allProducts }: ProductClientPageProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [displayPrice, setDisplayPrice] = useState<number>(initialProduct.variants[0]?.price ?? initialProduct.price);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setProduct(initialProduct);
    setDisplayPrice(initialProduct.variants[0]?.price ?? initialProduct.price);
    setCurrentImageIndex(0);
  }, [initialProduct]);

  if (!product) {
    return <div className="text-center py-10">Producto no encontrado o cargando...</div>;
  }

  const relatedProducts = allProducts.filter(p => p.origin === product.origin && p.id !== product.id).slice(0, 3);
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  const reviews = [
    { id: '1', userName: 'Carlos M.', rating: 5, comment: '¡Excelente café, aroma y sabor inigualables!', date: '2024-07-15' },
    { id: '2', userName: 'Lucía F.', rating: 4, comment: 'Muy bueno, aunque esperaba un poco más de intensidad.', date: '2024-07-10' },
  ];

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.images.length;
      } else {
        return (prev - 1 + product.images.length) % product.images.length;
      }
    });
  };

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-muted">
            <Image 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="coffee product detail"
              key={currentImageIndex} // Force re-render for transition
            />
            {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button variant="outline" size="icon" className="bg-background/70 hover:bg-background" onClick={() => handleImageNavigation('prev')}><ChevronLeft size={18}/></Button>
                    <Button variant="outline" size="icon" className="bg-background/70 hover:bg-background" onClick={() => handleImageNavigation('next')}><ChevronRight size={18}/></Button>
                </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <div key={idx} className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer ${idx === currentImageIndex ? 'border-primary' : 'border-transparent'}`} onClick={() => setCurrentImageIndex(idx)}>
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} layout="fill" objectFit="cover" data-ai-hint="coffee product variant" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Purchase */}
        <div className="space-y-6">
          <h1 className="font-lora text-3xl md:text-4xl font-bold text-primary">{product.name}</h1>
          <div className="flex items-center gap-2">
            {product.rating && (
              <>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                ))}
                <span className="text-sm text-muted-foreground">({product.rating.toFixed(1)} de {reviews.length} reseñas)</span>
              </>
            )}
          </div>
          <p className="text-2xl font-semibold text-foreground">${displayPrice.toLocaleString('es-CO')}</p>
          <p className="text-muted-foreground leading-relaxed">{product.observations || 'Un café excepcional de las montañas de Colombia, cultivado con pasión y tradición.'}</p>
          
          <ProductPurchaseOptions product={product} onPriceChange={setDisplayPrice} />

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Origen:</span> {product.origin}</p>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Stock Total:</span> {totalStock > 0 ? `${totalStock} unidades disponibles` : 'Agotado'}</p>
            {product.category && <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Categoría:</span> {product.category}</p>}
          </div>
        </div>
      </section>

      {/* Detailed Info Tabs */}
      <Tabs defaultValue="descripcion" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
        </TabsList>
        <TabsContent value="descripcion" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Descripción del Café</h3>
            <p>{product.longDescription || product.observations || 'Descubre el perfil de sabor completo: aroma, cuerpo, acidez y sabor residual que caracterizan este café.'}</p>
        </TabsContent>
        <TabsContent value="detalles" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Detalles del Producto</h3>
            <p>{product.processDetails || 'Conoce más sobre el cuidadoso proceso de beneficio y secado que atraviesan nuestros granos.'}</p>
        </TabsContent>
      </Tabs>

      {/* Customer Reviews Section */}
      <section>
        <h2 className="font-lora text-2xl font-bold mb-6 text-primary">Reseñas de Clientes</h2>
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="p-4 border rounded-lg bg-card">
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                ))}
                <span className="ml-2 font-semibold text-foreground">{review.userName}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{new Date(review.date).toLocaleDateString('es-CO')}</p>
              <p className="text-sm text-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-6">
          <MessageCircle className="mr-2 h-4 w-4" /> Escribir una Reseña
        </Button>
      </section>

      {/* AI Coffee Recommender Section */}
      <section className="py-8 bg-muted rounded-lg px-6">
        <h2 className="font-lora text-2xl font-bold mb-6 text-primary text-center">Te podría interesar también...</h2>
        <CoffeeRecommender 
          currentProduct={product} 
          userPreferences={`Le gustan los cafés de la región ${product.origin}.`}
        />
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-lora text-2xl font-bold mb-6 text-primary">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
