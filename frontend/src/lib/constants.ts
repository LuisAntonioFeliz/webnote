export interface NamedColor {
  readonly name: string;
  readonly value: string;
  readonly isCustom?: boolean; // Indicador opcional para el selector personalizado
}

/** Colores de portada disponibles para un cuaderno (tonos analógicos y apagados). */
export const COVER_COLORS: readonly NamedColor[] = [
  { name: "Verde Pizarra", value: "#658D6D" },
  { name: "Azul Tinta", value: "#263746" },
  { name: "Azul Papel", value: "#9CB9D8" },
  { name: "Arena", value: "#C8B79A" },
  { name: "Terracota", value: "#B97A62" },
  { name: "Ciruela", value: "#7D5E7E" },
  { name: "Personalizado", value: "custom", isCustom: true },
];

/** Colores de tinta del lienzo (inspirados en lápices y bolígrafos tradicionales). */
export const INK_COLORS: readonly NamedColor[] = [
  { name: "Gris Carbón (Lápiz)", value: "#333333" },
  { name: "Azul Tinta", value: "#1A5276" },
  { name: "Negro Tinta", value: "#111111" },
  { name: "Rojo Tinta", value: "#C0392B" },
  { name: "Personalizado", value: "custom", isCustom: true },
];
