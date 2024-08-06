import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

interface INavLink {
  href: string;
  label: string;
  subMenu?: INavLink[];
}

const links: INavLink[] = [
  {
    href: "/#learn",
    label: "Belajar Online",
  },
  {
    href: "/#audio",
    label: "Audio Islami",
    subMenu: [
      { label: "Kategori 1", href: "/produk/kategori-1" },
      { label: "Kategori 2", href: "/produk/kategori-2" },
    ],
  },
  {
    href: "/#produk",
    label: "Produk Kami",
  },
];

export const Header = () => {
  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-10 py-4">
        <div>
          <Link href="/">
            <Image src={Logo} alt="logo" className="w-24" priority={true} width={100} height={100} />
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:justify-center md:gap-12">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="group relative flex items-center px-2 py-1">
              <span>{link.label}</span>
              <ChevronDown className="ml-1 h-4 w-4" />
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-[#C2B59B] transition-all duration-1000 ease-out group-hover:left-0 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex md:hidden">
          <button type="button" className="rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-base-content h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
