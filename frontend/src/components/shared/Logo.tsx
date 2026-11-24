import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface LogoProps {
  /** Tamaño del isotipo en píxeles. */
  size?: number;
  href?: string;
  showWordmark?: boolean;
  priority?: boolean;
  className?: string;
}

export function Logo({
  size = 40,
  href = "/",
  showWordmark = true,
  priority = false,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Webnote, ir al inicio"
      className={cn(
        "inline-flex items-center gap-3 rounded-buttons",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-green",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
      />
      {showWordmark ? (
        <span className="font-sf-pro-display text-lg font-semibold tracking-tight text-ink-blue">
          Webnote
        </span>
      ) : null}
    </Link>
  );
}
