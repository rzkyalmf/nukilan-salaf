import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MenuProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

export const Menu = ({ label, href, icon: Icon, isActive }: MenuProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-50 ${isActive ? "bg-slate-50 text-gray-900" : "text-gray-500"}`}
    >
      <Icon size={18} />
      <span className="text-base font-normal">{label}</span>
    </Link>
  );
};
