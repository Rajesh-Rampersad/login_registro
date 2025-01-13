// uso de NextAuth con typescripet
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
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
          async  authorize(credentials, req) {

                // Valida los datos de inicio de sesión cotejar con prisma
                const userfound = await db.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                
          
                console.log(userfound);

                if (userfound && await bcrypt.compare(credentials.password, userfound.password)) {
                    return { id: userfound.id, name: userfound.username };
                }
                return null;
                // Lógica de redirección después de la autenticación

            }
        })
    ]
};


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST,}