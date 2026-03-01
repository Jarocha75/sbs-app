import { COLORS } from "@/data/colors";
import { testyPContent, kategorie } from "@/data/testy/p/testy-p";
import KategoriaCard from "@/app/components/testy/KategoriaCard";
import CvicnyTestPCard from "@/app/components/CvicnyTestPCard";

const TestyPPage = () => {
  const { hero, section } = testyPContent;

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
        {/* Cvičný test */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <CvicnyTestPCard />
        </div>

        <h2
          className="text-lg font-semibold mb-6"
          style={{ color: COLORS.primary }}
        >
          {section.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kategorie.map((kat) => (
            <KategoriaCard key={kat.id} kategoria={kat} labels={section} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TestyPPage;
