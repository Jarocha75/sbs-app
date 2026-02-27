import { COLORS } from "@/data/colors";

const PlayIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7L8 5z" fill={COLORS.accent} />
    </svg>
  );
};

export default PlayIcon;
