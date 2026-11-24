import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FormMessageTone = "info" | "error";

export interface FormMessageProps {
  tone?: FormMessageTone;
  children: ReactNode;
}

/** Aviso de formulario: una franja con acento lateral, sin colores fuera de la paleta. */
export function FormMessage({ tone = "info", children }: FormMessageProps) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-2xl border border-warm-border bg-chalk-bg px-4 py-3 text-sm text-ink-blue",
        "border-l-4",
        tone === "error"
          ? "border-l-[color:var(--notebook-margin)]"
          : "border-l-slate-green",
      )}
    >
      {children}
    </p>
  );
}
