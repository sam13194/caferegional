import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <h1 className="font-lora text-3xl font-bold text-primary mb-8">Reportes y Analíticas</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Módulo en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este será tu centro de inteligencia de negocio. Próximamente encontrarás
            reportes detallados de ventas, análisis de productos más vendidos,
            comportamiento de clientes y otros indicadores clave para ayudarte a
            tomar las mejores decisiones.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
