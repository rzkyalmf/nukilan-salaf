import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  label: string;
  href: string;
  icon: ReactNode;
}

export const Menu = ({ label, href, icon }: Props) => {
  return (
    <Link href={href}>
      <div className="flex cursor-pointer items-center rounded-md bg-gradient-to-br px-3 py-2 text-base font-normal tracking-normal text-gray-500 hover:from-[#b3a78e] hover:to-[#665f50] hover:text-white active:from-[#a49981] active:to-[#585245]">
        <span className="mr-3">{icon}</span>
        {label}
      </div>
    </Link>
  );
};
