import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function CustomersPage() {
  return (
    <div>
      <h1 className="font-lora text-3xl font-bold text-primary mb-8">Gestión de Clientes (CRM)</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Módulo en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aquí podrás gestionar toda la información de tus clientes.
            En futuras actualizaciones, podrás ver historiales de compra, gestionar direcciones,
            crear segmentos de clientes para marketing y mucho más.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
