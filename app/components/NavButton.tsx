export type Phase = "quiz" | "results";

type Props = {
  variant: "primary" | "outline" | "ghost";
  onClick: () => void;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[0.9375rem] font-semibold border-2 transition-all duration-150 whitespace-nowrap cursor-pointer";

const variants: Record<Props["variant"], string> = {
  primary:
    "bg-primary text-white border-transparent shadow-[0_2px_8px_rgba(30,58,95,0.25)] hover:shadow-[0_4px_14px_rgba(30,58,95,0.35)] hover:-translate-y-px",
  outline:
    "bg-white text-primary border-primary hover:bg-blue-50",
  ghost:
    "bg-transparent text-muted-text border-muted hover:bg-gray-50",
};

const NavButton = ({ variant, onClick, children }: Props) => (
  <button onClick={onClick} className={`${base} ${variants[variant]}`}>
    {children}
  </button>
);

export default NavButton;
