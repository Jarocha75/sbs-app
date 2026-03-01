"use client";

import { useState } from "react";
import { COLORS } from "@/data/colors";
import {
  kontaktSchema,
  type KontaktFormData,
  type KontaktFormErrors,
} from "@/validation/kontakt";
import FormField, { inputClass } from "@/app/components/FormField";

const INITIAL: KontaktFormData = {
  meno: "",
  priezvisko: "",
  telefon: "",
  email: "",
  sprava: "",
};

const KontaktFormular = () => {
  const [formData, setFormData] = useState<KontaktFormData>(INITIAL);
  const [errors, setErrors] = useState<KontaktFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof KontaktFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    const result = kontaktSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: KontaktFormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof KontaktFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) {
        const json = await res.json();
        setServerError(json.error ?? "Nastala chyba. Skúste to znova.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData(INITIAL);
    } catch {
      setServerError("Nastala chyba pri odosielaní. Skúste to znova.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-green-800">
          Správa odoslaná!
        </h3>
        <p className="text-green-700">
          Ďakujeme za záujem. Ozveme sa vám čo najskôr.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline"
          style={{ color: COLORS.primary }}
        >
          Odoslať ďalšiu správu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Meno *" error={errors.meno}>
          <input
            type="text"
            name="meno"
            value={formData.meno}
            onChange={handleChange}
            placeholder="Ján"
            className={inputClass}
            style={{
              boxShadow: errors.meno ? "0 0 0 2px #ef4444" : undefined,
            }}
          />
        </FormField>

        <FormField label="Priezvisko *" error={errors.priezvisko}>
          <input
            type="text"
            name="priezvisko"
            value={formData.priezvisko}
            onChange={handleChange}
            placeholder="Novák"
            className={inputClass}
            style={{
              boxShadow: errors.priezvisko ? "0 0 0 2px #ef4444" : undefined,
            }}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Telefónne číslo *" error={errors.telefon}>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            placeholder="+421 900 000 000"
            className={inputClass}
            style={{
              boxShadow: errors.telefon ? "0 0 0 2px #ef4444" : undefined,
            }}
          />
        </FormField>

        <FormField label="Email *" error={errors.email}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jan.novak@email.sk"
            className={inputClass}
            style={{
              boxShadow: errors.email ? "0 0 0 2px #ef4444" : undefined,
            }}
          />
        </FormField>
      </div>

      <FormField label="Správa *" error={errors.sprava}>
        <textarea
          name="sprava"
          value={formData.sprava}
          onChange={handleChange}
          rows={5}
          placeholder="Napíšte nám vaše otázky alebo záujem o kurz..."
          className={inputClass}
          style={{
            boxShadow: errors.sprava ? "0 0 0 2px #ef4444" : undefined,
            resize: "vertical",
          }}
        />
      </FormField>

      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg py-3.5 text-base font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          backgroundColor: COLORS.accent,
          color: COLORS.primary,
        }}
      >
        {status === "loading" ? "Odosiela sa..." : "Odoslať správu"}
      </button>
    </form>
  );
};

export default KontaktFormular;
