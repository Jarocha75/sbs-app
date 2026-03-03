import { type Predmet } from "@/data/kurz-p";

type Props = {
  predmet: Predmet;
  hodinaLabel: string;
};

const PredmetCard = ({ predmet, hodinaLabel }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-4 px-10 flex items-start gap-4">
      <span className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 bg-primary text-accent">
        {predmet.id}
      </span>
      <p className="flex-1 text-sm text-gray-700 leading-relaxed">
        {predmet.nazov}
      </p>
      <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap bg-subtle-bg text-primary">
        {predmet.hodiny} {hodinaLabel}
      </span>
    </div>
  );
};

export default PredmetCard;
