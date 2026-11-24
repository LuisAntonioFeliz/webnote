import type { ReactNode } from "react";
import { Card } from "@/components/shared/Card";
import { Logo } from "@/components/shared/Logo";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Enlace secundario al pie (por ejemplo, ir a registro o a inicio de sesión). */
  footer?: ReactNode;
}

/** Tarjeta centrada que enmarca los formularios de acceso. */
export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <Card padding="lg" className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Logo size={56} showWordmark={false} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">{title}</h1>
          <p className="text-sm text-graphite">{subtitle}</p>
        </div>
      </div>

      {children}

      {footer ? (
        <p className="text-center text-sm text-graphite">{footer}</p>
      ) : null}
    </Card>
  );
}
