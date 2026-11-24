"use client";

import { Button } from "@/components/shared/Button";
import { PlusIcon } from "@/components/shared/icons";

export interface NewNotebookButtonProps {
  onClick?: () => void;
}

export function NewNotebookButton({ onClick }: NewNotebookButtonProps) {
  return (
    <Button size="lg" onClick={onClick}>
      <PlusIcon />
      Nuevo cuaderno
    </Button>
  );
}