const CARD_TITLE = "Môj prehľad";
const PASS_THRESHOLD = 75;
const LABEL_LEKCIE = "lekcie hotové";
const LABEL_TESTY = "testov spravených";
const LABEL_SKORE = "priemerné skóre";
const LABEL_PRIPRAVENY = "pripravený na skúšku";

type Props = {
  completedLessons: number;
  totalLessons: number;
  testCount: number;
  avgScore: number | null;
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="text-2xl font-black text-primary">{value}</div>
    <div className="text-xs text-gray-400 mt-0.5 leading-tight">{label}</div>
  </div>
);

const StatsCard = ({
  completedLessons,
  totalLessons,
  testCount,
  avgScore,
}: Props) => (
  <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <h3 className="text-sm font-semibold mb-4 text-primary">{CARD_TITLE}</h3>
    <div className="grid grid-cols-2 gap-4">
      <StatItem
        value={`${completedLessons}/${totalLessons}`}
        label={LABEL_LEKCIE}
      />
      <StatItem value={String(testCount)} label={LABEL_TESTY} />
      <StatItem
        value={avgScore != null ? `${avgScore}%` : "—"}
        label={LABEL_SKORE}
      />
      <StatItem
        value={
          testCount > 0 && avgScore != null
            ? avgScore >= PASS_THRESHOLD
              ? "✓"
              : "✗"
            : "—"
        }
        label={LABEL_PRIPRAVENY}
      />
    </div>
  </article>
);

export default StatsCard;
