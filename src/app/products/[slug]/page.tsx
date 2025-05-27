import Image from 'next/image';
import { products, GRIND_OPTIONS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For quantity
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard'; // For related products
import CoffeeRecommender from '@/components/ai/CoffeeRecommender';
import ProductPurchaseOptions from '@/components/products/ProductPurchaseOptions';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <div className="text-center py-10">Producto no encontrado.</div>;
  }

  const relatedProducts = products.filter(p => p.region === product.region && p.id !== product.id).slice(0, 3);

  // Mock reviews
  const reviews = [
    { id: '1', userName: 'Carlos M.', rating: 5, comment: '¡Excelente café, aroma y sabor inigualables!', date: '2024-07-15' },
    { id: '2', userName: 'Lucía F.', rating: 4, comment: 'Muy bueno, aunque esperaba un poco más de intensidad.', date: '2024-07-10' },
  ];
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;


  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-muted">
            <Image 
              src={product.images && product.images.length > 0 ? product.images[0] : product.imageUrl} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="coffee product detail"
            />
             {/* Basic gallery controls placeholder */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button variant="outline" size="icon" className="bg-background/70 hover:bg-background"><ChevronLeft size={18}/></Button>
              <Button variant="outline" size="icon" className="bg-background/70 hover:bg-background"><ChevronRight size={18}/></Button>
            </div>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded overflow-hidden border hover:border-primary cursor-pointer">
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
          <p className="text-2xl font-semibold text-foreground">${product.price.toLocaleString('es-CO')}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <ProductPurchaseOptions product={product} grindOptions={GRIND_OPTIONS} />

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Región:</span> {product.region}</p>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Intensidad:</span> {product.intensity}/5</p>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Perfil de Sabor:</span> {product.flavorProfile.join(', ')}</p>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Stock:</span> {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}</p>
          </div>
        </div>
      </section>

      {/* Detailed Info Tabs */}
      <Tabs defaultValue="origen" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 bg-muted p-1 rounded-lg">
          <TabsTrigger value="origen">Origen y Finca</TabsTrigger>
          <TabsTrigger value="proceso">Proceso</TabsTrigger>
          <TabsTrigger value="notas">Notas de Cata</TabsTrigger>
          <TabsTrigger value="preparacion" className="hidden md:inline-flex">Recomendaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="origen" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Origen y Finca</h3>
            <p>{product.originDetails || 'Información detallada sobre el origen y la finca productora de este café excepcional.'}</p>
        </TabsContent>
        <TabsContent value="proceso" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Proceso</h3>
            <p>{product.processDetails || 'Conoce más sobre el cuidadoso proceso de beneficio y secado que atraviesan nuestros granos.'}</p>
        </TabsContent>
        <TabsContent value="notas" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Notas de Cata</h3>
            <p>{product.longDescription || 'Descubre el perfil de sabor completo: aroma, cuerpo, acidez y sabor residual que caracterizan este café.'}</p>
        </TabsContent>
        <TabsContent value="preparacion" className="py-6 px-1 text-sm leading-relaxed prose max-w-none">
            <h3 className="font-lora text-xl font-semibold mb-2">Recomendaciones de Preparación</h3>
            <p>{product.preparationRecommendations || 'Te sugerimos los mejores métodos para extraer todo el potencial de este café en casa.'}</p>
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
          // Mock purchase history and preferences for now
          userPurchaseHistory={products.slice(0,2).map(p => p.name).join(', ')} 
          userPreferences={`Le gustan los cafés de la región ${product.region} con intensidad ${product.intensity > 3 ? 'alta' : 'media-baja'}.`}
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