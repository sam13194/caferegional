'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { rtdb } from '@/lib/firebase/config';
import { ref, get } from 'firebase/database';
import { Shield, Loader2 } from "lucide-react";
import UserRoleSwitcher from "@/components/admin/UserRoleSwitcher";

interface UserData {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = ref(rtdb, 'users');
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          setUsers(Object.values(snapshot.val()));
        } else {
          setUsers([]);
        }
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError("No se pudieron cargar los usuarios. Es posible que no tengas permisos para ver esta información.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Cargando usuarios...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-destructive">
              <p>{error}</p>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
