import Link from "next/link";
import { COLORS } from "@/data/colors";
import type { TestItem } from "@/types/dashboard";

const CARD_TITLE = "Moje testy";
const EMPTY_TEXT = "Žiadne testy nie sú k dispozícii.";

interface Props {
  tests: TestItem[];
}

const TestsCard = ({ tests }: Props) => {
  if (tests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: COLORS.primary }}
        >
          {CARD_TITLE}
        </h3>
        <p className="text-sm text-gray-400">{EMPTY_TEXT}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: COLORS.primary }}
      >
        {CARD_TITLE}
      </h3>
      <ul className="space-y-1.5">
        {tests.map((test) => (
          <li key={test.id}>
            <Link
              href={`/testy/${test.id}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors group"
            >
              <span className="font-medium text-gray-700 group-hover:text-gray-900 truncate mr-2">
                {test.title}
              </span>
              <span className="shrink-0 text-xs text-gray-400 group-hover:text-gray-600">
                {test.questionCount} ot. →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestsCard;
