import { cn } from "@/lib/cn";

export type AvatarSize = "sm" | "lg";

export interface AvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

const SIZES: Record<AvatarSize, string> = {
  sm: "size-10 text-sm",
  lg: "size-24 text-3xl",
};

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

/** Círculo con las iniciales del estudiante. */
export function Avatar({ name, size = "sm", className }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        "bg-ink-blue font-sf-pro-display font-semibold text-warm-card",
        SIZES[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
