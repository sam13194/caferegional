
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, rtdb } from '@/lib/firebase/config';
import { Loader2 } from 'lucide-react';

type UserRole = 'admin' | 'employee' | 'customer' | null;

// Extender el tipo User para incluir campos de nuestra DB
interface AppUser extends User {
  dbName?: string;
}

interface AuthContextType {
  user: AppUser | null;
  role: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = ref(rtdb, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const dbUser = snapshot.val();
            // Combinar usuario de Auth con datos de la DB
            setUser({ ...currentUser, dbName: dbUser.name });
            setRole(dbUser.role || 'customer');
          } else {
            // Si no hay datos en la DB, usar solo datos de Auth
            setUser(currentUser);
            setRole('customer'); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(currentUser);
          setRole('customer'); // Asumir rol de cliente en caso de error
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Muestra un loader global mientras se verifica la sesión y el rol.
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
