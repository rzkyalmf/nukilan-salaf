import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/isomorphic/button";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import Logo3 from "@/public/images/Logo3.png";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div>
        <div className="mx-auto my-72 flex flex-col items-center justify-center">
          <Image
            src={Logo3}
            alt="logo"
            className="w-36 transition-all duration-1000 ease-in-out hover:-translate-y-2 hover:scale-110"
            width={1000}
            height={1000}
          />
          <h1 className="font-philosopher gradient-ns mb-3 p-3 text-center">
            Konsultasi dengan <br /> Ahli Ilmu Terpercaya
          </h1>
          <h4 className="text-center font-light tracking-normal text-gray-500">
            &ldquo;Konsultasikan persoalan dunia & akhirat Anda dengan Orang tepercaya&ldquo;
          </h4>
          <Link href={"/login"}>
            <Button size="lg" variant="primary" className="my-5 w-[160px] px-4 py-4">
              Jadwalkan Segera
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
