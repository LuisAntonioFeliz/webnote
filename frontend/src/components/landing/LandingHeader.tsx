import { ButtonLink } from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";

export function LandingHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-5">
      <Logo priority />
      <nav aria-label="Acceso" className="flex items-center gap-1 sm:gap-2">
        <ButtonLink href="/login" variant="ghost" className="text-sm sm:text-base px-2 sm:px-4">
          Iniciar sesión
        </ButtonLink>
        <ButtonLink href="/register" className="text-sm sm:text-base px-3 sm:px-4">
          Crear cuenta
        </ButtonLink>
      </nav>
    </header>
  );
}