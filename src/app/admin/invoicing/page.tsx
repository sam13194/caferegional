import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function InvoicingPage() {
  return (
    <div>
      <h1 className="font-lora text-3xl font-bold text-primary mb-8">Facturación</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Módulo en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección estará dedicada a la emisión de facturas y al control de ventas.
            Próximamente podrás generar facturas para tus pedidos, llevar un registro de los pagos
            y ver el historial de facturación de tus clientes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
