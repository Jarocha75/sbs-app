import type { SluzbaData } from "@/data/sluzby";
import InfoIcon from "@/app/components/icons/InfoIcon";

const BADGE_TEXT = "Zákon č. 473/2005 Z.z.";
const CARD_HEADING = "Predmety činnosti";
const SOURCE_TEXT =
  "Zdroj: Zákon č. 473/2005 Z.z. o poskytovaní služieb v oblasti súkromnej bezpečnosti";

type Props = {
  data: SluzbaData;
  icon: React.ReactNode;
};

const SluzbaPage = ({ data, icon }: Props) => {
  return (
    <main className="min-h-screen bg-page-bg">
      {/* Hero */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-primary">
              {BADGE_TEXT}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">{data.title}</h1>
          <p className="mt-2 text-gray-300 max-w-xl">{data.description}</p>
        </div>
      </div>

      {/* Obsah */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Karta — predmety činnosti */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hlavička karty */}
          <header className="px-6 py-4 flex items-center gap-3 border-b border-gray-100 bg-card-header-bg">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary">
              {icon}
            </div>
            <div>
              <h2 className="font-bold text-base text-primary">
                {CARD_HEADING}
              </h2>
              <p className="text-xs text-gray-400">{data.cardSubtitle}</p>
            </div>
          </header>

          {/* Zoznam činností */}
          <ul className="divide-y divide-gray-50">
            {data.cinnosti.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-row-hover-bg"
              >
                <span className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 bg-primary text-accent">
                  {item.id}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Päta karty */}
          <footer className="px-6 py-3 flex items-center gap-2 border-t border-gray-100 bg-card-header-bg">
            <InfoIcon />
            <p className="text-xs text-gray-400">{SOURCE_TEXT}</p>
          </footer>
        </article>
      </div>
    </main>
  );
};

export default SluzbaPage;
