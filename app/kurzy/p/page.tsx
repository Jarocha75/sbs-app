import Link from "next/link";
import { kurzPContent, predmety, celkovyPocetHodin } from "@/data/kurz-p";
import StatCard from "@/app/components/kurz-s/StatCard";
import PredmetCard from "@/app/components/kurz-p/PredmetCard";
import ScaleIcon from "@/app/components/kurz-s/ScaleIcon";
import KurzObjednavkaForm from "@/app/components/KurzObjednavkaForm";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const KurzPPage = async () => {
  const { hero, stats, section } = kurzPContent;

  const session = await auth();
  let isEnrolled = false;

  if (session?.user?.id) {
    const course = await prisma.course.findFirst({ where: { type: "P" } });
    if (course) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      });
      isEnrolled = !!enrollment;
    }
  }

  return (
    <main className="min-h-screen bg-page-bg">
      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <span
            className="text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-accent text-primary"
          >
            {hero.badge}
          </span>

          <div>
            <h1 className="text-3xl font-bold text-white">{hero.title}</h1>

            <p
              className="text-sm font-semibold mt-0.5 text-accent"
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
            className="text-lg font-semibold mb-4 text-primary"
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
          <p className="text-sm font-semibold mb-1 text-primary">
            Pripravený začať štúdium?
          </p>

          {isEnrolled ? (
            <>
              <p className="text-xs text-gray-500 mb-4">
                Máte prístup ku kurzu. Môžete začať hneď.
              </p>
              <Link
                href="/kurzy/p/lekcie"
                className="inline-block px-6 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-opacity bg-primary"
              >
                Začať štúdium →
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-4">
                Po zakúpení dostanete email s odkazom na aktiváciu účtu.
              </p>
              <KurzObjednavkaForm courseType="P" />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default KurzPPage;
