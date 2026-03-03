import Link from "next/link";
import { type NavItem } from "@/data/navbar";
import ChevronIcon from "@/app/components/icons/ChevronIcon";

type Props = {
  label: string;
  name: string;
  items: NavItem[];
  expanded: boolean;
  onToggle: (name: string) => void;
  onClose: () => void;
};

const MobileDropdown = ({
  label,
  name,
  items,
  expanded,
  onToggle,
  onClose,
}: Props) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => onToggle(name)}
        className="w-full flex items-center justify-between text-gray-200 py-2.5 font-medium"
      >
        <span>{label}</span>
        <ChevronIcon rotated={expanded} />
      </button>

      {expanded && (
        <div className="pl-4 pb-2 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 px-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-150 hover:bg-white/10 hover:text-white text-accent"
              onClick={onClose}
            >
              {item.badge && (
                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-accent text-primary">
                  {item.badge}
                </span>
              )}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
