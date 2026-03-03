import { LegalNorm, zakonContent } from "@/data/zakon";
import PdfIcon from "../icons/PdfIcon";

interface Props {
  norm: LegalNorm;
}

const LegalNormCard = ({ norm }: Props) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Rok badge */}
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-center leading-tight bg-primary text-accent">
          {norm.year}
        </div>

        {/* Obsah */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-base text-primary">{norm.title}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-subtle-bg text-primary">
              {norm.subtitle}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {norm.description}
          </p>
        </div>

        {/* PDF tlačidlo */}
        <div className="shrink-0">
          {norm.pdf ? (
            <a
              href={norm.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity bg-accent text-primary"
            >
              <PdfIcon />
              {zakonContent.pdf.download}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed">
              <PdfIcon muted />
              {zakonContent.pdf.soon}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default LegalNormCard;
