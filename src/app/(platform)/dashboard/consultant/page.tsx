import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import serverAuth from "@/libs/server-auth";
import { ConsultantServices } from "@/services/consultant.services";

export default async function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const consultants = await ConsultantServices.getAllConsultantWithAvailableScheduleCount();

  return (
    <main className="container mx-auto space-y-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
      <div>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
          {consultants.map((consultant) => (
            <Link href={`/dashboard/consultant/jadwal/${consultant.id}`} key={consultant.id}>
              <div className="flex flex-col overflow-hidden rounded-xl border">
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
                    <h5 className="text-md font-normal tracking-normal text-black sm:text-xl">{consultant.name}</h5>
                  </div>
                  <div className="mt-auto flex flex-row items-center justify-start gap-2 sm:flex-row sm:space-y-0">
                    <div className="msg msg-ns py-1.5 text-sm">{consultant._count.schedules} Jadwal</div>
                    <div className="py-1.5 text-sm font-normal tracking-normal text-gray-500">Tersedia</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
