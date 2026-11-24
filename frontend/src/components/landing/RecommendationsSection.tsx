import {
    KeyboardIcon,
    PenIcon,
    HighlighterIcon,
    SaveIcon,
} from "@/components/shared/icons";

const PAPER_NOTES = [
    {
        tag: "01 · Dispositivo Ideal",
        title: "Usa tablet o escritorio para tus sesiones de estudio",
        text: "Aunque WebNote se visualiza muy bien desde el móvil para repasar apuntes rápidos, recomendamos usar una tablet o computadora al escribir. El tamaño de pantalla te permite aprovechar las 32 líneas y trabajar con total comodidad.",
        icon: KeyboardIcon,
    },
    {
        tag: "02 · Entrada Adaptable",
        title: "Teclado en escritorio, libertad total en pantalla táctil",
        text: "Si tu pantalla no es táctil, aprovecha la escritura por teclado para redactar tus apuntes con fluidez. En cambio, si usas una tablet o pantalla táctil, tendrás plena libertad para escribir a teclado, trazar a mano alzada o combinar ambos métodos como prefieras.",
        icon: PenIcon,
    },
    {
        tag: "03 · Jerarquía Visual",
        title: "Organiza tus ideas en páginas reales de 32 líneas",
        text: "Cada hoja mantiene la proporción exacta de un cuaderno físico. Dedica una página por tema y alterna tintas o resaltador para destacar solo los conceptos clave.",
        icon: HighlighterIcon,
    },
    {
        tag: "04 · Respaldo Continuo",
        title: "Auto-guardado silencioso y guardado al instante",
        text: "Tus avances se respaldan automáticamente mientras estudias, y siempre tienes a mano el botón de guardado en la barra para asegurar tus cambios manualmente cuando termines un bloque.",
        icon: SaveIcon,
    },
];

export function RecommendationsSection() {
    return (
        <section
            id="recomendaciones"
            aria-labelledby="recommendations-heading"
            className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
        >
            <div className="mb-10 text-center">
                <span className="text-xs font-semibold tracking-widest text-slate-green uppercase">
                    Manual de estudio
                </span>
                <h2
                    id="recommendations-heading"
                    className="mt-2 text-3xl font-bold text-[#263746] sm:text-4xl"
                >
                    Recomendaciones para usar tus cuadernos
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base text-[#858781]">
                    Consejos prácticos diseñados para que tu experiencia de estudio en la web sea tan cómoda, clara y ordenada como en papel.
                </p>
            </div>

            {/* Hoja de cuaderno continua con alineación estricta a 32px */}
            <div className="relative overflow-hidden rounded-3xl border border-warm-border bg-warm-card shadow-sm">
                {/* Encabezado de la hoja */}
                <div className="flex items-center justify-between border-b border-rose-300/60 px-6 py-5 sm:pl-24 sm:pr-10">
                    <span className="font-semibold text-[#263746]">
                        Guía de buenas prácticas
                    </span>
                    <span className="rounded-full border border-warm-border bg-white/60 px-3 py-0.5 text-xs text-[#858781]">
                        Pág. 01
                    </span>
                </div>

                {/* Margen vertical doble estilo cuaderno */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 bottom-0 left-14 hidden w-1 border-x border-rose-300/60 sm:block"
                />

                {/* Cuerpo rayado: todo es múltiplo exacto de 32px */}
                <div
                    className="px-6 py-[32px] sm:pl-24 sm:pr-12"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(148, 163, 184, 0.18) 31px, rgba(148, 163, 184, 0.18) 32px)",
                    }}
                >
                    <div className="space-y-[32px]">
                        {PAPER_NOTES.map((note) => {
                            const Icon = note.icon;
                            return (
                                <article key={note.tag} className="relative max-w-3xl">
                                    {/* Fila 1: 32px exactos */}
                                    <div className="flex h-[32px] items-center gap-2.5">
                                        <span className="inline-flex size-6 items-center justify-center rounded-md bg-[#263746]/10 text-[#263746]">
                                            <Icon className="size-3.5" />
                                        </span>
                                        <span className="text-xs font-semibold tracking-wider text-slate-green uppercase">
                                            {note.tag}
                                        </span>
                                    </div>

                                    {/* Fila 2: Título con altura de línea exacta de 32px */}
                                    <h3 className="text-lg leading-[32px] font-semibold text-[#263746]">
                                        {note.title}
                                    </h3>

                                    {/* Filas siguientes: Párrafo con altura de línea exacta de 32px */}
                                    <p className="text-sm leading-[32px] text-[#858781] sm:text-[15px]">
                                        {note.text}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}