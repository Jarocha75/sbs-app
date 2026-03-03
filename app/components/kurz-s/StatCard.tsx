type Props = {
  value: number;
  label: string;
};

const StatCard = ({ value, label }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
    </div>
  );
};

export default StatCard;
