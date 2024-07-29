import { Facebook, Instagram, Phone, Send, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/images/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#3c3c3c] text-white">
      <div className="container mx-auto py-14 xl:max-w-[1280px]">
        <div className="flex justify-between">
          <div>
            <Image src={Logo} alt="Logo perusahaan" width={100} height={100} className="pb-3" />
            <p className="pb-1 tracking-normal">إنا قوم أعزنا الله بالإسلام فلن نبتغي العزة بغيره</p>
            <p className="text-sm text-gray-400">Menukil kalam ulama, quran & hadist</p>
            <div className="mt-4 flex space-x-4">
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
          <div className="">
            <p className="pb-3">Program Kami :</p>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Belajar Online</div>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Audio Islami</div>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Produk Kami</div>
          </div>
          <div>
            <p className="pb-3">Panduan & Bantuan :</p>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Syarat & Ketentuan</div>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Kebijakan Privasi</div>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Disclaimer</div>
            <div className="cursor-pointer pb-2 text-sm text-gray-400 hover:text-gray-300">Hubungi Kami</div>
          </div>
          <div>
            <div className="pb-3">Kontak Kami :</div>
            <p className="pb-2 text-sm text-gray-400">nukilansalaf@gmail.com</p>
            <p className="pb-2 text-sm text-gray-400">+62-851-7233-1302</p>
          </div>
        </div>

        <div className="mt-14 flex justify-between border-t border-white/20 pt-2">
          <p className="text-sm text-gray-400">&copy; 2022 Nukilan Salaf. All rights reserved.</p>
          <p className="flex gap-1 text-sm text-gray-400">
            Developed by <p className="text-gray-50">Rizky Alam</p>
          </p>
        </div>
      </div>
    </footer>
  );
};
