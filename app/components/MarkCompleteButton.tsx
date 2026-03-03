"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  lessonId: string;
  nextLessonId: string | null;
  completed: boolean;
};

const MarkCompleteButton = ({ lessonId, nextLessonId, completed }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(completed);

  async function handleClick() {
    if (isDone) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Nepodarilo sa uložiť postup");
      }

      setIsDone(true);

      if (nextLessonId) {
        router.push(`/kurzy/s/lekcie/${nextLessonId}`);
      } else {
        router.push("/kurzy/s/lekcie");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleClick}
        disabled={isDone || loading}
        className={`w-full py-3.5 rounded-xl font-bold text-base transition-opacity text-white ${isDone ? "bg-success cursor-default" : loading ? "bg-primary opacity-70 cursor-wait" : "bg-primary cursor-pointer"}`}
      >
        {loading
          ? "Ukladám…"
          : isDone
            ? "✓ Hotovo – lekcia dokončená"
            : "Označiť ako hotovú"}
      </button>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {isDone && !nextLessonId && (
        <p className="text-sm text-center text-gray-500">
          Toto bola posledná lekcia kurzu. Gratulujeme!
        </p>
      )}
    </div>
  );
};

export default MarkCompleteButton;
