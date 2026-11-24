"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/shared/Card";
import type { NotebookSummary } from "@/lib/types";
import { NotebookCard } from "./NotebookCard";

export interface NotebookGridProps {
  notebooks: readonly NotebookSummary[];
}

export function NotebookGrid({ notebooks }: NotebookGridProps) {
  const [items, setItems] = useState<NotebookSummary[]>(() => [...notebooks]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setItems([...notebooks]);
  }, [notebooks]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  };

  const handleDeleted = (deletedId: string, deletedTitle: string) => {
    setItems((prev) => prev.filter((item) => item.id !== deletedId));
    showToast(`Cuaderno "${deletedTitle}" eliminado`);
  };

  const handleUpdated = (
    updatedId: string,
    changes: { title: string; description: string | null; coverColor: string }
  ) => {
    setItems((prev) =>
      prev.map((item): NotebookSummary => {
        if (item.id !== updatedId) return item;
        return {
          ...item,
          title: changes.title,
          coverColor: changes.coverColor,
          ...(changes.description !== undefined
            ? { description: changes.description as NotebookSummary["description"] }
            : {}),
        };
      })
    );
    showToast(`Portada de "${changes.title}" actualizada`);
  };

  const toastBanner = toastMessage ? (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-green px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      {toastMessage}
    </div>
  ) : null;

  if (items.length === 0) {
    return (
      <>
        {toastBanner}
        <Card
          padding="lg"
          className="flex flex-col items-center gap-2 border-dashed text-center"
        >
          <h2 className="text-2xl">Aún no tienes cuadernos</h2>
          <p className="max-w-sm text-sm text-graphite">
            Crea tu primer cuaderno para empezar a tomar apuntes.
          </p>
        </Card>
      </>
    );
  }

  return (
    <>
      {toastBanner}

      <div className="flex flex-col gap-6 sm:gap-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((notebook) => (
            <li key={notebook.id}>
              <NotebookCard
                notebook={notebook}
                onDeleted={(deletedId) => handleDeleted(deletedId, notebook.title)}
                onUpdated={(updatedId, changes) => handleUpdated(updatedId, changes)}
              />
            </li>
          ))}
        </ul>

        {/* Mensaje con diseño adaptable (móvil vs tablet/ordenador) */}
        <Card
          padding="md"
          className="flex flex-col gap-2 text-center bg-card-bg/60 border-dashed sm:p-6"
        >
          <p className="text-xs sm:text-sm font-medium text-ink-blue">
            💡 Consejo para tus apuntes
          </p>
          <p className="text-xs sm:text-sm text-graphite leading-relaxed max-w-2xl mx-auto">
            Para usar cualquier cuaderno y aprovechar al máximo la escritura, te
            recomendamos acceder desde una tableta u ordenador. Aunque es posible
            en dispositivos móviles, la pantalla más amplia te ofrecerá una
            experiencia mucho más cómoda.
          </p>
        </Card>
      </div>
    </>
  );
}