"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { INK_COLORS } from "@/lib/constants";
import { saveNotebookPage } from "@/lib/actions/pages";
import { NotebookCanvas } from "./NotebookCanvas";
import { NotebookToolbar, type NotebookTool } from "./NotebookToolbar";
import { PageNavigator } from "./PageNavigator";
import { PlusIcon } from "@/components/shared/icons";

export interface NotebookWorkspaceProps {
  notebookId: string;
  notebookTitle: string;
  totalPages: number;
  initialPage?: number;
  initialPageContents?: Record<number, string>;
}

export function NotebookWorkspace({
  notebookId,
  notebookTitle,
  totalPages: initialTotalPages,
  initialPage = 1,
  initialPageContents = {},
}: NotebookWorkspaceProps) {
  const [totalPages, setTotalPages] = useState(Math.max(initialTotalPages, 1));
  const [page, setPage] = useState(Math.min(Math.max(initialPage, 1), totalPages));
  const [tool, setTool] = useState<NotebookTool>("pen");
  const [color, setColor] = useState<string>(INK_COLORS[0].value);

  const [pageContents, setPageContents] = useState<Record<number, string>>(initialPageContents);
  const [saveStatus, setSaveStatus] = useState<string>("Guardado");

  const currentContent = pageContents[page] || "";
  const isFirstRenderRef = useRef(true);

  const persistPage = useCallback(
    async (targetPage: number, html: string, isManual = false) => {
      setSaveStatus(isManual ? "Guardando apuntes..." : "Guardando...");
      const result = await saveNotebookPage({
        notebookId,
        pageNumber: targetPage,
        contentHtml: html,
      });

      if (!result.ok) {
        setSaveStatus("Error al guardar");
        return;
      }

      setSaveStatus(isManual ? "¡Apuntes guardados!" : "Guardado");
      if (isManual) {
        setTimeout(() => setSaveStatus("Guardado"), 2500);
      }
    },
    [notebookId]
  );

  // Auto-guardado con debounce al editar la página actual
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      void persistPage(page, currentContent, false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentContent, page, persistPage]);

  const handleContentChange = (newHtml: string) => {
    setPageContents((prev) => ({
      ...prev,
      [page]: newHtml,
    }));
  };

  const handleAddPage = () => {
    const newTotal = totalPages + 1;
    setTotalPages(newTotal);
    setPage(newTotal);
  };

  const handleManualSave = () => {
    void persistPage(page, currentContent, true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl">{notebookTitle}</h1>
        <div className="flex items-center gap-3">
          <p className="text-sm text-pencil-gray">
            Escribe libremente con tu teclado o herramientas de trazo.
          </p>
          <span className="text-xs font-medium text-slate-green bg-slate-green/10 px-2.5 py-0.5 rounded-full">
            {saveStatus}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddPage}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-green px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105"
        >
          <PlusIcon className="size-4" />
          <span>Agregar página</span>
        </button>
      </div>

      <NotebookToolbar
        tool={tool}
        onToolChange={setTool}
        color={color}
        onColorChange={setColor}
        onSave={handleManualSave}
      />

      <NotebookCanvas
        pageNumber={page}
        title={notebookTitle}
        contentHtml={currentContent}
        onContentChange={handleContentChange}
        inkColor={color}
        activeTool={tool}
        onReachBottom={handleAddPage}
      />

      <PageNavigator
        pageNumber={page}
        totalPages={totalPages}
        onPrevious={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
      />
    </div>
  );
}