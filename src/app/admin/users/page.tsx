import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import { Shield } from "lucide-react";
import UserRoleSwitcher from "@/components/admin/UserRoleSwitcher";

interface UserData {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  createdAt: string;
}

async function getUsers() {
  const usersRef = ref(rtdb, 'users');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()) as UserData[];
  }
  return [];
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="font-lora text-3xl font-bold text-primary mb-8">Usuarios y Roles</h1>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gestionar Acceso de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Rol Asignado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-CO') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <UserRoleSwitcher userId={user.uid} currentRole={user.role || 'customer'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
