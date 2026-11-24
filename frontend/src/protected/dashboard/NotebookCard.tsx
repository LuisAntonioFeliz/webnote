"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { BookIcon } from "@/components/shared/icons";
import { Card } from "@/components/shared/Card";
import { updateNotebook, deleteNotebook } from "@/lib/actions/notebooks";
import type { NotebookSummary } from "@/lib/types";

const DATE_FORMAT = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const COVER_COLOR_OPTIONS = [
  { name: "Verde Pizarra", value: "#658D6D" },
  { name: "Azul Profundo", value: "#3B6978" },
  { name: "Terracota", value: "#B85D43" },
  { name: "Ciruela Oscuro", value: "#5E4363" },
  { name: "Mostaza Cálido", value: "#C48B28" },
  { name: "Carbón", value: "#2F3437" },
];

export function formatShortDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(isoDate));
}

export interface NotebookCardProps {
  notebook: NotebookSummary;
  onDeleted?: (notebookId: string) => void;
  onUpdated?: (
    notebookId: string,
    changes: { title: string; description: string | null; coverColor: string }
  ) => void;
}

export function NotebookCard({
  notebook,
  onDeleted,
  onUpdated,
}: NotebookCardProps) {
  const router = useRouter();
  const { id, title, description, coverColor, pageCount, updatedAt } = notebook;
  const pagesLabel = pageCount === 1 ? "página" : "páginas";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description ?? "");
  const [editColor, setEditColor] = useState(coverColor || "#658D6D");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const openEditModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setEditTitle(title);
    setEditDescription(description ?? "");
    setEditColor(coverColor || "#658D6D");
    setErrorMsg(null);
    setIsEditOpen(true);
  };

  const openDeleteModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setErrorMsg(null);
    setIsDeleteConfirmOpen(true);
  };

  const handleSaveCover = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setErrorMsg("El nombre del cuaderno es obligatorio.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    const trimmedDescription = editDescription.trim() || null;

    const res = await updateNotebook({
      notebookId: id,
      title: trimmedTitle,
      coverColor: editColor,
      description: trimmedDescription,
    });

    setIsSaving(false);

    if (!res.ok) {
      const message = res.error ?? "No se pudo actualizar el cuaderno.";
      setErrorMsg(message);
      await Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: message,
      });
      return;
    }

    setIsEditOpen(false);
    onUpdated?.(id, {
      title: trimmedTitle,
      description: trimmedDescription,
      coverColor: editColor,
    });
    router.refresh();

    await Swal.fire({
      icon: "success",
      title: "Portada actualizada",
      text: `Los cambios en "${trimmedTitle}" se guardaron correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setErrorMsg(null);

    const res = await deleteNotebook(id);

    setIsDeleting(false);

    if (!res.ok) {
      const message = res.error ?? "No se pudo eliminar el cuaderno.";
      setErrorMsg(message);
      await Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: message,
      });
      return;
    }

    setIsDeleteConfirmOpen(false);
    onDeleted?.(id);
    router.refresh();

    await Swal.fire({
      icon: "success",
      title: "Cuaderno eliminado",
      text: `"${title}" ha sido eliminado correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <div className="group relative">
        <Link
          href={`/notebook?id=${encodeURIComponent(id)}`}
          className="block rounded-cards focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-green"
        >
          <Card interactive padding="none" className="flex flex-col gap-4 p-4">
            <div
              className="relative flex aspect-[4/3] items-end rounded-[20px] p-4"
              style={{ backgroundColor: coverColor }}
            >
              {/* Lomo del cuaderno */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-5 w-px bg-white/40"
              />
              <BookIcon width={24} height={24} className="text-white/80" />

              {/* Menú discreto de tres puntos */}
              <div
                ref={menuRef}
                className="absolute right-3 top-3 z-20 flex flex-col items-end"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-label={`Opciones de ${title}`}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="menu"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-xs transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    ⋮
                  </span>
                </button>

                {isMenuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-1.5 w-40 overflow-hidden rounded-xl border border-warm-border bg-white py-1 shadow-lg"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openEditModal}
                      className="flex w-full items-center px-3.5 py-2 text-left text-xs font-medium text-graphite transition hover:bg-black/5"
                    >
                      Editar portada
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openDeleteModal}
                      className="flex w-full items-center px-3.5 py-2 text-left text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1 px-2 pb-2">
              <h3 className="text-xl">{title}</h3>
              {description ? (
                <p className="text-sm text-graphite">{description}</p>
              ) : null}
              <p className="text-xs text-pencil-gray">
                {pageCount} {pagesLabel} · Editado {formatShortDate(updatedAt)}
              </p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Modal para editar portada */}
      {isEditOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`edit-title-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !isSaving && setIsEditOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-warm-border bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 id={`edit-title-${id}`} className="text-lg font-semibold">
              Editar portada
            </h4>
            <p className="mt-1 text-xs text-pencil-gray">
              Cambia el nombre, la descripción o el color de la portada.
            </p>

            <form onSubmit={handleSaveCover} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor={`name-${id}`} className="text-sm font-medium">
                  Nombre del cuaderno
                </label>
                <input
                  id={`name-${id}`}
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="rounded-lg border border-warm-border px-3 py-2 text-sm focus:border-slate-green focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor={`desc-${id}`} className="text-sm font-medium">
                  Descripción (opcional)
                </label>
                <input
                  id={`desc-${id}`}
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="rounded-lg border border-warm-border px-3 py-2 text-sm focus:border-slate-green focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Color de portada</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {COVER_COLOR_OPTIONS.map((opt) => {
                    const selected =
                      editColor.toLowerCase() === opt.value.toLowerCase();
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setEditColor(opt.value)}
                        title={opt.name}
                        aria-label={opt.name}
                        className={`h-8 w-8 rounded-full border-2 transition ${
                          selected
                            ? "scale-110 border-black ring-2 ring-slate-green/40"
                            : "border-transparent opacity-85 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: opt.value }}
                      />
                    );
                  })}
                </div>
              </div>

              {errorMsg ? (
                <p className="text-xs font-medium text-red-600">{errorMsg}</p>
              ) : null}

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-lg border border-warm-border px-4 py-2 text-sm font-medium text-graphite hover:bg-black/5 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-slate-green px-4 py-2 text-sm font-medium text-white hover:opacity-95 disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Alerta de confirmación para eliminar cuaderno */}
      {isDeleteConfirmOpen ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={`delete-title-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !isDeleting && setIsDeleteConfirmOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-warm-border bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 id={`delete-title-${id}`} className="text-lg font-semibold">
              ¿Eliminar cuaderno?
            </h4>
            <p className="mt-2 text-sm text-graphite">
              ¿Seguro que deseas eliminar{" "}
              <span className="font-semibold">&ldquo;{title}&rdquo;</span>? Esta
              acción eliminará el cuaderno y todos sus apuntes.
            </p>

            {errorMsg ? (
              <p className="mt-2 text-xs font-medium text-red-600">{errorMsg}</p>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="rounded-lg border border-warm-border px-4 py-2 text-sm font-medium text-graphite hover:bg-black/5 disabled:opacity-50"
              >
                No, cancelar
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}