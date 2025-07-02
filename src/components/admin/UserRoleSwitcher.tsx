"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { rtdb } from '@/lib/firebase/config';
import { ref, update } from "firebase/database";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

interface UserRoleSwitcherProps {
  userId: string;
  currentRole: 'admin' | 'employee' | 'customer';
}

export default function UserRoleSwitcher({ userId, currentRole }: UserRoleSwitcherProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRoleChange = async (newRole: string) => {
    if (newRole === currentRole) return;
    setIsUpdating(true);
    try {
      const userRef = ref(rtdb, `users/${userId}`);
      await update(userRef, { role: newRole });
      toast({
        title: "Rol Actualizado",
        description: `El rol del usuario ha sido cambiado a ${newRole}.`,
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el rol.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
      <Select
        defaultValue={currentRole}
        onValueChange={handleRoleChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Seleccionar rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="customer">Cliente</SelectItem>
          <SelectItem value="employee">Empleado</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
