import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import LockIcon from "@/app/components/icons/LockIcon";

const EMPTY_TEXT = "Lekcie zatiaľ nie sú dostupné.";
const HERO_BADGE = "S";
const PAGE_TITLE = "Lekcie – Preukaz typu S";
const PAGE_SUBTITLE = "Odborná príprava pre fyzickú ochranu a pátranie";
const PROGRESS_TITLE = "Postup v kurze";
const PROGRESS_SUFFIX = "hotovo";
const PROGRESS_PERCENT_SUFFIX = "% dokončené";
const LESSONS_TITLE = "Zoznam lekcií";
const STATUS_DONE = "Dokončené";
const STATUS_LOCKED = "Zamknuté";
const STATUS_AVAILABLE = "Dostupné";
const DONE_BADGE = "✓";
const DURATION_SUFFIX = "min";
const BACK_LINK = "← Späť na prehľad kurzu";

const LekcieListPage = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/prihlasenie");

  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: session.user.id, course: { type: "S" } },
  });
  if (!enrollment) redirect("/kurzy/s");

  const course = await prisma.course.findFirst({
    where: { type: "S" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        select: { id: true, order: true, title: true, duration: true },
      },
    },
  });

  if (!course || course.lessons.length === 0) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-page-bg"
      >
        <p className="text-gray-500">{EMPTY_TEXT}</p>
      </main>
    );
  }

  const progresses = await prisma.progress.findMany({
    where: {
      userId: session.user.id,
      lessonId: { in: course.lessons.map((l) => l.id) },
      completed: true,
    },
    select: { lessonId: true },
  });

  const completedIds = new Set(progresses.map((p) => p.lessonId));
  const completedCount = completedIds.size;
  const totalCount = course.lessons.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  type LessonStatus = "completed" | "current" | "locked";
  const statuses: LessonStatus[] = course.lessons.map((lesson, i) => {
    if (completedIds.has(lesson.id)) return "completed";
    if (i === 0) return "current";
    if (completedIds.has(course.lessons[i - 1].id)) return "current";
    return "locked";
  });

  return (
    <main className="min-h-screen bg-page-bg">
      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <span
            className="text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-accent text-primary"
          >
            {HERO_BADGE}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {PAGE_TITLE}
            </h1>
            <p
              className="text-sm font-semibold mt-0.5 text-accent"
            >
              {PAGE_SUBTITLE}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Progress bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm font-semibold text-primary"
            >
              {PROGRESS_TITLE}
            </span>
            <span
              className="text-sm font-bold text-accent"
            >
              {completedCount}/{totalCount} {PROGRESS_SUFFIX}
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full transition-all duration-500 bg-accent"
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {progressPercent}{PROGRESS_PERCENT_SUFFIX}
          </p>
        </div>

        {/* Lesson list */}
        <h2
          className="text-lg font-semibold mb-4 text-primary"
        >
          {LESSONS_TITLE}
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, i) => {
            const status = statuses[i];
            const isLocked = status === "locked";
            const isCompleted = status === "completed";
            const isCurrent = status === "current";

            const cardContent = (
              <div
                className={`bg-white rounded-xl shadow-sm py-4 px-6 flex items-center gap-4 ${
                  isCurrent ? "border-2 border-accent" : "border border-gray-100"
                } ${isLocked ? "opacity-50" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    isCompleted
                      ? "bg-success text-white"
                      : isCurrent
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-text"
                  }`}
                >
                  {isCompleted ? DONE_BADGE : isLocked ? <LockIcon /> : lesson.order}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm leading-snug ${isLocked ? "text-muted-text" : "text-primary"}`}
                  >
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-400">
                      {isCompleted
                        ? STATUS_DONE
                        : isLocked
                          ? STATUS_LOCKED
                          : STATUS_AVAILABLE}
                    </p>
                    {lesson.duration && (
                      <span className="text-xs text-gray-400">
                        · {lesson.duration} {DURATION_SUFFIX}
                      </span>
                    )}
                  </div>
                </div>

                {!isLocked && (
                  <span className="text-gray-300 text-xl shrink-0">›</span>
                )}
              </div>
            );

            return isLocked ? (
              <div key={lesson.id}>{cardContent}</div>
            ) : (
              <Link
                key={lesson.id}
                href={`/kurzy/s/lekcie/${lesson.id}`}
                className="block hover:shadow-md transition-shadow rounded-xl"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href="/kurzy/s"
            className="text-sm font-semibold hover:opacity-80 transition-opacity text-primary"
          >
            {BACK_LINK}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LekcieListPage;
