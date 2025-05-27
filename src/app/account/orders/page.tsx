import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye } from "lucide-react";

// Mock data for orders
const orders = [
  { id: "AO-123456789", date: "15 Julio, 2024", total: "$53.000", status: "Enviado", items: 2 },
  { id: "AO-098765432", date: "02 Julio, 2024", total: "$28.000", status: "Entregado", items: 1 },
  { id: "AO-112233445", date: "20 Junio, 2024", total: "$75.000", status: "Entregado", items: 3 },
  { id: "AO-556677889", date: "05 Junio, 2024", total: "$22.000", status: "Cancelado", items: 1 },
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Enviado": "default", // Blueish in default theme
  "Entregado": "secondary", // Greenish/Success like
  "Procesando": "outline", // Yellowish/Warning like
  "Cancelado": "destructive",
};


export default function OrdersPage() {
  return (
    <div>
      <h2 className="font-lora text-2xl font-semibold mb-6 text-foreground">Historial de Pedidos</h2>
      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Ítems</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell className="text-center">{order.items}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[order.status] || "outline"}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/account/orders/${order.id}`} aria-label="Ver detalles del pedido">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-muted-foreground">Aún no has realizado ningún pedido.</p>
      )}
      {/* Pagination placeholder */}
      {orders.length > 10 && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="mr-2">Anterior</Button>
          <Button>1</Button>
          <Button variant="outline" className="ml-2">Siguiente</Button>
        </div>
      )}
    </div>
  );
}