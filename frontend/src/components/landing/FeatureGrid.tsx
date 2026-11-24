/*import type { ComponentType } from "react";
import { Card } from "@/components/shared/Card";
import {
  CloudOffIcon,
  FolderIcon,
  PenIcon,
  TabletIcon,
  type IconProps,
} from "@/components/shared/icons";

interface Feature {
  readonly title: string;
  readonly description: string;
  readonly Icon: ComponentType<IconProps>;
}

const FEATURES: readonly Feature[] = [
  {
    title: "Escritura natural",
    description:
      "Lápiz o dedo, con trazos fluidos sobre una hoja que se siente como papel.",
    Icon: PenIcon,
  },
  {
    title: "Funciona sin conexión",
    description:
      "Tus notas se guardan en el dispositivo y se sincronizan cuando vuelves a conectarte.",
    Icon: CloudOffIcon,
  },
  {
    title: "Cuadernos por materia",
    description:
      "Organiza páginas, portadas y colores para encontrar cada apunte al instante.",
    Icon: FolderIcon,
  },
  {
    title: "Pensado para tablets",
    description:
      "Controles amplios y una interfaz serena que deja todo el espacio a tu escritura.",
    Icon: TabletIcon,
  },
];

export function FeatureGrid() {
  return (
    <section
      id="caracteristicas"
      aria-labelledby="features-title"
      className="mx-auto w-full max-w-6xl px-6 py-16"
    >
      <div className="mb-10 flex max-w-2xl flex-col gap-3">
        <h2 id="features-title" className="text-3xl sm:text-4xl">
          Todo lo que necesitas para estudiar con calma
        </h2>
        <p className="text-graphite">
          Una interfaz minimalista que se aparta del camino para que te
          concentres en lo importante: tus ideas.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ title, description, Icon }) => (
          <li key={title}>
            <Card className="flex h-full flex-col gap-4">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-chalk-bg text-slate-green">
                <Icon width={22} height={22} />
              </span>
              <h3 className="text-xl">{title}</h3>
              <p className="text-sm text-graphite">{description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}*/

import type { ComponentType } from "react";
import {
  CloudOffIcon,
  FolderIcon,
  PenIcon,
  TabletIcon,
  type IconProps,
} from "@/components/shared/icons";

interface Feature {
  readonly title: string;
  readonly description: string;
  readonly Icon: ComponentType<IconProps>;
  readonly span?: string;
}

const FEATURES: readonly Feature[] = [
  {
    title: "Escritura natural",
    description:
      "Lápiz o teclado, con trazos fluidos y tipografía limpia sobre una hoja que se siente como papel real.",
    Icon: PenIcon,
    span: "lg:col-span-7",
  },
  {
    title: "Funciona sin conexión",
    description:
      "Tus notas se guardan de forma local en tu dispositivo y se sincronizan automáticamente al reconectarte.",
    Icon: CloudOffIcon,
    span: "lg:col-span-5",
  },
  {
    title: "Cuadernos por materia",
    description:
      "Organiza páginas ilimitadas, portadas personalizadas y colores para encontrar cada apunte al instante.",
    Icon: FolderIcon,
    span: "lg:col-span-5",
  },
  {
    title: "Diseño para el enfoque",
    description:
      "Controles amplios, modo pantalla completa y una interfaz serena que elimina el ruido visual.",
    Icon: TabletIcon,
    span: "lg:col-span-7",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="caracteristicas"
      aria-labelledby="features-title"
      className="mx-auto w-full max-w-5xl px-6 py-24"
    >
      <div className="mb-16 max-w-xl">
        <h2
          id="features-title"
          className="text-3xl font-normal tracking-tight sm:text-5xl"
        >
          Todo lo que necesitas para estudiar con calma.
        </h2>
        <p className="mt-4 text-lg text-graphite/80 font-light">
          Una interfaz minimalista diseñada deliberadamente para apartarse del camino
          y dejar todo el protagonismo a tus ideas.
        </p>
      </div>

      {/* Grid asimétrico tipo Bento / Editorial */}
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {FEATURES.map(({ title, description, Icon, span }) => (
          <li key={title} className={span}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-warm-border bg-warm-card p-8 transition-all duration-300 hover:border-graphite/20 hover:shadow-lg">
              <div className="mb-12 inline-flex size-12 items-center justify-center rounded-2xl bg-chalk-bg text-slate-green shadow-sm">
                <Icon width={24} height={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-normal text-graphite">{title}</h3>
                <p className="text-sm font-light leading-relaxed text-graphite/70">
                  {description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}