import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardPadding = "none" | "md" | "lg";

const PADDINGS: Record<CardPadding, string> = {
  none: "",
  md: "p-6",
  lg: "p-8",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  /** Añade una transición sutil de borde al pasar el cursor. */
  interactive?: boolean;
}

/** Superficie plana: Blanco Cálido sobre Blanco Tiza, borde de 1px y sin sombras. */
export function Card({
  padding = "md",
  interactive = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-cards border border-warm-border bg-warm-card",
        PADDINGS[padding],
        interactive &&
          "transition-colors duration-200 hover:border-slate-green/60",
        className,
      )}
      {...rest}
    />
  );
}
