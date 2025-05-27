import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, KeyRound } from "lucide-react";

export default function ProfilePage() {
  // Mock user data
  const user = {
    fullName: "Juan Pérez",
    email: "juan.perez@example.com",
  };

  return (
    <div>
      <h2 className="font-lora text-2xl font-semibold mb-6 text-foreground">Detalles de la Cuenta</h2>
      
      <form className="space-y-8">
        {/* Personal Information */}
        <section>
          <h3 className="font-lora text-lg font-semibold mb-4 text-primary flex items-center"><User className="mr-2 h-5 w-5"/>Información Personal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input id="fullName" defaultValue={user.fullName} className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue={user.email} className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Teléfono (Opcional)</Label>
              <Input id="phone" type="tel" placeholder="Tu número de teléfono" className="bg-background" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Change Password */}
        <section>
          <h3 className="font-lora text-lg font-semibold mb-4 text-primary flex items-center"><KeyRound className="mr-2 h-5 w-5"/>Cambiar Contraseña</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Input id="currentPassword" type="password" className="bg-background" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input id="newPassword" type="password" className="bg-background" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Label>
              <Input id="confirmNewPassword" type="password" className="bg-background" />
            </div>
          </div>
        </section>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">Guardar Cambios</Button>
        </div>
      </form>
    </div>
  );
}