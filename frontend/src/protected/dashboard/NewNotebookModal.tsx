"use client";

import { useState, type ChangeEvent, type FormEvent, useRef } from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Modal } from "@/components/shared/Modal";
import { COVER_COLORS } from "@/lib/constants";

export interface NewNotebookValues {
  title: string;
  description: string;
  coverColor: string;
}

export interface NewNotebookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NewNotebookValues) => void;
}

const DEFAULT_COVER = COVER_COLORS[0].value;

export function NewNotebookModal({ open, onClose, onSubmit }: NewNotebookModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverColor, setCoverColor] = useState<string>(DEFAULT_COVER);

  // Referencia al input nativo oculto
  const customColorInputRef = useRef<HTMLInputElement>(null);

  const isPresetSelected = COVER_COLORS.some(
    (c) => !c.isCustom && c.value.toLowerCase() === coverColor.toLowerCase()
  );

  function reset() {
    setTitle("");
    setDescription("");
    setCoverColor(DEFAULT_COVER);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ title: title.trim(), description: description.trim(), coverColor });
    reset();
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nuevo cuaderno"
      description="Dale un nombre y elige el color de su portada."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Título"
          name="title"
          placeholder="Ej. Química orgánica"
          required
          value={title}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        />
        <Input
          label="Descripción (opcional)"
          name="description"
          placeholder="Ej. Tema 4 · Alcanos"
          value={description}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
        />

        <div className="flex flex-col gap-2">
          <label className="px-1 text-sm font-medium text-ink-blue">
            Color de portada
          </label>

          <div className="flex flex-wrap items-center gap-3 px-1">
            {COVER_COLORS.map((color) => {
              // Manejo de la opción personalizada (isCustom: true)
              if (color.isCustom) {
                const isCustomActive = !isPresetSelected;

                return (
                  <button
                    key={color.value}
                    type="button"
                    // Al hacer clic, activamos el input nativo oculto
                    onClick={() => customColorInputRef.current?.click()}
                    className={`relative box-border size-10 shrink-0 overflow-hidden rounded-full border-2 transition-transform hover:scale-110 ${
                      isCustomActive
                        ? "border-ink-blue scale-110 shadow-sm"
                        : "border-transparent"
                    }`}
                    title={color.name}
                  >
                    {/* El input nativo está oculto pero funcional */}
                    <input
                      ref={customColorInputRef}
                      type="color"
                      value={coverColor}
                      onChange={(e) => setCoverColor(e.target.value)}
                      className="absolute -inset-2 h-16 w-16 cursor-pointer opacity-0 z-10"
                    />
                    {/* El span muestra el degradado o el color activo */}
                    <span
                      className={`block h-full w-full rounded-full ${
                        isCustomActive
                          ? ""
                          : "bg-gradient-to-br from-red-400 via-green-400 to-blue-400"
                      }`}
                      style={isCustomActive ? { backgroundColor: coverColor } : undefined}
                    />
                  </button>
                );
              }

              // Manejo de los colores predefinidos normales
              const isSelected = coverColor.toLowerCase() === color.value.toLowerCase();
              return (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setCoverColor(color.value)}
                  className={`relative box-border size-9 shrink-0 rounded-full border-2 transition-transform hover:scale-110 ${
                    isSelected
                      ? "border-ink-blue scale-110 shadow-sm"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={title.trim().length === 0}>
            Crear cuaderno
          </Button>
        </div>
      </form>
    </Modal>
  );
}