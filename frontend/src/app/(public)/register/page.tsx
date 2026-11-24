import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta · Webnote",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Crea tu cuenta"
        subtitle="Empieza a organizar tus apuntes en minutos."
        footer={
          <>
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-ink-blue underline decoration-warm-border underline-offset-4 hover:decoration-slate-green"
            >
              Inicia sesión
            </Link>
          </>
        }
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
