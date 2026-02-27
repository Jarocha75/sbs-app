"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { COLORS } from "@/data/colors";
import { type NavItem } from "@/data/navbar";
import ChevronIcon from "@/app/components/icons/ChevronIcon";

type Props = {
  label: string;
  items: NavItem[];
};

const NavDropdown = ({ label, items }: Props) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-gray-200 hover:text-white font-medium transition-colors">
        {label}
        <ChevronIcon rotated={open} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-1.5 min-w-50 border border-gray-100">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all duration-150 border-l-2 border-transparent hover:border-l-2"
              style={{ color: COLORS.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderLeftColor = COLORS.accent;
                e.currentTarget.style.backgroundColor = COLORS.subtleBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderLeftColor = "transparent";
                e.currentTarget.style.backgroundColor = "";
              }}
              onClick={() => setOpen(false)}
            >
              {item.badge && (
                <span
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
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

export default NavDropdown;
