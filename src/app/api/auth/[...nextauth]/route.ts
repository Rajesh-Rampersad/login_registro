// uso de NextAuth con typescripet
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

 export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
    // Configuración de NextAuth
    providers: [
        CredentialsProvider({
            // Configuración de la autenticación con credenciales
            // Lógica de autenticación

            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith", required: true },
                password: { label: "Password", type: "password", placeholder: "password123" }
            },
            
            async authorize(credentials, req) {
              // Verificar si credentials está definido
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Faltan credenciales");
              }
              
                try {
                  const userfound = await db.users.findUnique({
                    where: {
                      email: credentials.email
                    }
                  })
                  if (!userfound) {
                    throw new Error("Usuario no encontrado");
                  }
              
                  const isPasswordValid = await bcrypt.compare(credentials.password, userfound.password);

                  if (!isPasswordValid) {
                    throw new Error("Contraseña incorrecta");
                  }
                
                  return { id: String(userfound.id), name: userfound.username };

                } catch (error) {
                  console.error('Error en la autenticación:', error);
                  return null;
                }
              }
            })
          ],
          pages: {
          
            signIn: '/login',
            // signOut: '/auth/register',
            // error: '/auth/error', // Error code passed in query string as ?error=
            // verifyRequest: '/auth/verify-request', // (used for check email message)
            // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
          }
        };
        
        const handler = NextAuth(authOptions);
        
        export { handler as GET, handler as POST };