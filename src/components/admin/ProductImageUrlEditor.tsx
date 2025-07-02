'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { rtdb } from '@/lib/firebase/config';
import { ref as dbRef, update } from "firebase/database";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, X } from 'lucide-react';

// Tus credenciales de Cloudinary
const CLOUDINARY_CLOUD_NAME = 'dmlkiaecz';
const CLOUDINARY_UPLOAD_PRESET = 'caferegional';

interface ProductImageUrlEditorProps {
  product: Product;
}

export default function ProductImageUrlEditor({ product }: ProductImageUrlEditorProps) {
  // Asegurarse de que images es un array y tomar la primera url, o string vacío
  const initialImageUrl = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '';
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const handleFileUpload = () => {
    if (typeof window === 'undefined' || !window.cloudinary) {
      toast({
        title: 'Error',
        description: 'El widget de carga no está listo. Por favor, espera un momento y vuelve a intentarlo.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    
    window.cloudinary.openUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        folder: 'products', // Opcional: organiza las subidas en una carpeta
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxFileSize: 5000000, // 5MB
        theme: 'minimal',
      },
      (error: any, result: any) => {
        setUploading(false);
        
        if (error) {
          console.error('Error en la carga de Cloudinary:', error);
          // No mostramos toast de error aquí porque Cloudinary ya muestra su propia UI de error
          return;
        }

        if (result && result.event === 'success') {
          const uploadedUrl = result.info.secure_url;
          setImageUrl(uploadedUrl);
          updateProductImage(product.id, uploadedUrl);
        }
      }
    );
  };

  const updateProductImage = async (productId: string, newImageUrl: string) => {
    try {
      const productRef = dbRef(rtdb, `products/${productId}`);
      await update(productRef, {
        images: [newImageUrl] // Guardamos como array para mantener consistencia
      });
      toast({
        title: 'Éxito',
        description: 'La imagen ha sido actualizada correctamente en la base de datos.',
      });
      router.refresh(); // Refrescar la data del servidor
    } catch (error) {
      console.error('Error actualizando la imagen en Firebase:', error);
      toast({
        title: 'Error de base de datos',
        description: 'No se pudo guardar la nueva imagen. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const removeImage = () => {
    setImageUrl('');
    // Actualizamos con un array vacío para borrar la imagen
    updateProductImage(product.id, ''); 
  };

  return (
    <div className="flex items-center justify-end">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleFileUpload} 
        disabled={uploading}
        title="Subir o cambiar imagen"
      >
        {uploading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div> : <UploadCloud className="h-4 w-4" />}
      </Button>
      
      {imageUrl && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={removeImage}
          className="text-destructive hover:text-destructive/90"
          title="Eliminar imagen"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
