"use client";

import { useState } from "react";
import { COLORS } from "@/data/colors";
import { SITE } from "@/data/site";
import ShieldIcon from "@/app/components/icons/ShieldIcon";
import { checkoutSchema, type CheckoutFormErrors } from "@/validation/checkout";

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors";

const ObjednavkaPage = () => {
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [selectedType, setSelectedType] = useState<"S" | "P" | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const raw = {
      email: formData.get("email") as string,
      courseType: formData.get("courseType") as string,
    };

    const result = checkoutSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: CheckoutFormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CheckoutFormErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Nastala chyba. Skúste to znova.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setServerError("Nastala chyba pri pripojení. Skúste to znova.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <div className="text-center mb-8">
          <ShieldIcon size={48} centered />
          <h1
            className="text-2xl font-bold mt-3"
            style={{ color: COLORS.primary }}
          >
            Objednávka kurzu
          </h1>
          <p className="text-gray-400 text-sm mt-1">{SITE.name}</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Typ kurzu */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: COLORS.primary }}
            >
              Typ kurzu <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["S", "P"] as const).map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center gap-2 border rounded-lg px-4 py-3 cursor-pointer text-sm font-semibold transition-colors ${
                    selectedType === type ? "border-blue-900 bg-blue-50" : ""
                  }`}
                  style={{
                    borderColor:
                      selectedType === type ? undefined : COLORS.primary + "40",
                  }}
                >
                  <input
                    type="radio"
                    name="courseType"
                    value={type}
                    className="sr-only"
                    onChange={() => setSelectedType(type)}
                  />
                  Preukaz {type}
                </label>
              ))}
            </div>
            {errors.courseType && (
              <p className="mt-1 text-xs text-red-600">{errors.courseType}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: COLORS.primary }}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vas@email.sk"
              className={inputClass}
              style={
                errors.email ? { boxShadow: "0 0 0 2px #ef4444" } : undefined
              }
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
            style={{ backgroundColor: COLORS.primary }}
          >
            {loading ? "Presmerovávam..." : "Pokračovať k platbe →"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Po úspešnej platbe dostanete email s odkazom na aktiváciu účtu.
        </p>
      </div>
    </div>
  );
};

export default ObjednavkaPage;
