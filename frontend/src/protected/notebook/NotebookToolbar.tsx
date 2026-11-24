"use client";

import type { ComponentType } from "react";
import {
  EraserIcon,
  HighlighterIcon,
  PenIcon,
  SaveIcon,
  KeyboardIcon, // O un icono equivalente para teclado
  type IconProps,
} from "@/components/shared/icons";
import { cn } from "@/lib/cn";
import { INK_COLORS } from "@/lib/constants";

export type NotebookTool = "keyboard" | "pen" | "highlighter" | "eraser";

interface ToolOption {
  readonly id: NotebookTool;
  readonly label: string;
  readonly Icon: ComponentType<IconProps>;
}

const TOOLS: readonly ToolOption[] = [
  { id: "keyboard", label: "Teclado", Icon: KeyboardIcon },
  { id: "pen", label: "Lápiz", Icon: PenIcon },
  { id: "highlighter", label: "Resaltador", Icon: HighlighterIcon },
  { id: "eraser", label: "Borrador", Icon: EraserIcon },
];

export interface NotebookToolbarProps {
  tool: NotebookTool;
  onToolChange: (tool: NotebookTool) => void;
  color: string;
  onColorChange: (color: string) => void;
  onSave?: () => void; // Prop para la acción de guardar
}

export function NotebookToolbar({
  tool,
  onToolChange,
  color,
  onColorChange,
  onSave,
}: NotebookToolbarProps) {
  const colorsDisabled = tool === "eraser";

  const isPresetSelected = INK_COLORS.some(
    (c) => !c.isCustom && c.value.toLowerCase() === color.toLowerCase()
  );

  return (
    <div
      role="toolbar"
      aria-label="Herramientas de escritura"
      className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-pills border border-warm-border bg-warm-card p-1.5"
    >
      {TOOLS.map(({ id, label, Icon }) => {
        const active = tool === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => onToolChange(id)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green",
              active
                ? "bg-ink-blue text-warm-card"
                : "text-graphite hover:bg-chalk-bg",
            )}
          >
            <Icon />
          </button>
        );
      })}

      {/* Botón de Guardar manual */}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className="inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5 active:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green"
          title="Guardar apuntes"
        >
          <SaveIcon className="size-5 text-graphite" />
        </button>
      )}

      <span aria-hidden="true" className="mx-2 h-6 w-px bg-warm-border" />

      {INK_COLORS.map((ink) => {
        if (ink.isCustom) {
          const isCustomActive = !isPresetSelected;

          return (
            <div
              key={ink.value}
              className={cn(
                "relative size-7 overflow-hidden rounded-full border-2 transition-transform hover:scale-110",
                colorsDisabled && "opacity-40 pointer-events-none",
                isCustomActive ? "border-ink-blue scale-110 shadow-sm" : "border-transparent",
              )}
              title={ink.name}
            >
              <input
                type="color"
                disabled={colorsDisabled}
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="absolute -inset-2 h-16 w-16 cursor-pointer opacity-0 z-10 disabled:cursor-not-allowed"
              />
              <span
                className={cn(
                  "block h-full w-full rounded-full",
                  isCustomActive
                    ? ""
                    : "bg-gradient-to-br from-red-400 via-green-400 to-blue-400",
                )}
                style={isCustomActive ? { backgroundColor: color } : undefined}
              />
            </div>
          );
        }

        const selected = color.toLowerCase() === ink.value.toLowerCase();
        return (
          <button
            key={ink.value}
            type="button"
            aria-pressed={selected}
            aria-label={`Tinta ${ink.name}`}
            title={ink.name}
            disabled={colorsDisabled}
            onClick={() => onColorChange(ink.value)}
            className="inline-flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green disabled:opacity-40"
          >
            <span
              className={cn(
                "block size-6 rounded-full border border-warm-border outline-offset-2 transition-transform hover:scale-110",
                selected && !colorsDisabled && "outline-2 outline-ink-blue scale-110 shadow-sm",
              )}
              style={{ backgroundColor: ink.value }}
            />
          </button>
        );
      })}
    </div>
  );
}