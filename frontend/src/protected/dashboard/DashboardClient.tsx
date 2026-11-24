"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/protected/dashboard/DashboardHeader";
import { NewNotebookButton } from "@/protected/dashboard/NewNotebookButton";
import { formatShortDate } from "@/protected/dashboard/NotebookCard";
import { NotebookGrid } from "@/protected/dashboard/NotebookGrid";
import { StatsRow, type DashboardStats } from "@/protected/dashboard/StatsRow";
import {
    NewNotebookModal,
    type NewNotebookValues,
} from "@/protected/dashboard/NewNotebookModal";
import type { NotebookSummary } from "@/lib/types";

interface DashboardClientProps {
    initialNotebooks: NotebookSummary[];
}

export function DashboardClient({ initialNotebooks }: DashboardClientProps) {
    const router = useRouter();
    const [notebooks, setNotebooks] = useState<NotebookSummary[]>(initialNotebooks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleCreateNotebook(values: NewNotebookValues) {
        const response = await fetch("/api/notebooks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error ?? "No se pudo crear el cuaderno.");
        }

        const { notebook } = (await response.json()) as {
            notebook: NotebookSummary;
        };

        setNotebooks((prev) => [notebook, ...prev]);
        setIsModalOpen(false);
        router.refresh();
    }

    const latest = notebooks.reduce<string | null>(
        (acc, notebook) =>
            acc === null || notebook.updatedAt > acc ? notebook.updatedAt : acc,
        null
    );

    const stats: DashboardStats = {
        notebooks: notebooks.length,
        pages: notebooks.reduce((total, notebook) => total + notebook.pageCount, 0),
        lastActivity: latest ? formatShortDate(latest) : "—",
    };

    return (
        <div className="flex flex-col gap-10">
            <DashboardHeader
                title="Mis cuadernos"
                subtitle="Todos tus apuntes, organizados por materia."
                action={<NewNotebookButton onClick={() => setIsModalOpen(true)} />}
            />
            <StatsRow stats={stats} />
            <NotebookGrid notebooks={notebooks} />

            <NewNotebookModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateNotebook}
            />
        </div>
    );
}