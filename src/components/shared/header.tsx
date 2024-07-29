import Image from "next/image";
import React from "react";

import Logo from "@/public/images/Logo.png";

export const Header = () => {
  return (
    <header className="bg-[#3c3c3c] text-white">
      <div className="container mx-auto flex h-32 items-center justify-between xl:max-w-[1280px]">
        <Image src={Logo} alt="Logo perusahaan" width={100} height={0} className="" />
        <nav className="flex gap-6">
          <div>Belajar Online</div>
          <div>Audio Islami</div>
          <div>Produk Kami</div>
        </nav>
      </div>
    </header>
  );
};
