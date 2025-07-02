"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { rtdb } from '@/lib/firebase/config';
import { ref, push, update, set } from 'firebase/database';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Pencil, PlusCircle } from 'lucide-react';

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  origin: z.string().optional(),
  packaging: z.string().optional(),
  weight: z.string().optional(),
  price: z.coerce.number().min(0, { message: "El precio no puede ser negativo." }),
  stock: z.coerce.number().int().min(0, { message: "El stock no puede ser negativo." }),
  observations: z.string().optional(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductEditorProps {
  product?: Product; // El producto a editar (opcional)
  children: React.ReactNode; // El botón que abrirá el diálogo
}

export default function ProductEditor({ product, children }: ProductEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = product !== undefined;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      origin: product?.origin || '',
      packaging: product?.packaging || '',
      weight: product?.weight || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      observations: product?.observations || '',
      active: product?.active ?? true,
      featured: product?.featured || false,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        // --- MODO EDITAR ---
        const productRef = ref(rtdb, `products/${product.id}`);
        await update(productRef, data);
        toast({ title: "Éxito", description: "El producto ha sido actualizado." });
      } else {
        // --- MODO AÑADIR ---
        const productsRef = ref(rtdb, 'products');
        const newProductRef = push(productsRef); // Genera un ID único
        const newProductData: Omit<Product, 'id' | 'images' | 'variants' | 'slug' | 'rating' | 'category' | 'createdAt'> & { id: string, createdAt: string } = {
            ...data,
            id: newProductRef.key!,
            createdAt: new Date().toISOString(),
        }
        await set(newProductRef, newProductData);
        toast({ title: "Éxito", description: "El nuevo producto ha sido añadido." });
      }
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error guardando el producto:", error);
      toast({ title: "Error", description: "No se pudo guardar el producto.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio Base</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock (Inventario)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem><FormLabel>Origen</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem><FormLabel>Empaque</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem><FormLabel>Peso</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones / Descripción Corta</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-8">
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Activo (Visible en la tienda)</FormLabel>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel>Destacado (Aparece en la página principal)</FormLabel>
                    </FormItem>
                  )}
                />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
