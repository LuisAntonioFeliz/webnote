import { Logo } from "@/components/shared/Logo";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-warm-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Logo size={28} />
        <p className="text-sm text-pencil-gray">
          Desarrollado por: Luis Feliz
        </p>
        <p className="text-sm text-pencil-gray">
          © {year} Webnote. Hecho para quienes estudian.
        </p>
      </div>
    </footer>
  );
}
