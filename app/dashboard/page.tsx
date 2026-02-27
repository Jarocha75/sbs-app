import { COLORS } from "@/data/colors";
import { HERO, SECTIONS, courses, infoCards } from "@/data/dashboard";
import CourseCard from "@/app/components/CourseCard";
import InfoCard from "@/app/components/InfoCard";

const DashboardPage = () => {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>
      {/* Hero banner */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">{HERO.title}</h1>
          <p className="mt-2 text-gray-300 max-w-xl">{HERO.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Courses */}
        <section>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: COLORS.primary }}
          >
            {SECTIONS.courses}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.type} {...course} />
            ))}
          </div>
        </section>

        {/* Info cards */}
        <section>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: COLORS.primary }}
          >
            {SECTIONS.infoCards}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {infoCards.map((card) => (
              <InfoCard key={card.href} {...card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
