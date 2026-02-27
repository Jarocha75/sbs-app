import { COLORS } from "@/data/colors";
import { NAV } from "@/data/navbar";

const AdminBadge = () => {
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded"
      style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
    >
      {NAV.adminBadge}
    </span>
  );
};

export default AdminBadge;
