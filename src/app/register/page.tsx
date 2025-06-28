import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-lora text-3xl">Crear Cuenta</CardTitle>
          <CardDescription>Únete a la familia Café Regional y disfruta de beneficios exclusivos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input id="fullName" placeholder="Tu nombre completo" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="tu.correo@example.com" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="Crea una contraseña segura" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirma tu contraseña" className="bg-background" />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-xs font-normal text-muted-foreground">
              Acepto los <Link href="/terms-conditions" className="underline hover:text-primary">Términos y Condiciones</Link> y la <Link href="/privacy-policy" className="underline hover:text-primary">Política de Privacidad</Link>.
            </Label>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Registrarme
          </Button>
        </CardContent>
         <CardFooter className="flex flex-col items-center gap-4">
             <p className="text-xs text-muted-foreground">O regístrate con:</p>
            <div className="flex gap-4">
                <Button variant="outline">Google</Button>
                <Button variant="outline">Facebook</Button>
            </div>
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" passHref>
              <Button variant="link" className="p-0 h-auto text-primary">Inicia sesión aquí</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
