import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Ingresa tu correo y contraseña." },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Credenciales incorrectas." },
                { status: 401 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Credenciales incorrectas." },
                { status: 401 }
            );
        }

        await createSession({ userId: user.id, email: user.email });

        return NextResponse.json({
            user: {
                id: user.id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                telefono: user.telefono,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error en POST /api/auth/login:", error);
        return NextResponse.json(
            { error: "No se pudo iniciar sesión." },
            { status: 500 }
        );
    }
}