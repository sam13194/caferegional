import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products"; // Using all products as mock wishlist items
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";

// Mock wishlist - in a real app, this would come from user data
const wishlistItems = products.slice(0, 2); // Taking first 2 products as example

export default function WishlistPage() {
  return (
    <div>
      <h2 className="font-lora text-2xl font-semibold mb-6 text-foreground">Mi Lista de Deseos</h2>
      
      {wishlistItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
          <HeartCrack className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Tu lista de deseos está vacía.</p>
          <p className="text-xs text-muted-foreground mb-4">Añade tus cafés favoritos para verlos aquí.</p>
          <Button variant="outline" asChild>
            <a href="/products">Explorar Cafés</a>
          </Button>
        </div>
      )}
    </div>
  );
}