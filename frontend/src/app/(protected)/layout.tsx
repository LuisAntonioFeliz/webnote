import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/shared/TopBar";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      nombres: true,
      apellidos: true,
      notebooks: {
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          coverColor: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const userName = `${user.nombres} ${user.apellidos}`;

  return (
    <div className="min-h-screen">
      <TopBar userName={userName} notebooks={user.notebooks} />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}