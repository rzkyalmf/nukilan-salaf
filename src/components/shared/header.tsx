"use client";

import { ChevronDown, CirclePlay, Headphones, LucideIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";

import Logo from "@/public/images/Logo.png";

import { Button } from "../isomorphic/button";

interface IHeaderItem {
  label: string;
  href?: string | undefined;
  icon?: LucideIcon;
  children?: IHeaderItem[];
}

export const headerItems: IHeaderItem[] = [
  {
    label: "Belajar Online",
    icon: CirclePlay,
    children: [
      { label: "Belajar Islam Dari Dasar", href: "/#kelas-online" },
      { label: "Belajar Qur'an Dari Dasar", href: "/#webinar" },
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
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(null);
    }, 70); // 300ms delay before closing
  }, []);

  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-10 py-4">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} alt="logo" className="w-24" priority width={100} height={100} />
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-center md:gap-9">
          {/* Menu Header */}
          {headerItems.map((item, index) => (
            <div key={index} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              <button className="group flex items-center px-2 py-1 text-white focus:outline-none">
                {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                {item.label}
                {item.children && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen === index ? "rotate-180" : ""}`} />
                )}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-lg bg-[#C2B59B] transition-all duration-300 ease-out group-hover:w-full" />
              </button>

              {/* Dropdown Menu Header */}
              {item.children && isOpen === index && (
                <div
                  className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex flex-col gap-3 py-3">
                    {item.children.map((children, index) => (
                      <Link key={index} ref={children.href} className="px-4 py-2 text-gray-700 hover:bg-gray-100" href={""}>
                        {children.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden md:flex md:gap-5">
          <Link href="/register">
            <Button variant="secondary" size="lg" className="w-15 rounded-md bg-transparent px-5 py-2 text-white active:text-white">
              Daftar
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="primary" size="lg" className="w-15 rounded-md px-5 py-2.5">
              Masuk
            </Button>
          </Link>
        </div>

        {/* Menu Mobile */}
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
