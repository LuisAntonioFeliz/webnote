"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export interface UpdateNotebookInput {
    notebookId: string;
    title: string;
    coverColor: string;
    description?: string | null;
}

export async function updateNotebook({
    notebookId,
    title,
    coverColor,
    description,
}: UpdateNotebookInput) {
    const session = await getSession();
    if (!session) {
        return { ok: false as const, error: "No autenticado" };
    }

    const trimmedTitle = title.trim();
    if (!notebookId || !trimmedTitle) {
        return { ok: false as const, error: "El nombre del cuaderno es obligatorio" };
    }

    // Verificar pertenencia del cuaderno al estudiante
    const existing = await prisma.notebook.findFirst({
        where: { id: notebookId, userId: session.userId },
        select: { id: true },
    });

    if (!existing) {
        return { ok: false as const, error: "Cuaderno no encontrado" };
    }

    const updated = await prisma.notebook.update({
        where: { id: notebookId },
        data: {
            title: trimmedTitle,
            coverColor: coverColor || "#658D6D",
            description: description !== undefined ? description?.trim() || null : undefined,
        },
        select: {
            id: true,
            title: true,
            description: true,
            coverColor: true,
            updatedAt: true,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/notebook");

    return { ok: true as const, notebook: updated };
}

export async function deleteNotebook(notebookId: string) {
    const session = await getSession();
    if (!session) {
        return { ok: false as const, error: "No autenticado" };
    }

    if (!notebookId) {
        return { ok: false as const, error: "Cuaderno inválido" };
    }

    // deleteMany con id + userId garantiza borrado atómico solo si pertenece al usuario
    const deleted = await prisma.notebook.deleteMany({
        where: {
            id: notebookId,
            userId: session.userId,
        },
    });

    if (deleted.count === 0) {
        return { ok: false as const, error: "Cuaderno no encontrado" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/notebook");

    return { ok: true as const };
}