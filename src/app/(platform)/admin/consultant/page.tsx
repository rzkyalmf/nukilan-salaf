import { BarChart, Calendar, PlusCircle, UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/isomorphic/button";
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
      <section className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight sm:text-4xl">Edit Consultant</h1>
        <Link href="/admin/consultant/new">
          <Button className="flex w-full items-center justify-center sm:w-fit" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Consultant
          </Button>
        </Link>
      </section>

      <div>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
          {consultants.map((consultant) => (
            <div key={consultant.id} className="flex flex-col overflow-hidden rounded-xl border transition-transform hover:scale-105">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={`${process.env.R2_PUBLIC_URL}/nukilansalaf/pp-consultant/${consultant.id}/${consultant.image}`}
                  alt={consultant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>

              <div className="flex flex-grow flex-col gap-4 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-sm font-semibold tracking-normal text-gray-700 sm:text-base">{consultant.name}</h5>
                  <Link href={`/admin/consultant/edit/${consultant.id}`} className="text-gray-500 hover:text-[#C2B59B]">
                    <UserPen size={18} />
                  </Link>
                </div>

                <div className="mt-auto flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Link href="#" className="w-full sm:w-1/2">
                    <Button size="sm" variant="secondary" className="flex w-full items-center justify-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      Stats
                    </Button>
                  </Link>
                  <Link href={`/admin/consultant/jadwal/${consultant.id}`} className="w-full sm:w-1/2">
                    <Button size="sm" variant="secondary" className="flex w-full items-center justify-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Jadwal
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
