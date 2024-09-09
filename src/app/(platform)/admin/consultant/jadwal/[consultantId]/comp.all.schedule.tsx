import { Schedule } from "@prisma/client";
import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

import { currencyFormat } from "@/libs/currency-format";
import { formatDate, formatDay, formatTime } from "@/libs/dates-format";
import { ConsultantServices } from "@/services/consultant.services";

interface Props {
  consultantId: string;
}
export const AllSchedule: React.FC<Props> = async ({ consultantId }) => {
  const allSchedules: Schedule[] = await ConsultantServices.getAllSchedule(consultantId);
  const consultant = await ConsultantServices.findConsultant(consultantId);

  // Sort the schedules by date
  const sortedSchedules = allSchedules.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

  return (
    <>
      <section className="pb-8 text-center">
        <h2 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight">Daftar Jadwal Konsultan</h2>
        <p className="font-light tracking-normal text-gray-500">{consultant?.name}</p>
      </section>
      <table className="min-w-full bg-white">
        <thead className="border-y border-slate-200 bg-white text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
          <tr>
            <th className="px-3 py-3">No</th>
            <th className="px-4 py-3">Hari</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Jam</th>
            <th className="px-2 py-3">Zona Waktu</th>
            <th className="px-6 py-3">Biaya</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchedules.map((schedule: Schedule, index: number) => {
            const isExpired = dayjs().isAfter(dayjs(schedule.expiryDateTime));
            return (
              <tr
                key={schedule.id}
                className="border-b border-slate-200 bg-white text-center font-light tracking-normal text-gray-500"
              >
                <td>{index + 1}</td>
                <td>{formatDay(schedule.dateTime)}</td>
                <td>{formatDate(schedule.dateTime)}</td>
                <td>{formatTime(schedule.dateTime)}</td>
                <td>{schedule.timeZone}</td>
                <td>{currencyFormat(schedule.price >= 500 ? schedule.price : 0)}</td>
                <td>
                  <span className={isExpired ? "text-yellow-600" : schedule.userId === null ? "text-green-600" : "text-red-600"}>
                    {isExpired ? "Kadaluarsa" : schedule.userId === null ? "Tersedia" : "Terjadwalkan"}
                  </span>
                </td>
                <td className="border-b px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
