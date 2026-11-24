import { Card } from "@/components/shared/Card";

export interface DashboardStats {
  notebooks: number;
  pages: number;
  /** Texto ya formateado, por ejemplo "2 oct". */
  lastActivity: string;
}

interface StatItem {
  readonly label: string;
  readonly value: string;
}

export function StatsRow({ stats }: { stats: DashboardStats }) {
  const items: readonly StatItem[] = [
    { label: "Cuadernos", value: String(stats.notebooks) },
    { label: "Páginas escritas", value: String(stats.pages) },
    { label: "Última actividad", value: stats.lastActivity },
  ];

  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="flex flex-col gap-1">
          <dt className="text-sm text-pencil-gray">{item.label}</dt>
          <dd className="font-sf-pro-display text-3xl font-semibold tracking-tight text-ink-blue">
            {item.value}
          </dd>
        </Card>
      ))}
    </dl>
  );
}
