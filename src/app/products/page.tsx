import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { regions } from '@/data/regions';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// This is a Server Component. For actual filtering, state management would be needed client-side.
// We'll render the UI for filters and then map all products.

export default function ProductsPage() {
  const intensityLevels = [1, 2, 3, 4, 5];
  const flavorProfiles = Array.from(new Set(products.flatMap(p => p.flavorProfile)));

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 space-y-6 p-6 bg-card rounded-lg shadow-sm self-start">
        <h2 className="font-lora text-2xl font-semibold text-primary border-b pb-2">Filtros</h2>

        {/* Region Filter */}
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Región</h3>
          <div className="space-y-2">
            {regions.map(region => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox id={`region-${region.slug}`} />
                <Label htmlFor={`region-${region.slug}`} className="text-sm font-normal">{region.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Filter */}
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Precio</h3>
          <Slider defaultValue={[25000]} max={50000} step={1000} className="my-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$50.000+</span>
          </div>
        </div>

        {/* Intensity Filter */}
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Intensidad</h3>
          <div className="flex justify-between">
            {intensityLevels.map(level => (
              <Button key={level} variant="outline" size="icon" className="h-8 w-8">
                {level}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Flavor Profile Filter */}
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Notas de Cata</h3>
          <div className="space-y-2">
            {flavorProfiles.slice(0, 5).map(profile => ( // Show a few common ones
              <div key={profile} className="flex items-center space-x-2">
                <Checkbox id={`flavor-${profile.toLowerCase()}`} />
                <Label htmlFor={`flavor-${profile.toLowerCase()}`} className="text-sm font-normal">{profile}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-4">Aplicar Filtros</Button>
        <Button variant="outline" className="w-full mt-2">Limpiar Filtros</Button>

      </aside>

      {/* Products Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-sm text-muted-foreground">Mostrando {products.length} productos</p>
          <Select defaultValue="popularity">
            <SelectTrigger className="w-full sm:w-[180px] bg-card">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularidad</SelectItem>
              <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
              <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
              <SelectItem value="newest">Novedades</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Anterior</Button>
          <Button>1</Button>
          <Button variant="outline" className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">3</Button>
          <Button variant="outline" className="ml-2">Siguiente</Button>
        </div>
      </main>
    </div>
  );
}
