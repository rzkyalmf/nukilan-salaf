import Image from "next/image";

import { Button } from "@/components/isomorphic/button";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import Logo3 from "@/public/images/Logo3.png";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div>
        <div className="mx-auto my-72 flex flex-col items-center justify-center gap-5">
          <Image
            src={Logo3}
            alt="logo"
            className="w-36 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-110"
            width={2000}
            height={2000}
          />
          <h1 className="font-philosopher gradient-ns w-[800px] p-3 text-center">Ciptakan Konten Islami dengan Mudah</h1>
          <h4 className="font-normal tracking-normal text-gray-500">Desain otomatis untuk konten Islami Anda</h4>
          <Button size="lg" variant="primary" className="w-[140px] px-4 py-4">
            Buat Konten
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
