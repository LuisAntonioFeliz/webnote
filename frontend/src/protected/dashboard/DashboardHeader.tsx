import type { ReactNode } from "react";

export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  /** Acción principal de la vista (por ejemplo, crear un cuaderno). */
  action?: ReactNode;
}

export function DashboardHeader({ title, subtitle, action }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full">
      <div className="flex flex-col gap-2 min-w-0">
        <h1 className="text-3xl sm:text-4xl truncate">{title}</h1>
        <p className="text-sm text-graphite">{subtitle}</p>
      </div>
      {action && <div className="w-full sm:w-auto flex justify-start sm:justify-end">{action}</div>}
    </div>
  );
}
