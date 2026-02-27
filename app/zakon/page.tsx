import { COLORS } from "@/data/colors";
import { dalsiePravneNormy, legalNorms, zakonContent } from "@/data/zakon";
import LegalNormCard from "../components/zakon/LegalNormCard";

const ZakonPage = () => {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>
      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            {zakonContent.hero.title}
          </h1>
          <p className="mt-2 text-gray-300 max-w-xl">
            {zakonContent.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Hlavné právne normy */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: COLORS.primary }}
          >
            {zakonContent.sections.main}
          </h2>
          <div className="space-y-4">
            {legalNorms.map((norm) => (
              <LegalNormCard key={norm.id} norm={norm} />
            ))}
          </div>
        </section>

        {/* Ďalšie právne normy */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: COLORS.primary }}
          >
            {zakonContent.sections.other}
          </h2>

          {dalsiePravneNormy.length > 0 ? (
            <div className="space-y-4">
              {dalsiePravneNormy.map((norm) => (
                <LegalNormCard key={norm.id} norm={norm} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center">
              <p className="text-gray-400 text-sm">
                {zakonContent.sections.emptyOther}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default ZakonPage;
