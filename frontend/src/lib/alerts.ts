// src/lib/alerts.ts
import Swal from "sweetalert2";

// Instancia preconfigurada con la estética de Webnote
const webnoteSwal = Swal.mixin({
    buttonsStyling: false,
    customClass: {
        popup: "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl shadow-xl",
        title: "text-lg font-semibold text-zinc-100",
        htmlContainer: "text-sm text-zinc-400",
        confirmButton:
            "mt-4 px-5 py-2.5 rounded-xl bg-[#658D6D] hover:bg-[#567a5d] text-white text-sm font-medium transition-colors cursor-pointer",
    },
});

export function showSuccessAlert(title: string, text?: string) {
    return webnoteSwal.fire({
        icon: "success",
        iconColor: "#658D6D", // Verde Pizarra de Webnote
        title,
        text,
        confirmButtonText: "Continuar",
    });
}

export function showErrorAlert(title: string, text?: string) {
    return webnoteSwal.fire({
        icon: "error",
        iconColor: "#ef4444",
        title,
        text,
        confirmButtonText: "Entendido",
    });
}