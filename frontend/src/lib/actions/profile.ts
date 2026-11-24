"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSession, getSession } from "@/lib/session";
import type { ProfileValues } from "@/lib/types";

export type UpdateProfileResult =
    | { ok: true; profile: ProfileValues }
    | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateProfile(
    input: ProfileValues
): Promise<UpdateProfileResult> {
    const session = await getSession();
    if (!session?.userId) {
        return { ok: false, error: "Debes iniciar sesión para editar tu perfil." };
    }

    const nombres = input.nombres.trim();
    const apellidos = input.apellidos.trim();
    const telefono = input.telefono.trim();
    const email = input.email.trim().toLowerCase();

    if (!nombres) {
        return { ok: false, error: "Los nombres son obligatorios." };
    }
    if (!apellidos) {
        return { ok: false, error: "Los apellidos son obligatorios." };
    }
    if (!telefono) {
        return { ok: false, error: "El teléfono es obligatorio." };
    }
    if (!email || !EMAIL_REGEX.test(email)) {
        return { ok: false, error: "El correo electrónico no es válido." };
    }

    try {
        const existingWithEmail = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (existingWithEmail && existingWithEmail.id !== session.userId) {
            return {
                ok: false,
                error: "Ese correo electrónico ya está en uso por otra cuenta.",
            };
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.userId },
            data: {
                nombres,
                apellidos,
                telefono,
                email,
            },
            select: {
                nombres: true,
                apellidos: true,
                telefono: true,
                email: true,
            },
        });

        if (session.email.toLowerCase() !== updatedUser.email.toLowerCase()) {
            await createSession({
                userId: session.userId,
                email: updatedUser.email,
            });
        }

        revalidatePath("/profile");
        revalidatePath("/dashboard");

        return {
            ok: true,
            profile: updatedUser,
        };
    } catch {
        return {
            ok: false,
            error: "No se pudieron guardar los cambios del perfil.",
        };
    }
}