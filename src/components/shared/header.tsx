import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

interface INavLink {
  href: string;
  label: string;
}

const links: INavLink[] = [
  {
    href: "/#learn",
    label: "Belajar Online",
  },
  {
    href: "/#audio",
    label: "Audio Islami",
  },
  {
    href: "/#produk",
    label: "Produk Kami",
  },
];

export const Header = () => {
  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 xl:px-0">
        <div>
          <Link href="/">
            <Image src={Logo} alt="logo" className="w-24" placeholder="blur" priority={true} width={100} height={100} />
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="link link-hover flex items-center">
              {link.label} <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          ))}
        </div>

        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
            <span className="sr-only">Open main menu</span>
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
