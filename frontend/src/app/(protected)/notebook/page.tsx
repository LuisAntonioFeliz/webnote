import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NotebookWorkspace } from "@/protected/notebook/NotebookWorkspace";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Escribir · Webnote",
};

interface NotebookPageProps {
  searchParams: Promise<{ id?: string }> | { id?: string };
}

export default async function NotebookPage({ searchParams }: NotebookPageProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const notebookId = resolvedParams?.id;

  // Buscar el cuaderno real en PostgreSQL del usuario autenticado
  const notebook = await prisma.notebook.findFirst({
    where: {
      userId: session.userId,
      ...(notebookId ? { id: notebookId } : {}),
    },
    orderBy: { updatedAt: "desc" },
    include: {
      pages: {
        orderBy: { pageNumber: "asc" },
        select: {
          pageNumber: true,
          contentHtml: true,
        },
      },
      _count: {
        select: { pages: true },
      },
    },
  });

  if (!notebook) {
    redirect("/dashboard");
  }

  const initialPagesMap = Object.fromEntries(
    notebook.pages.map((p) => [p.pageNumber, p.contentHtml ?? ""])
  );

  return (
    <NotebookWorkspace
      notebookId={notebook.id}
      notebookTitle={notebook.title}
      totalPages={Math.max(notebook._count.pages, 1)}
      initialPageContents={initialPagesMap}
    />
  );
}