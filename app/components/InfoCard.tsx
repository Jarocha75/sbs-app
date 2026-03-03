import Link from "next/link";

type InfoCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

const InfoCard = ({ icon, title, description, href }: InfoCardProps) => {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start"
    >
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <h3 className="font-semibold text-primary">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-snug">{description}</p>
      </div>
    </Link>
  );
};

export default InfoCard;
