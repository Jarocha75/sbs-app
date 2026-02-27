import PlayIcon from "@/app/components/icons/PlayIcon";
import MarkCompleteButton from "@/app/components/MarkCompleteButton";
import { auth } from "@/auth";
import { COLORS } from "@/data/colors";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

const LessonDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/prihlasenie");

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, order: true, title: true },
          },
        },
      },
    },
  });

  if (!lesson || lesson.course.type !== "S") notFound();

  // Ochrana pred URL hackingom – ak predošlá lekcia nie je dokončená, redirect
  if (lesson.order > 1) {
    const prevLesson = lesson.course.lessons.find(
      (l) => l.order === lesson.order - 1,
    );
    if (prevLesson) {
      const prevProgress = await prisma.progress.findFirst({
        where: {
          userId: session.user.id,
          lessonId: prevLesson.id,
          completed: true,
        },
      });
      if (!prevProgress) redirect("/kurzy/s/lekcie");
    }
  }

  const progress = await prisma.progress.findFirst({
    where: { userId: session.user.id, lessonId: id },
  });
  const isCompleted = progress?.completed ?? false;

  const allLessons = lesson.course.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const outline = Array.isArray(lesson.outline)
    ? (lesson.outline as string[])
    : null;

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>
      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/kurzy/s/lekcie"
            className="inline-block text-sm mb-4 hover:opacity-80 transition-opacity"
            style={{ color: COLORS.accent }}
          >
            ← Späť na zoznam lekcií
          </Link>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span
              className="text-sm font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Lekcia {lesson.order}
            </span>
            {lesson.duration && (
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/10 text-white">
                {lesson.duration} min
              </span>
            )}
            {isCompleted && (
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-600 text-white">
                ✓ Dokončené
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white leading-snug">
            {lesson.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Video placeholder */}
        <div
          className="rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#0f172a", aspectRatio: "16 / 9" }}
        >
          <div className="flex flex-col items-center gap-3 text-center px-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(201,168,76,0.15)",
                border: `2px solid ${COLORS.accent}`,
              }}
            >
              <PlayIcon />
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: COLORS.accent }}
            >
              Video bude čoskoro dostupné
            </p>
            <p className="text-xs text-gray-500">
              Lekcia je zatiaľ dostupná len v textovej forme
            </p>
          </div>
        </div>

        {/* Osnova lekcie */}
        {outline && outline.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-6">
            <h2
              className="text-base font-semibold mb-4"
              style={{ color: COLORS.primary }}
            >
              Čo sa naučíš
            </h2>
            <ul className="space-y-2">
              {outline.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: COLORS.subtleBg,
                      color: COLORS.primary,
                    }}
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Obsah lekcie */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-8">
          <h2
            className="text-base font-semibold mb-5"
            style={{ color: COLORS.primary }}
          >
            Obsah lekcie
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {lesson.content}
          </div>
        </div>

        {/* Označiť ako hotovú */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5">
          <MarkCompleteButton
            lessonId={lesson.id}
            nextLessonId={nextLesson?.id ?? null}
            completed={isCompleted}
          />
        </div>

        {/* Prev / Next navigácia */}
        <div className="flex items-stretch gap-4">
          {prevLesson ? (
            <Link
              href={`/kurzy/s/lekcie/${prevLesson.id}`}
              className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-sm font-semibold hover:shadow-md transition-shadow"
              style={{ color: COLORS.primary }}
            >
              <span className="block text-xs text-gray-400 mb-0.5">
                Predošlá lekcia
              </span>
              ← {prevLesson.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextLesson ? (
            <Link
              href={`/kurzy/s/lekcie/${nextLesson.id}`}
              className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-sm font-semibold hover:shadow-md transition-shadow text-right"
              style={{ color: COLORS.primary }}
            >
              <span className="block text-xs text-gray-400 mb-0.5">
                Nasledujúca lekcia
              </span>
              {nextLesson.title} →
            </Link>
          ) : (
            <Link
              href="/kurzy/s/lekcie"
              className="flex-1 text-center bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-sm font-semibold hover:shadow-md transition-shadow"
              style={{ color: COLORS.primary }}
            >
              ← Späť na zoznam lekcií
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default LessonDetailPage;
