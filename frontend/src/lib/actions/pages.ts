"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export interface SavePageInput {
    notebookId: string;
    pageNumber: number;
    contentHtml: string;
}

export async function saveNotebookPage({
    notebookId,
    pageNumber,
    contentHtml,
}: SavePageInput) {
    const session = await getSession();
    if (!session) {
        return { ok: false as const, error: "No autenticado" };
    }

    if (!notebookId || !Number.isInteger(pageNumber) || pageNumber < 1) {
        return { ok: false as const, error: "Datos de página inválidos" };
    }

    // Verificar que el cuaderno pertenezca al usuario actual
    const notebook = await prisma.notebook.findFirst({
        where: {
            id: notebookId,
            userId: session.userId,
        },
        select: { id: true },
    });

    if (!notebook) {
        return { ok: false as const, error: "Cuaderno no encontrado" };
    }

    const page = await prisma.page.upsert({
        where: {
            notebookId_pageNumber: {
                notebookId,
                pageNumber,
            },
        },
        update: {
            contentHtml,
        },
        create: {
            notebookId,
            pageNumber,
            contentHtml,
        },
        select: {
            id: true,
            pageNumber: true,
            updatedAt: true,
        },
    });

    revalidatePath("/notebook");
    revalidatePath("/dashboard");

    return { ok: true as const, page };
}