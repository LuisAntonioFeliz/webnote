"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Separación entre renglones, en píxeles. */
const LINE_HEIGHT = 32;
/** Número exacto de líneas por página de cuaderno físico. */
const TOTAL_LINES = 32;
/** Alto del encabezado de la hoja. */
const HEADER_HEIGHT = 72;
/** Altura total exacta de la página para que contenga exactamente 30 líneas sin scroll. */
const PAGE_CONTENT_HEIGHT = LINE_HEIGHT * TOTAL_LINES; // 960px
const TOTAL_CANVAS_HEIGHT = HEADER_HEIGHT + PAGE_CONTENT_HEIGHT; // 1032px

/** Posición horizontal del margen vertical. */
const MARGIN_LEFT = 72;

const RULED_LINES: CSSProperties = {
  top: HEADER_HEIGHT,
  height: PAGE_CONTENT_HEIGHT,
  backgroundImage: `repeating-linear-gradient(to bottom, var(--notebook-lines) 0, var(--notebook-lines) 1px, transparent 1px, transparent ${LINE_HEIGHT}px)`,
};

export interface NotebookCanvasProps {
  pageNumber: number;
  title?: string;
  children?: ReactNode;
  className?: string;
  contentHtml?: string;
  onContentChange?: (html: string) => void;
  inkColor?: string;
  activeTool?: string;
  onReachBottom?: () => void;
}

export function NotebookCanvas({
  pageNumber,
  title,
  children,
  className,
  contentHtml = "",
  onContentChange,
  inkColor = "#333333",
  activeTool = "keyboard",
  onReachBottom,
}: NotebookCanvasProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const currentColorRef = useRef(inkColor);

  useEffect(() => {
    currentColorRef.current = inkColor;
  }, [inkColor]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== contentHtml) {
      editorRef.current.innerHTML = contentHtml;
    }
  }, [contentHtml, pageNumber]);

  useEffect(() => {
    if (activeTool !== "keyboard" && editorRef.current) {
      editorRef.current.blur();
      window.getSelection()?.removeAllRanges();
    }
  }, [activeTool]);

  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;

    // Solo notificamos el cambio de contenido, sin forzar creación automática de páginas
    onContentChange?.(editor.innerHTML);
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (activeTool !== "keyboard") {
      e.preventDefault();
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (activeTool !== "keyboard") {
      e.preventDefault();
      return;
    }

    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length > 1) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const parentNode = range.startContainer.parentNode as HTMLElement;

    if (!parentNode || parentNode.style.color !== currentColorRef.current) {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("foreColor", false, currentColorRef.current);
    }
  };

  return (
    <section
      aria-label={`Página ${pageNumber}`}
      className={cn(
        "relative mx-auto w-full max-w-5xl overflow-hidden rounded-cards border border-warm-border shadow-sm",
        className
      )}
      style={{
        backgroundColor: "var(--notebook-paper)",
        height: `${TOTAL_CANVAS_HEIGHT}px`,
      }}
    >
      <header
        className="relative flex items-end justify-between gap-4 pb-3 pr-8"
        style={{ height: HEADER_HEIGHT, paddingLeft: MARGIN_LEFT + 16 }}
      >
        <h2 className="text-xl">{title ?? "Sin título"}</h2>
        <span className="text-sm text-pencil-gray">Pág. {pageNumber}</span>
      </header>

      {/* 30 Líneas rayadas exactas del cuaderno */}
      <div aria-hidden="true" className="absolute inset-x-0" style={RULED_LINES} />

      {/* Margen vertical rojo */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px"
        style={{
          left: MARGIN_LEFT,
          backgroundColor: "var(--notebook-margin)",
          opacity: 0.7,
        }}
      />

      {/* Área editable fija sin scroll interno */}
      <div
        className="absolute inset-x-0 z-10 overflow-hidden"
        style={{
          top: HEADER_HEIGHT,
          height: PAGE_CONTENT_HEIGHT,
          paddingLeft: MARGIN_LEFT + 16,
          paddingRight: "2rem",
        }}
      >
        <div
          ref={editorRef}
          contentEditable={activeTool === "keyboard"}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBeforeInput={handleBeforeInput}
          onClick={() => {
            if (activeTool === "keyboard" && editorRef.current) {
              editorRef.current.focus();
            }
          }}
          data-placeholder="Escribe aquí con tu teclado..."
          className={cn(
            "w-full h-full focus:outline-none overflow-hidden",
            activeTool === "keyboard"
              ? "empty:before:content-[attr(data-placeholder)] empty:before:text-pencil-gray/50 empty:before:pointer-events-none cursor-text"
              : "pointer-events-none select-none cursor-default"
          )}
          style={{
            lineHeight: `${LINE_HEIGHT}px`,
            fontSize: "16px",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Capa de trazos */}
      <div className="absolute inset-0 pointer-events-none z-20">{children}</div>
    </section>
  );
}