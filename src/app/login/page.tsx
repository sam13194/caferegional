import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-lora text-3xl">Iniciar Sesión</CardTitle>
          <CardDescription>Bienvenido de nuevo a Aroma Origins.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="tu.correo@example.com" className="bg-background" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link href="/forgot-password" passHref>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary">¿Olvidaste tu contraseña?</Button>
              </Link>
            </div>
            <Input id="password" type="password" placeholder="********" className="bg-background" />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Ingresar
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground">O inicia sesión con:</p>
            <div className="flex gap-4">
                <Button variant="outline">Google</Button>
                <Button variant="outline">Facebook</Button>
            </div>
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" passHref>
              <Button variant="link" className="p-0 h-auto text-primary">Regístrate aquí</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}