"use client";

import { CirclePlay, Headphones, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

import { INavItemWithChildren, NavItemWithDropdown } from "./NavItemWithDropDown";

// interface ISimpleNavItem {
//   label: string;
//   href: string;
//   icon?: LucideIcon;
// }

// const SimpleNavItems: ISimpleNavItem[] = [
//   {
//     label: "Home",
//     href: "/",
//     // icon: ShoppingBag,
//   },
// ];

const NavItemsWithChildren: INavItemWithChildren[] = [
  {
    label: "Belajar Online",
    icon: CirclePlay,
    children: [
      { label: "Belajar Islam Dari Dasar", href: "/#kelas-online" },
      { label: "Belajar Qur’an Dari Dasar", href: "/#webinar" },
      { label: "Belajar Bahasa Arab Dari Dasar", href: "/#webinar" },
      { label: "Belajar Siroh Nabawi", href: "/#webinar" },
      { label: "Belajar Thibbun Nabawi", href: "/#webinar" },
    ],
  },
  {
    label: "Audio Islami",
    icon: Headphones,
    children: [
      { label: "Audio Murattal", href: "/#podcast" },
      { label: "Audio Kajian", href: "/#ceramah" },
    ],
  },
  {
    label: "Produk Kami",
    icon: ShoppingCart,
    children: [
      { label: "Tanya Ustadz", href: "/#buku" },
      { label: "Umrah & Haji", href: "/#merchandise" },
      { label: "Kredit Syariah", href: "/#merchandise" },
      { label: "Parfum Arab", href: "/#merchandise" },
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

        <nav className="hidden md:flex md:items-center md:justify-center md:gap-9">
          {NavItemsWithChildren.map((item, index) => (
            <NavItemWithDropdown key={index} item={item} />
          ))}

          {/* {SimpleNavItems.map((item, index) => (
            <Link href={item.href} key={index} className="flex items-center px-4 py-1 hover:text-[#C2B59B]">
              <item.icon className="mr-2 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))} */}
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
