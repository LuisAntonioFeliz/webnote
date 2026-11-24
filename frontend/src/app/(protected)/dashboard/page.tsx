import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/protected/dashboard/DashboardClient";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import type { NotebookSummary } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mis cuadernos · Webnote",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const dbNotebooks = await prisma.notebook.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: { pages: true },
      },
    },
  });

  const notebooks: NotebookSummary[] = dbNotebooks.map((nb: any) => ({
    id: nb.id,
    title: nb.title,
    description: nb.description ?? undefined,
    coverColor: nb.coverColor,
    pageCount: nb._count.pages,
    updatedAt: nb.updatedAt.toISOString(),
  }));

  return <DashboardClient initialNotebooks={notebooks} />;
}