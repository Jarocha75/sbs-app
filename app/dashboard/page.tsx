import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import UserHeader from "@/app/components/dashboard/UserHeader";
import CourseProgressCard from "@/app/components/dashboard/CourseProgressCard";
import StatsCard from "@/app/components/dashboard/StatsCard";
import TestsCard from "@/app/components/dashboard/TestsCard";
import ResultsCard from "@/app/components/dashboard/ResultsCard";
import Link from "next/link";

const EMPTY_ICON = "📚";
const EMPTY_TITLE = "Zatiaľ nemáte zakúpený žiadny kurz";
const EMPTY_TEXT =
  "Vyberte si kurz a začnite sa pripravovať na skúšku odbornej spôsobilosti.";
const EMPTY_LINK = "Pozrieť kurzy →";

const DashboardPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/prihlasenie");

  const [user, enrollments, progresses, testResults] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, status: true },
    }),
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            lessons: { orderBy: { order: "asc" } },
            tests: {
              select: {
                id: true,
                title: true,
                _count: { select: { questions: true } },
              },
              orderBy: { title: "asc" },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.progress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    }),
    prisma.testResult.findMany({
      where: { userId },
      include: { test: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  if (!user) return null;

  const completedLessonIds = new Set(progresses.map((p) => p.lessonId));

  // Štatistiky
  const allEnrolledLessonIds = new Set(
    enrollments.flatMap((e) => e.course.lessons.map((l) => l.id)),
  );
  const totalLessons = allEnrolledLessonIds.size;
  const completedInCourse = [...completedLessonIds].filter((id) =>
    allEnrolledLessonIds.has(id),
  ).length;
  const avgScore =
    testResults.length > 0
      ? Math.round(
          testResults.reduce((acc, r) => acc + r.score, 0) / testResults.length,
        )
      : null;

  const allTests = enrollments.flatMap((e) =>
    e.course.tests.map((t) => ({
      id: t.id,
      title: t.title,
      questionCount: t._count.questions,
    })),
  );

  const results = testResults.map((r) => ({
    id: r.id,
    score: r.score,
    passed: r.passed,
    createdAt: r.createdAt,
    testTitle: r.test.title,
  }));

  return (
    <main className="min-h-screen bg-page-bg">
      <UserHeader
        name={user.name}
        email={user.email}
        status={user.status as "PENDING" | "ACTIVE"}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {enrollments.length === 0 ? (
          /* Žiadny enrollment */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-lg mx-auto mt-8">
            <p className="text-4xl mb-4">{EMPTY_ICON}</p>
            <h2 className="text-xl font-bold mb-2 text-primary">
              {EMPTY_TITLE}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{EMPTY_TEXT}</p>
            <Link
              href="/kurzy/s"
              className="inline-block px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity bg-primary"
            >
              {EMPTY_LINK}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ľavý stĺpec – kurzy */}
            <div className="lg:col-span-2 space-y-6">
              {enrollments.map((enrollment) => (
                <CourseProgressCard
                  key={enrollment.id}
                  courseType={enrollment.course.type as "S" | "P"}
                  courseTitle={enrollment.course.title}
                  lessons={enrollment.course.lessons}
                  completedLessonIds={completedLessonIds}
                />
              ))}
            </div>

            {/* Pravý stĺpec – štatistiky, testy, výsledky */}
            <div className="space-y-6">
              <StatsCard
                completedLessons={completedInCourse}
                totalLessons={totalLessons}
                testCount={testResults.length}
                avgScore={avgScore}
              />
              <TestsCard tests={allTests} />
              <ResultsCard results={results} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
