import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-lora text-3xl font-bold text-primary">Gestionar Productos</h1>
        {/* En el futuro, este enlace llevará a un formulario para crear un nuevo producto */}
        <Button asChild>
          <Link href="#"> 
             <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Nuevo Producto
          </Link>
        </Button>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Región</TableHead>
              <TableHead>Precio Base</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.region}</TableCell>
                <TableCell>${product.price.toLocaleString('es-CO')}</TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={product.stock > 0 ? "default" : "destructive"} className={product.stock > 0 ? 'bg-green-100 text-green-700' : ''}>
                    {product.stock > 0 ? 'Disponible' : 'Agotado'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                   <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
