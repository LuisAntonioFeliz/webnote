"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { FormMessage } from "@/components/shared/FormMessage";
import { Input } from "@/components/shared/Input";
import { showErrorAlert } from "@/lib/alerts";

export interface LoginValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: LoginValues = { email: "", password: "" };

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    
    if (errors[name as keyof LoginValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error) setError(null);
  }

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof LoginValues, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    if (!values.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // Diferenciamos los mensajes según el código de estado o el mensaje del backend
        if (response.status === 404 || data.error?.toLowerCase().includes("no encontrado") || data.error?.toLowerCase().includes("registrado")) {
          showErrorAlert("Usuario no registrado", "No existe ninguna cuenta asociada a este correo electrónico.");
        } else if (response.status === 401 || data.error?.toLowerCase().includes("credenciales") || data.error?.toLowerCase().includes("contraseña")) {
          showErrorAlert("Credenciales incorrectas", "La contraseña ingresada no es válida.");
        } else {
          showErrorAlert("No se pudo iniciar sesión", data.error ?? "Ocurrió un error inesperado.");
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      showErrorAlert("Error de conexión", "No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        disabled={isSubmitting}
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Tu contraseña"
        disabled={isSubmitting}
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      {error ? <FormMessage>{error}</FormMessage> : null}

      <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}