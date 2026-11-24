"use client";

import { Button } from "@/components/shared/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/shared/icons";

export interface PageNavigatorProps {
  pageNumber: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PageNavigator({
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
}: PageNavigatorProps) {
  return (
    <nav
      aria-label="Páginas del cuaderno"
      className="mx-auto flex w-fit items-center gap-3"
    >
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={pageNumber <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </Button>
      <p className="min-w-32 text-center text-sm text-graphite" aria-live="polite">
        Página {pageNumber} de {totalPages}
      </p>
      <Button
        variant="secondary"
        onClick={onNext}
        disabled={pageNumber >= totalPages}
        aria-label="Página siguiente"
      >
        <ChevronRightIcon />
      </Button>
    </nav>
  );
}
