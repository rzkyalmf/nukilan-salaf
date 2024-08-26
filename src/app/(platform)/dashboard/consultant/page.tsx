import { CircleUserRound } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/isomorphic/button";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      <section className="mb-24 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight sm:text-4xl">Konsultasi</h1>
      </section>

      <div>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
          {consultants.map((consultant) => (
            <div key={consultant.id} className="flex flex-col overflow-hidden rounded-xl border transition-transform hover:scale-105">
              {/* <AspectRatio ratio={4 / 3}>
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/nukilansalaf/pp-consultant/${consultant.id}/${consultant.image}`}
                  alt={consultant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio> */}

              <div className="flex flex-grow flex-col gap-4 p-4">
                <div className="flex items-center justify-start gap-2">
                  <CircleUserRound size={18} strokeWidth={1.4} className="text-gray-600" />
                  <h5 className="text-sm font-semibold tracking-normal text-gray-700 sm:text-base">{consultant.name}</h5>
                </div>

                {/* <div className="mb-2">
                  <div className="pb-2 text-xs font-light tracking-normal text-gray-600 sm:text-sm">Kategori :</div>
                  <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {[consultant.expertise, "Ruqyah", "Totok Punggung", "Hadist", "Thibbun Nabawi"].map((category, index) => (
                      <div
                        key={index}
                        className="msg flex justify-center p-1 text-center text-xs font-light tracking-normal text-gray-600"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="mt-auto flex flex-col items-center justify-start space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Link href="#" className="w-full">
                    <Button size="sm" variant="primary" className="flex w-full items-center justify-center">
                      {/* <Calendar className="mr-2 h-4 w-4" /> */}
                      Atur Jadwal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
