"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { Logo } from "./Logo";

export interface TopBarNotebook {
  id: string;
  title: string;
  coverColor: string;
}

export interface TopBarProps {
  userName: string;
  notebooks: TopBarNotebook[];
}

/** Barra superior de las vistas protegidas con menús desplegables para Escribir y Perfil/Sesión. */
export function TopBar({ userName, notebooks }: TopBarProps) {
  const pathname = usePathname();

  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const writeDropdownRef = useRef<HTMLLIElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (writeDropdownRef.current && !writeDropdownRef.current.contains(event.target as Node)) {
        setIsWriteOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDashboardActive = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isNotebookActive = pathname === "/notebook" || pathname.startsWith("/notebook/");
  const isProfileActive = pathname === "/profile" || pathname.startsWith("/profile/");

  async function handleConfirmLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      localStorage.removeItem("isAuthenticated");
      sessionStorage.clear();
      window.location.replace("/login");
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-warm-border bg-chalk-bg/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Logo href="/dashboard" size={36} />

          <nav aria-label="Principal">
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/dashboard"
                  aria-current={isDashboardActive ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-buttons px-4 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green",
                    isDashboardActive
                      ? "bg-warm-card text-ink-blue border border-warm-border"
                      : "border border-transparent text-graphite hover:text-ink-blue",
                  )}
                >
                  Mis cuadernos
                </Link>
              </li>

              <li className="relative" ref={writeDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsWriteOpen(!isWriteOpen);
                    setIsUserMenuOpen(false);
                  }}
                  aria-expanded={isWriteOpen}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 rounded-buttons px-4 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green",
                    isNotebookActive || isWriteOpen
                      ? "bg-warm-card text-ink-blue border border-warm-border"
                      : "border border-transparent text-graphite hover:text-ink-blue",
                  )}
                >
                  Escribir
                  <svg
                    className={cn("w-4 h-4 transition-transform duration-200", isWriteOpen && "rotate-180")}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isWriteOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-cards border border-warm-border bg-chalk-bg p-2 shadow-lg backdrop-blur">
                    <div className="px-3 py-2 text-xs font-semibold text-pencil-gray uppercase tracking-wider">
                      Selecciona un cuaderno
                    </div>
                    {notebooks.length === 0 ? (
                      <div className="px-3 py-3 text-xs text-graphite">
                        Aún no tienes cuadernos.{" "}
                        <Link
                          href="/dashboard"
                          onClick={() => setIsWriteOpen(false)}
                          className="font-semibold text-ink-blue underline"
                        >
                          Crea uno en Mis cuadernos
                        </Link>
                      </div>
                    ) : (
                      <ul className="flex flex-col gap-1">
                        {notebooks.map((notebook) => (
                          <li key={notebook.id}>
                            <Link
                              href={`/notebook?id=${encodeURIComponent(notebook.id)}`}
                              onClick={() => setIsWriteOpen(false)}
                              className="flex items-center gap-2 rounded-buttons px-3 py-2 text-sm text-ink-blue hover:bg-warm-card transition-colors"
                            >
                              <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: notebook.coverColor }}
                              />
                              <span className="truncate">{notebook.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className="relative" ref={userDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsWriteOpen(false);
              }}
              aria-label="Menú de usuario"
              aria-expanded={isUserMenuOpen}
              className={cn(
                "rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-green transition-transform active:scale-95",
                isProfileActive && "ring-2 ring-slate-green ring-offset-2"
              )}
            >
              <Avatar name={userName} />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-cards border border-warm-border bg-chalk-bg p-2 shadow-lg backdrop-blur">
                <div className="px-3 py-2 border-b border-warm-border mb-1">
                  <p className="text-xs font-semibold text-pencil-gray uppercase tracking-wider">Conectado como</p>
                  <p className="text-sm font-medium text-ink-blue truncate">{userName}</p>
                </div>
                <ul className="flex flex-col gap-1">
                  <li>
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-buttons px-3 py-2 text-sm text-ink-blue hover:bg-warm-card transition-colors",
                        isProfileActive && "bg-warm-card font-semibold"
                      )}
                    >
                      <svg className="w-4 h-4 text-graphite" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Ver perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 rounded-buttons px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-cards border border-warm-border bg-chalk-bg p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-ink-blue">¿Cerrar sesión?</h3>
            <p className="text-sm text-graphite">
              ¿Estás seguro de que deseas cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tus cuadernos.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setIsLogoutModalOpen(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-buttons px-4 text-sm font-medium text-graphite hover:bg-warm-card transition-colors border border-warm-border"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleConfirmLogout}
                className="inline-flex min-h-10 items-center justify-center rounded-buttons px-4 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                {isLoggingOut ? "Cerrando..." : "Sí, cerrar sesión"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}