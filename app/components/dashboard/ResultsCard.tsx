import type { ResultItem } from "@/types/dashboard";

const CARD_TITLE = "Posledné výsledky";
const EMPTY_TEXT = "Zatiaľ žiadne výsledky. Vyskúšaj niektorý test!";
const ICON_PASS = "🟢";
const ICON_FAIL = "🔴";

interface Props {
  results: ResultItem[];
}

const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "práve teraz";
  if (diff < 3600) return `pred ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `pred ${Math.floor(diff / 3600)} hod`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return "včera";
  if (days < 7) return `pred ${days} dňami`;
  return date.toLocaleDateString("sk-SK", { day: "numeric", month: "short" });
};

const ResultsCard = ({ results }: Props) => (
  <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <h3 className="text-sm font-semibold mb-3 text-primary">{CARD_TITLE}</h3>

    {results.length === 0 ? (
      <p className="text-sm text-gray-400">{EMPTY_TEXT}</p>
    ) : (
      <ul className="space-y-2">
        {results.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-50"
          >
            {/* Score badge */}
            <span
              className={`shrink-0 w-12 text-center text-sm font-bold rounded-lg py-1 ${r.passed ? "bg-success-bg text-success" : "bg-danger-bg text-danger"}`}
            >
              {r.score}%
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">
                {r.testTitle}
              </p>
              <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
            </div>
            <span className="shrink-0 text-base">
              {r.passed ? ICON_PASS : ICON_FAIL}
            </span>
          </li>
        ))}
      </ul>
    )}
  </article>
);

export default ResultsCard;
