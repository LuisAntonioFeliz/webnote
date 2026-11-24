/*import Image from "next/image";
import { ButtonLink } from "@/components/shared/Button";

// Renglones del cuaderno como fondo decorativo del producto.
const RULED_BACKGROUND =
  "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, var(--notebook-lines) 31px, var(--notebook-lines) 32px)";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24"
    >
      <div className="flex flex-col items-start gap-6">
        <span className="rounded-pills border border-warm-border bg-warm-card px-4 py-1.5 text-sm font-medium text-graphite">
          Cuaderno digital para estudiantes
        </span>

        <h1 id="hero-title" className="text-5xl leading-[1.05] sm:text-6xl">
          Tu cuaderno de estudio, hecho para la tablet.
        </h1>

        <p className="max-w-xl text-lg text-graphite">
          Webnote reúne la calma del papel y la fluidez de la escritura digital.
          Toma apuntes con tu lápiz, organiza tus materias y sigue escribiendo
          aunque no tengas conexión.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/register" size="lg">
            Crear cuenta
          </ButtonLink>
          <ButtonLink href="/login" variant="secondary" size="lg">
            Iniciar sesión
          </ButtonLink>
        </div>
      </div>

      <div
        className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-cards border border-warm-border bg-warm-card"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: RULED_BACKGROUND }}
        />
        <Image
          src="/images/logo.png"
          alt=""
          width={320}
          height={320}
          priority
          className="relative h-3/4 w-3/4 object-contain"
        />
      </div>
    </section>
  );
}*/

import Image from "next/image";
import { ButtonLink } from "@/components/shared/Button";

// Fondo sutil de líneas de cuaderno optimizado
const RULED_BACKGROUND =
  "repeating-linear-gradient(to bottom, transparent 0, transparent 32px, var(--notebook-lines) 32px, var(--notebook-lines) 33px)";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20 pb-16 text-center lg:pt-32 lg:pb-24"
    >
      {/* Etiqueta superior sutil */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-card px-4 py-1.5 text-xs font-medium tracking-wide text-graphite shadow-sm">
        <span className="size-2 rounded-full bg-slate-green" />
        Cuaderno digital para estudiantes
      </div>

      {/* Titular imponente al estilo Apple */}
      <h1
        id="hero-title"
        className="max-w-3xl text-4xl font-normal tracking-tight text-graphite sm:text-6xl lg:text-7xl lg:leading-[1.08]"
      >
        Tu cuaderno de estudio, <br />
        <span className="text-slate-green">hecho para concentrarte.</span>
      </h1>

      {/* Descripción refinada */}
      <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-graphite/80 sm:text-xl">
        Webnote reúne la calma del papel y la fluidez digital. Toma apuntes con
        tu lápiz, escribe desde tu teclado y organiza tus materias sin distracciones.
      </p>

      {/* Botones de acción principales */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/register" size="lg">
          Empezar ahora
        </ButtonLink>
        <ButtonLink href="/login" variant="secondary" size="lg">
          Iniciar sesión
        </ButtonLink>
      </div>

      {/* Vista previa central del producto (Hero Image Inmersiva) */}
      <div
        className="relative mt-16 w-full max-w-4xl overflow-hidden rounded-3xl border border-warm-border bg-warm-card p-6 shadow-xl sm:p-10"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: RULED_BACKGROUND }}
        />
        <div className="relative mx-auto flex aspect-[16/9] w-full items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Vista previa de Webnote"
            width={400}
            height={400}
            priority
            className="h-4/5 w-4/5 object-contain drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}