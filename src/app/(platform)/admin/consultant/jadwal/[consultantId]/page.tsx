import { AddSchedule } from "./comp.add.schedule";
import { AllSchedule } from "./comp.all.schedule";

interface Props {
  params: {
    consultantId: string;
  };
}

export default function Page({ params }: Props) {
  const { consultantId } = params;

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="mx-auto w-full max-w-7xl space-y-14">
        <section className="border-b py-12 text-center">
          <h2 className="gradient-ns font-philosopher text-5xl font-bold tracking-tight">Manajemen Jadwal Konsultan</h2>
          <p className="font-light tracking-normal text-gray-500">Kelola jadwal konsultasi Anda di sini</p>
        </section>

        <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <AddSchedule id={consultantId} />
          </div>

          <div className="overflow-x-auto md:col-span-2">
            <AllSchedule consultantId={consultantId} />
          </div>
        </div>
      </div>
    </main>
  );
}