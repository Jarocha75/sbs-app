import type { Lesson } from "@/types/dashboard";

const LABEL_VIDEO_PLACEHOLDER = "Video bude dostupné čoskoro";
const LABEL_MINUTES = "min";

interface Props {
  lessons: Lesson[];
  completedIds: string[];
}

const LastLessonCard = ({ lessons, completedIds }: Props) => {

  const firstUncompletedIndex = lessons.findIndex(
    (l) => !completedIds.includes(l.id),
  );
  const lesson = lessons[firstUncompletedIndex >= 0 ? firstUncompletedIndex : 0];

  if (!lesson) return null;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <header className="px-6 py-3 border-b border-gray-100 bg-card-header-bg flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-bold text-primary truncate">{lesson.title}</h2>
          {lesson.duration && (
            <p className="text-xs text-gray-400 mt-0.5">
              {lesson.duration} {LABEL_MINUTES}
            </p>
          )}
        </div>
      </header>

      <div className="w-full aspect-video bg-[#0f172a] flex items-center justify-center">
        {lesson.videoUrl ? (
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <p className="text-sm text-gray-400">{LABEL_VIDEO_PLACEHOLDER}</p>
        )}
      </div>
    </article>
  );
};

export default LastLessonCard;
