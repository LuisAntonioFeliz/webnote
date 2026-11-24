"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { FormMessage } from "@/components/shared/FormMessage";
import { Input } from "@/components/shared/Input";
import { updateProfile } from "@/lib/actions/profile";
import type { ProfileValues } from "@/lib/types";

export interface ProfileFormProps {
  initialValues: ProfileValues;
  onUpdated?: (updated: ProfileValues) => void;
}

export function ProfileForm({ initialValues, onUpdated }: ProfileFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProfileValues>(initialValues);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrorMsg(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    const res = await updateProfile(values);

    setIsSaving(false);

    if (!res.ok) {
      setErrorMsg(res.error);
      await Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: res.error,
      });
      return;
    }

    setValues(res.profile);
    onUpdated?.(res.profile);
    router.refresh();

    await Swal.fire({
      icon: "success",
      title: "Perfil actualizado",
      text: "Tus datos personales se guardaron correctamente.",
      timer: 1800,
      showConfirmButton: false,
    });
  }

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2 className="text-2xl">Datos personales</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Nombres"
            name="nombres"
            autoComplete="given-name"
            required
            disabled={isSaving}
            value={values.nombres}
            onChange={handleChange}
          />
          <Input
            label="Apellidos"
            name="apellidos"
            autoComplete="family-name"
            required
            disabled={isSaving}
            value={values.apellidos}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Teléfono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          required
          disabled={isSaving}
          value={values.telefono}
          onChange={handleChange}
        />
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSaving}
          value={values.email}
          onChange={handleChange}
        />

        {errorMsg ? <FormMessage>{errorMsg}</FormMessage> : null}

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Card>
  );
}