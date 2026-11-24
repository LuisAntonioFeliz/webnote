import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión · Webnote",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Bienvenido de vuelta"
        subtitle="Inicia sesión para continuar con tus cuadernos."
        footer={
          <>
            ¿Aún no tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-ink-blue underline decoration-warm-border underline-offset-4 hover:decoration-slate-green"
            >
              Crea una
            </Link>
          </>
        }
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
