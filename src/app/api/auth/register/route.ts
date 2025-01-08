import { NextResponse } from 'next/server';

// Maneja solicitudes POST
export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const data = await req.json();
    console.log('Datos recibidos:', data);

    // Aquí puedes agregar la lógica de registro
    // Por ejemplo, validar los datos, guardar en la base de datos, etc.

    // Devuelve una respuesta exitosa
    return NextResponse.json(
      { message: 'Registro exitoso', data },
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