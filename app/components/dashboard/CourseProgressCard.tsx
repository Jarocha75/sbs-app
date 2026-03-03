import Link from "next/link";
import type { Lesson } from "@/types/dashboard";

const LABEL_CONTINUE = "Pokračovať →";
const LABEL_COMPLETED = "✓ Kurz dokončený!";

interface Props {
  courseType: "S" | "P";
  courseTitle: string;
  lessons: Lesson[];
  completedLessonIds: Set<string>;
}

const CourseProgressCard = ({
  courseType,
  courseTitle,
  lessons,
  completedLessonIds,
}: Props) => {
  const total = lessons.length;
  const completed = lessons.filter((l) => completedLessonIds.has(l.id)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const courseSlug = courseType.toLowerCase();

  const nextLesson = lessons.find((l) => !completedLessonIds.has(l.id));

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4 bg-primary">
        <span className="text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-accent text-primary">
          {courseType}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-lg leading-tight truncate">
            {courseTitle}
          </h2>
          <p className="text-sm mt-0.5 text-accent">
            {completed} z {total} lekcií dokončených
          </p>
        </div>
        <span className="shrink-0 text-2xl font-black text-white">
          {percent}%
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-2 w-full bg-gray-100">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Lesson list */}
      <section className="px-6 py-5">
        <ul className="space-y-2 mb-6">
          {lessons.map((lesson) => {
            const done = completedLessonIds.has(lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  href={`/kurzy/${courseSlug}/lekcie/${lesson.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gray-50"
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${done ? "bg-success text-white" : "bg-muted text-muted-text"}`}
                  >
                    {done ? "✓" : lesson.order}
                  </span>
                  <span
                    className={`font-medium truncate ${done ? "text-success" : "text-primary"}`}
                  >
                    {lesson.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {nextLesson ? (
          <Link
            href={`/kurzy/${courseSlug}/lekcie/${nextLesson.id}`}
            className="block text-center py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity bg-primary"
          >
            {LABEL_CONTINUE} {nextLesson.title}
          </Link>
        ) : total > 0 ? (
          <div className="text-center py-3 rounded-xl font-bold text-sm bg-success-bg text-success">
            {LABEL_COMPLETED}
          </div>
        ) : null}
      </section>
    </article>
  );
};

export default CourseProgressCard;
