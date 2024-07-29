import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

import Logo from "@/public/images/Logo.png";

export const Header = () => {
  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="container mx-auto flex h-32 items-center justify-between xl:max-w-[1280px]">
        <Image src={Logo} alt="Logo perusahaan" width={100} height={0} className="" />
        <nav className="flex gap-6">
          <div className="flex cursor-pointer items-center">
            Belajar Online
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
          <div className="flex cursor-pointer items-center">
            Audio Islami <ChevronDown className="ml-1 h-4 w-4" />
          </div>
          <div className="flex cursor-pointer items-center">
            Produk Kami <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </nav>
      </div>
    </header>
  );
};
