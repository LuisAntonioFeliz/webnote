import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombres, apellidos, telefono, email, password } = body;

        if (!nombres || !apellidos || !telefono || !email || !password) {
            return NextResponse.json(
                { error: "Todos los campos son obligatorios." },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Ya existe una cuenta registrada con este correo." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                nombres: nombres.trim(),
                apellidos: apellidos.trim(),
                telefono: telefono.trim(),
                email: normalizedEmail,
                password: hashedPassword,
            },
            select: {
                id: true,
                nombres: true,
                apellidos: true,
                telefono: true,
                email: true,
            },
        });

        await createSession({ userId: user.id, email: user.email });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("Error en POST /api/auth/register:", error);
        return NextResponse.json(
            { error: "No se pudo completar el registro." },
            { status: 500 }
        );
    }
}