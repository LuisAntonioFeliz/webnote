"use client";

import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { CloseIcon } from "./icons";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/** Ventana modal sobre el elemento nativo <dialog>: foco y tecla Esc gestionados por el navegador. */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    // El clic sobre el fondo oscurecido llega con el propio <dialog> como destino.
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto w-[min(92vw,32rem)] rounded-cards border border-warm-border bg-warm-card p-0 text-graphite backdrop:bg-ink-blue/30"
    >
      <div className="flex flex-col gap-6 p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-2xl">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-sm text-pencil-gray">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-pencil-gray transition-colors duration-200 hover:bg-chalk-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
