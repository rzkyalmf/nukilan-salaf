import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ConsultantServices } from "@/services/consultant.services";

import { Schedules } from "./comp.schedules";

interface Props {
  params: {
    consultantId: string;
  };
}

export default async function Page({ params }: Props) {
  const { consultantId } = params;
  const consultant = await ConsultantServices.findConsultant(consultantId);

  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <h2 className="gradient-ns font-philosopher mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          Daftar Jadwal Konsultasi
        </h2>
        <p className="mb-6 text-center text-sm font-light tracking-normal text-gray-500 sm:text-base">Bersama : {consultant?.name}</p>
        <div className="w-full overflow-x-auto">
          <Schedules consultantId={consultantId} />
        </div>
        <div className="mt-6 flex">
          <Link
            href="/dashboard/consultant/"
            className="inline-flex items-center text-sm font-light tracking-normal text-gray-500 hover:text-[#C2B59B] sm:text-base"
          >
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
