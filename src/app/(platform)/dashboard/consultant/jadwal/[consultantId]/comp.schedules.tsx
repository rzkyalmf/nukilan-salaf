import { Schedule } from "@prisma/client";
import { Calendar } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { formatDate, formatDay, formatTime } from "@/libs/dates-format";
import { ConsultantServices } from "@/services/consultant.services";

interface Props {
  consultantId: string;
}

export const Schedules: React.FC<Props> = async ({ consultantId }) => {
  const allSchedules: Schedule[] = await ConsultantServices.getAllSchedule(consultantId);
  const sortedSchedules = allSchedules.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

  return (
    <div className="overflow-x-auto">
      <table className="my-7 w-full min-w-[640px]">
        <thead className="text-sm font-semibold tracking-normal text-gray-600 sm:text-base">
          <tr className="border-y">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Hari</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Jam</th>
            <th className="px-4 py-3">Zona Waktu</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchedules.map((schedule: Schedule, index: number) => (
            <tr key={schedule.id} className="border-b bg-white text-center font-light tracking-normal text-gray-500 hover:bg-slate-50">
              <td className="px-4 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-4 py-2">{formatDay(schedule.dateTime)}</td>
              <td className="whitespace-nowrap px-4 py-2">{formatDate(schedule.dateTime)}</td>
              <td className="whitespace-nowrap px-4 py-2">{formatTime(schedule.dateTime)}</td>
              <td className="whitespace-nowrap px-4 py-2">{schedule.timeZone}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    schedule.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {schedule.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className={`mx-auto flex items-center justify-center ${schedule.isAvailable ? "" : "cursor-not-allowed opacity-50"}`}
                  disabled={!schedule.isAvailable}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Booking
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
