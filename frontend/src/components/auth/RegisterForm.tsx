"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { FormMessage } from "@/components/shared/FormMessage";
import { Input } from "@/components/shared/Input";
import { showSuccessAlert, showErrorAlert } from "@/lib/alerts";

export interface RegisterValues {
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  password: string;
}

const INITIAL_VALUES: RegisterValues = {
  nombres: "",
  apellidos: "",
  telefono: "",
  email: "",
  password: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterValues, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name as keyof RegisterValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error) setError(null);
  }

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof RegisterValues, string>> = {};

    if (!values.nombres.trim()) {
      newErrors.nombres = "El nombre es obligatorio.";
    }
    if (!values.apellidos.trim()) {
      newErrors.apellidos = "El apellido es obligatorio.";
    }
    if (!values.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (values.telefono.trim().length < 10) {
      newErrors.telefono = "Introduce un número de teléfono válido.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    if (!values.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (values.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // Validar antes de enviar al servidor
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // Alerta detallada para depurar cualquier fallo en el registro
        showErrorAlert(
          "No se pudo registrar", 
          data.error ?? "Ocurrió un error inesperado al intentar crear la cuenta."
        );
        return;
      }

      // Alerta de éxito antes de redirigir al dashboard
      await showSuccessAlert(
        "¡Usuario registrado exitosamente!", 
        "Tu cuenta ha sido creada correctamente."
      );

      router.push("/dashboard");
      router.refresh();
    } catch {
      showErrorAlert(
        "Error de conexión", 
        "No se pudo conectar con el servidor. Verifica tu red e inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Nombres"
          name="nombres"
          autoComplete="given-name"
          disabled={isSubmitting}
          value={values.nombres}
          onChange={handleChange}
          error={errors.nombres}
        />
        <Input
          label="Apellidos"
          name="apellidos"
          autoComplete="family-name"
          disabled={isSubmitting}
          value={values.apellidos}
          onChange={handleChange}
          error={errors.apellidos}
        />
      </div>
      <Input
        label="Teléfono"
        name="telefono"
        type="tel"
        autoComplete="tel"
        placeholder="809-555-0123"
        disabled={isSubmitting}
        value={values.telefono}
        onChange={handleChange}
        error={errors.telefono}
      />
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
        autoComplete="new-password"
        hint="Mínimo 8 caracteres."
        disabled={isSubmitting}
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      {error ? <FormMessage>{error}</FormMessage> : null}

      <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
    </form>
  );
}