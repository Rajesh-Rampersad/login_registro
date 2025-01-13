"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos (_)"
    ),

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
    ),

  confirmPassword: z.string().min(8, "La confirmación de contraseña debe tener al menos 8 caracteres"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Esto asegura que el error se muestre en el campo confirmPassword
});

// Tipo inferido a partir del esquema de Zod
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    
    // 1. Define tu formulario.
    const form = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {        
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    const router = useRouter()
  
    // 2. Define un manejador de envío.
    const onSubmit = async (data:RegisterFormData) => {

      // Valida los datos
      if(data.password !== data.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: data.username,
              email: data.email,
              password: data.password,
            }),
          });

          //redirect to 'login' page

          if (response.ok) {
            router.push('/login')
          }
          
          // Verifica si la respuesta es JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Respuesta inesperada: ${text}`);
          }

      
          // Parsea la respuesta JSON
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
        }   

             
      }

   

    return (
        <div className="flex justify-center items-center min-h-screen">
          <Card className={cn("w-[380px]")}>
            <CardContent className="grid gap-4">
            <CardHeader>
                <CardTitle className="flex justify-center">Register</CardTitle>
            </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Campo de nombre de usuario */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de usuario</FormLabel>
                        <FormControl>
                          <Input placeholder="Usuario123" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este será tu nombre de usuario público.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
    
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
                          La contraseña debe tener al menos 8 caracteres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Campo de confirmación de contraseña */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormDescription>
                            Confirma tu contraseña.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     {/* Botón de registro */}
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      );
    }