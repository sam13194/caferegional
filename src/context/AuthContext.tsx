"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, get } from 'firebase/database'; // Importar get en lugar de onValue
import { auth, rtdb } from '@/lib/firebase/config';
import { Loader2 } from 'lucide-react';

type UserRole = 'admin' | 'employee' | 'customer' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Si hay un usuario, obtenemos su rol UNA SOLA VEZ con get()
        try {
          const userRoleRef = ref(rtdb, `users/${currentUser.uid}/role`);
          const snapshot = await get(userRoleRef);
          if (snapshot.exists()) {
            setRole(snapshot.val());
          } else {
            setRole('customer'); // Si no hay rol en la DB, es un cliente
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole('customer'); // Asumir rol de cliente si hay error
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
