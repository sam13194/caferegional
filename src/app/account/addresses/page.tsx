import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit2, Trash2, MapPin } from "lucide-react";

// Mock address data
const addresses = [
  { 
    id: "1", 
    alias: "Casa", 
    recipient: "Juan Pérez", 
    line1: "Calle 123 #45-67, Apto 101", 
    city: "Bogotá D.C.", 
    department: "Cundinamarca",
    country: "Colombia",
    phone: "3001234567",
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  { 
    id: "2", 
    alias: "Oficina", 
    recipient: "Juan Pérez", 
    line1: "Carrera 7 #70-30, Oficina 502", 
    city: "Bogotá D.C.", 
    department: "Cundinamarca",
    country: "Colombia",
    phone: "3109876543",
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

export default function AddressesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-lora text-2xl font-semibold text-foreground">Mis Direcciones</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nueva Dirección
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="space-y-6">
          {addresses.map((address) => (
            <Card key={address.id} className="shadow-sm">
              <CardHeader className="flex flex-row justify-between items-start pb-3">
                <div>
                  <CardTitle className="text-lg text-primary">{address.alias}</CardTitle>
                  <CardDescription className="text-xs">
                    {address.isDefaultShipping && <span className="mr-2">Envío por defecto</span>}
                    {address.isDefaultBilling && <span>Facturación por defecto</span>}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/90">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{address.recipient}</p>
                <p>{address.line1}</p>
                <p>{address.city}, {address.department}</p>
                <p>{address.country}</p>
                <p>Tel: {address.phone}</p>
              </CardContent>
              {/* Placeholder for making default */}
               <CardFooter className="pt-3 border-t">
                {!address.isDefaultShipping && <Button variant="link" size="sm" className="p-0 h-auto text-xs">Hacer de envío por defecto</Button>}
               </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Aún no has guardado ninguna dirección.</p>
          <Button variant="outline">Añadir tu primera dirección</Button>
        </div>
      )}
    </div>
  );
}