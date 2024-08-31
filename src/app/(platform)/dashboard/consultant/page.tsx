import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import serverAuth from "@/libs/server-auth";
import { ConsultantServices } from "@/services/consultant.services";

export default async function Page() {
  const consultants = await ConsultantServices.getAllConsultant();
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto space-y-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
      {/* Header */}
      {/* <section className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight sm:text-4xl">Konsultasi</h1>
      </section> */}

      <div>
        <Link href="#" className="w-full">
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
            {consultants.map((consultant) => (
              <div key={consultant.id} className="flex flex-col overflow-hidden rounded-xl border">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/nukilansalaf/pp-consultant/${consultant.id}/${consultant.image}`}
                    alt={consultant.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </AspectRatio>

                <div className="flex flex-grow flex-col gap-2 bg-white p-5 py-4">
                  <div className="flex items-center justify-start gap-2">
                    <h5 className="text-sm font-normal tracking-normal text-black sm:text-xl">{consultant.name}</h5>
                  </div>

                  <div className="mt-auto flex flex-col items-center justify-start space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <div className="msg msg-ns py-1.5 text-sm">10 Jadwal</div>
                    <div className="py-1.5 text-sm font-normal tracking-normal text-gray-500">Tersedia</div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </Link>
      </div>
    </main>
  );
}
