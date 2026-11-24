import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, coverColor } = body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return NextResponse.json(
                { error: "El título del cuaderno es obligatorio." },
                { status: 400 }
            );
        }

        const created = await prisma.notebook.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null,
                coverColor: coverColor || "#658D6D",
                userId: session.userId,
                pages: {
                    create: {
                        pageNumber: 1,
                    },
                },
            },
            include: {
                _count: {
                    select: { pages: true },
                },
            },
        });

        return NextResponse.json(
            {
                notebook: {
                    id: created.id,
                    title: created.title,
                    description: created.description ?? undefined,
                    coverColor: created.coverColor,
                    pageCount: created._count.pages,
                    updatedAt: created.updatedAt.toISOString(),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error en POST /api/notebooks:", error);
        return NextResponse.json(
            { error: "No se pudo crear el cuaderno." },
            { status: 500 }
        );
    }
}