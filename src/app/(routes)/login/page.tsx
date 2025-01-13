"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { POST as authHandler } from '../../api/auth/[...nextauth]/route';
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Esquema de validación
const loginSchema = z.object({
  email: z
  .string()
  .email("Debe ser un correo electrónico válido")
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "El correo electrónico no es válido"
  ),

password: z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(16, "La contraseña no puede tener más de 16 caracteres")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d).+$/,
    "La contraseña debe ser alfanumérica (letras y números)"
  ),});

// tipo inferido a partir del esquema de login
type LoginFormData = z.infer<typeof loginSchema>;


export default function Page() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
// Definir un manejador de envio de datos
const onSubmit = async (data: LoginFormData) => {
  console.log(data);

 
}
  

  return (
    // formulario de login
    <div className="flex justify-center items-center min-h-screen">
      <Card className={cn("w-[460px]")}>
        <CardContent className="grid gap-4">
          <CardHeader>
            <CardTitle className="flex justify-center">Login</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">

              {/* Campo de correo electrónico */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="ejemplo@correo.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Introduce tu dirección de correo electrónico.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de contraseña */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>
                      La contraseña debe tener al menos 8 caracteres alfanumérico.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón de login */}
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}