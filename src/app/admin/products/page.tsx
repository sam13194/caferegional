
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import { Product } from '@/types';
import ProductImageUrlEditor from "@/components/admin/ProductImageUrlEditor";
import ProductDeleteButton from "@/components/admin/ProductDeleteButton";
import ProductEditor from "@/components/admin/ProductEditor";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(rtdb, 'products');
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          // Firebase returns an object, we convert it to an array
          setProducts(Object.values(snapshot.val()));
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Es posible que no tengas permisos para ver esta información.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-lora text-3xl font-bold text-primary">Gestionar Inventario</h1>
        <ProductEditor>
          <Button> 
             <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Nuevo Producto
          </Button>
        </ProductEditor>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Cargando inventario...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Empaque</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Precio Base</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <Image 
                        src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : 'https://placehold.co/100x100.png'} 
                        alt={product.name} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint="coffee product bag"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{product.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{product.origin || 'N/A'}</TableCell>
                  <TableCell>{product.packaging || 'N/A'}</TableCell>
                  <TableCell>{product.weight || 'N/A'}</TableCell>
                  <TableCell className="whitespace-nowrap">${(product.price || 0).toLocaleString('es-CO')}</TableCell>
                  <TableCell className="text-center">{product.stock || 0}</TableCell>
                  <TableCell>
                    <Badge variant={(product.stock || 0) > 0 ? "default" : "destructive"} className={(product.stock || 0) > 0 ? 'bg-green-100 text-green-700' : ''}>
                      {(product.stock || 0) > 0 ? 'Disponible' : 'Agotado'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <ProductImageUrlEditor product={product} />
                      <ProductEditor product={product}>
                        <Button variant="ghost" size="icon" title="Editar Producto">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </ProductEditor>
                      <ProductDeleteButton product={product} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
