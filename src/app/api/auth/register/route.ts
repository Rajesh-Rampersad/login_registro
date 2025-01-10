import { NextResponse } from 'next/server';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

// Maneja solicitudes POST
export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const data = await req.json();
    console.log('Datos recibidos:', data);

     // Aquí puedes agregar la lógica de registro
     const usernamefounds = await db.users.findFirst({
      where: {
        username: data.username,
      },
    });
    if (usernamefounds) {
      return NextResponse.json(
        { message: 'El Usuario ya está en uso' },
        { status: 400 }
      );
    }
    const userfounds = await db.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userfounds) {
      return NextResponse.json(
        { message: 'El correo electrónico ya está en uso' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser  = await db.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    // Por ejemplo, validar los datos, guardar en la base de datos, etc.

    // Devuelve una respuesta exitosa
    return NextResponse.json(
      { message: 'Registro exitoso', data:newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en el servidor:', error);

    // Devuelve un error 500 si algo sale mal
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}