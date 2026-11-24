import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/protected/profile/ProfileCard";
import { ProfileForm } from "@/protected/profile/ProfileForm";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Mi perfil · Webnote",
};

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      nombres: true,
      apellidos: true,
      telefono: true,
      email: true,
    },
  });

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <h1 className="text-4xl">Mi perfil</h1>
      <ProfileCard profile={profile} />
      <ProfileForm initialValues={profile} />
    </div>
  );
}