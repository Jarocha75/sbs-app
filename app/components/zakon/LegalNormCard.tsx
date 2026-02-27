import { COLORS } from "@/data/colors";
import { LegalNorm, zakonContent } from "@/data/zakon";
import PdfIcon from "../icons/PdfIcon";

interface Props {
  norm: LegalNorm;
}

const LegalNormCard = ({ norm }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Rok badge */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-center leading-tight"
          style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}
        >
          {norm.year}
        </div>

        {/* Obsah */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className="font-bold text-base"
              style={{ color: COLORS.primary }}
            >
              {norm.title}
            </h3>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: COLORS.subtleBg,
                color: COLORS.primary,
              }}
            >
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
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
    </div>
  );
};

export default LegalNormCard;
