import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webnote",
  description:
    "Cuaderno digital tablet-first para estudiantes, con escritura fluida y modo offline.",
    icons: {
      icon: "/images/logo.png",
    },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased overflow-x-hidden bg-background text-ink-blue">{children}</body>
    </html>
  );
}
