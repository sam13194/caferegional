import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function UsersPage() {
  return (
    <div>
      <h1 className="font-lora text-3xl font-bold text-primary mb-8">Usuarios y Seguridad</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Módulo en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La seguridad es lo primero. En esta sección podrás gestionar los roles y permisos
            de los usuarios que tienen acceso al panel de administración.
            Podrás crear nuevos usuarios, asignar roles (ej. Administrador, Editor) y controlar
            quién puede ver o modificar cada módulo de la plataforma.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
