import Link from "next/link";

type Kategoria = {
  id: string;
  nazov: string;
  pocetOtazok: number;
  href: string;
};

type Props = {
  kategoria: Kategoria;
  labels: { otazok: string; spustit: string };
};

const KategoriaCard = ({ kategoria, labels }: Props) => {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="font-bold text-base mb-1 text-primary">
          {kategoria.nazov}
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          {kategoria.pocetOtazok} {labels.otazok}
        </p>
        <Link
          href={kategoria.href}
          className="block text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity bg-primary text-white"
        >
          {labels.spustit}
        </Link>
      </div>
    </article>
  );
};

export default KategoriaCard;
