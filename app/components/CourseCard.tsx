import Link from "next/link";

const LESSONS_ICON = "📚";
const DURATION_ICON = "⏱";
const BTN_START = "Začať kurz";

type CourseCardProps = {
  type: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: number;
  duration: string;
  href: string;
};

const CourseCard = ({
  type,
  title,
  subtitle,
  description,
  lessons,
  duration,
  href,
}: CourseCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4 bg-primary">
        <span className="text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-accent text-primary">
          {type}
        </span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          <p className="text-sm text-accent">{subtitle}</p>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-5">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-5 text-sm text-gray-400 mb-5">
          <span>{LESSONS_ICON} {lessons} lekcií</span>
          <span>{DURATION_ICON} {duration}</span>
        </div>
        <Link
          href={href}
          className="block text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity bg-primary text-white"
        >
          {BTN_START}
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;
