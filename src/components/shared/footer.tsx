import { Facebook, Instagram, Mail, Phone, Send, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

interface INavLink {
  href: string;
  label: string;
}

const belajarOnline: INavLink[] = [
  {
    href: "/#learn",
    label: "Belajar Islam Dari Dasar",
  },
  {
    href: "/#audio",
    label: "Belajar Qur’an Dari Dasar",
  },
  {
    href: "/#produk",
    label: "Belajar Bahasa Arab Dari Dasar",
  },
  {
    href: "/#produk",
    label: "Belajar Siroh Nabawi",
  },
  {
    href: "/#produk",
    label: "Belajar Thibbun Nabawi",
  },
];

const audioIslami: INavLink[] = [
  {
    href: "/#learn",
    label: "Audio Murattal",
  },
  {
    href: "/#audio",
    label: "Audio Kajian",
  },
];

const produkKami: INavLink[] = [
  {
    href: "/#learn",
    label: "Tanya Ustadz",
  },
  {
    href: "/#audio",
    label: "Umrah & Haji",
  },
  {
    href: "/#audio",
    label: "Kredit Syariah",
  },
  {
    href: "/#audio",
    label: "Parfum Arab",
  },
];

const helpLinks: INavLink[] = [
  {
    href: "/#syarat",
    label: "Syarat & Ketentuan",
  },
  {
    href: "/#kebijakan",
    label: "Kebijakan Privasi",
  },
  {
    href: "/#disclaimer",
    label: "Disclaimer",
  },
  {
    href: "/#hubungi",
    label: "Hubungi Kami",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#3c3c3c] px-10 py-20 text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-start justify-between gap-8 md:flex md:flex-row">
        <div>
          <Image src={Logo} alt="Logo perusahaan" width={100} height={100} className="pb-3" />
          <p className="pb-1 tracking-normal">إنا قوم أعزنا الله بالإسلام فلن نبتغي العزة بغيره</p>
          <p className="text-sm text-gray-400">Menukil kalam ulama, quran & hadist</p>
          <div className="flex space-x-4 pt-2">
            <Link href="#" className="text-white hover:text-gray-300">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Send size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Phone size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        <div>
          <p className="pb-3">Belajar Online :</p>
          {belajarOnline.map((link) => (
            <Link href={link.href} key={link.href} className="flex cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="pb-3">Produk Kami :</p>
          {produkKami.map((link) => (
            <Link href={link.href} key={link.href} className="flex cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="pb-3">Audio Islami :</p>
          {audioIslami.map((link) => (
            <Link href={link.href} key={link.href} className="flex cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="pb-3">Panduan & Bantuan :</p>
          {helpLinks.map((link) => (
            <Link href={link.href} key={link.href} className="flex cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="pb-3">Kontak Kami :</div>
          <p className="flex gap-2 pb-2 text-sm text-gray-400">
            <Mail size={20} />
            nukilansalaf@gmail.com
          </p>
          <p className="flex gap-2 pb-2 text-sm text-gray-400">
            <Phone size={20} />
            +62-851-7233-1302
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1280px] items-center justify-between border-t border-white/20 pt-6">
        <p className="text-sm text-gray-400">Copyright © 2022-{new Date().getFullYear()} - All rights reserved</p>
        <p className="flex gap-1 text-sm text-gray-400">
          Developed by <p className="text-gray-50">Rizky Alam</p>
        </p>
      </div>
    </footer>
  );
};
