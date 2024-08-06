import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

import { INavItemWithChildren, NavItemWithDropdown } from "./NavItemWithDropDown";

interface ISimpleNavItem {
  label: string;
  href: string;
}

const SimpleNavItems: ISimpleNavItem[] = [
  {
    label: "Home",
    href: "/",
  },
];

const NavItemsWithChildren: INavItemWithChildren[] = [
  {
    label: "Belajar Online",
    children: [
      { label: "Kelas Online", href: "/#kelas-online" },
      { label: "Webinar", href: "/#webinar" },
    ],
  },
  {
    label: "Audio Islami",
    children: [
      { label: "Podcast", href: "/#podcast" },
      { label: "Ceramah", href: "/#ceramah" },
    ],
  },
  {
    label: "Produk Kami",
    children: [
      { label: "Buku", href: "/#buku" },
      { label: "Merchandise", href: "/#merchandise" },
    ],
  },
];

export const Header: React.FC = () => {
  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-10 py-4">
        <Link href="/">
          <Image src={Logo} alt="logo" className="w-24" priority width={100} height={100} />
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-center md:gap-3">
          {NavItemsWithChildren.map((item, index) => (
            <NavItemWithDropdown key={index} item={item} />
          ))}

          {SimpleNavItems.map((item, index) => (
            <Link href={item.href} key={index} className="group relative flex items-center px-2 py-1">
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-[#C2B59B] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button type="button" className="rounded-md md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};
