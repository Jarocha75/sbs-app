import Link from "next/link";
import { COLORS } from "@/data/colors";
import {
  kurzSContent,
  predmety,
  celkovyPocetHodin,
} from "@/data/kurz-s";

import StatCard from "@/app/components/kurz-s/StatCard";
import PredmetCard from "@/app/components/kurz-s/PredmetCard";
import ScaleIcon from "@/app/components/kurz-s/ScaleIcon";

const KurzSPage = () => {
  const { hero, stats, section } = kurzSContent;

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>
      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <span
            className="text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            {hero.badge}
          </span>

          <div>
            <h1 className="text-3xl font-bold text-white">{hero.title}</h1>

            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: COLORS.accent }}
            >
              {hero.subtitle}
            </p>

            <p className="mt-2 text-gray-300 text-sm max-w-xl">
              {hero.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard value={predmety.length} label={stats.predmety} />
          <StatCard value={celkovyPocetHodin} label={stats.celkovo} />

          <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col items-center justify-center gap-2 text-center">
            <ScaleIcon />
            <span className="text-xs text-gray-500 leading-snug">
              {stats.zdroj}
            </span>
          </div>
        </div>

        {/* Osnova */}
        <section className="mt-8">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: COLORS.primary }}
          >
            {section.title}
          </h2>

          <div className="space-y-3">
            {predmety.map((predmet) => (
              <PredmetCard
                key={predmet.id}
                predmet={predmet}
                hodinaLabel={section.hodiny}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: COLORS.primary }}
              >
                Pripravený začať štúdium?
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                Interaktívne lekcie s textovým obsahom a video výkladom
              </p>
            </div>

            <Link
              href="/kurzy/s/lekcie"
              className="shrink-0 px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: COLORS.primary, color: "white" }}
            >
              Začať štúdium →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KurzSPage;
