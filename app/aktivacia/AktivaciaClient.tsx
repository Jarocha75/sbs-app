"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/data/site";
import ShieldIcon from "@/app/components/icons/ShieldIcon";

interface Props {
  token: string;
}

const INPUT_CLASS =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const TITLE = "Nastavte si heslo";
const LABEL_PASSWORD = "Nové heslo";
const LABEL_CONFIRM = "Potvrdenie hesla";
const PLACEHOLDER_PASSWORD = "min. 8 znakov";
const PLACEHOLDER_CONFIRM = "••••••••";
const BTN_LOADING = "Aktivujem...";
const BTN_SUBMIT = "Aktivovať účet";
const ERROR_PASSWORDS_MISMATCH = "Heslá sa nezhodujú";
const ERROR_DEFAULT = "Nastala chyba. Skúste to znova.";
const SUCCESS_TITLE = "Účet bol aktivovaný!";
const SUCCESS_TEXT = "Presmerovávame vás na prihlásenie...";
const SUCCESS_ICON = "✓";
const REDIRECT_SUCCESS = "/prihlasenie?aktivovany=1";
const REDIRECT_DELAY = 2000;

const AktivaciaClient = ({ token }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const redirectTimeout = useRef<number>(null);

  useEffect(() => {
    return () => { if (redirectTimeout.current) clearTimeout(redirectTimeout.current) }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError(ERROR_PASSWORDS_MISMATCH);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? ERROR_DEFAULT);
      return;
    }

    setSuccess(true);
    redirectTimeout.current = window.setTimeout(() => router.push(REDIRECT_SUCCESS), REDIRECT_DELAY);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-page-bg">
        <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
          <div className="text-5xl mb-4 text-accent">
            {SUCCESS_ICON}
          </div>
          <h1 className="text-xl font-bold text-primary">
            {SUCCESS_TITLE}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {SUCCESS_TEXT}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-page-bg">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">
        <div className="text-center mb-8">
          <ShieldIcon size={48} centered />
          <h1 className="text-2xl font-bold mt-3 text-primary">
            {TITLE}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{SITE.name}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_PASSWORD} <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder={PLACEHOLDER_PASSWORD}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_CONFIRM} <span className="text-red-500">*</span>
            </label>
            <input
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              placeholder={PLACEHOLDER_CONFIRM}
              className={INPUT_CLASS}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2 bg-primary"
          >
            {loading ? BTN_LOADING : BTN_SUBMIT}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AktivaciaClient;
