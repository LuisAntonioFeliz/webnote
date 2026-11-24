/** Resumen de un cuaderno tal como lo muestra la interfaz. */
export interface NotebookSummary {
  id: string;
  title: string;
  description?: string;
  coverColor: string;
  pageCount: number;
  /** Fecha ISO 8601 de la última edición. */
  updatedAt: string;
}

/** Datos editables del perfil del estudiante. */
export interface ProfileValues {
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
}
