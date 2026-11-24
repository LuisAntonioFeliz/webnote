export type ClassValue = string | false | null | undefined;

/** Une nombres de clase ignorando valores vacíos o falsos. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
