import { Schedule } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

import { ConsultantServices } from "@/services/consultant.services";

interface Props {
  consultantId: string;
}

export const AllSchedule: React.FC<Props> = async ({ consultantId }) => {
  const allSchedules: Schedule[] = await ConsultantServices.getAllSchedule(consultantId);
  const consultant = await ConsultantServices.findConsultant(consultantId);

  // Sort the schedules by date
  const sortedSchedules = allSchedules.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

  const formatDate = (dateTimeString: Date): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateTimeString: Date): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDay = (dateTimeString: Date): string => {
    const date = new Date(dateTimeString);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    return days[date.getDay()];
  };

  return (
    <>
      <section className=" pb-8 text-center">
          <h2 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight">Daftar Jadwal Konsultan</h2>
          <p className="font-light tracking-normal text-gray-500">{consultant?.name}</p>
        </section>
      <table className="min-w-full bg-white">
        <thead className="border-y border-slate-200 bg-white text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
          <tr>
            <th className="py-3 px-4">No</th>
            <th>Hari</th>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Zona Waktu</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchedules.map((schedule: Schedule, index: number) => (
            <tr key={schedule.id} className="border-b border-slate-200 text-center bg-white font-light tracking-normal text-gray-500">
              <td>{index + 1}</td>
              <td>{formatDay(schedule.dateTime)}</td>
              <td>{formatDate(schedule.dateTime)}</td>
              <td>{formatTime(schedule.dateTime)}</td>
              <td>{schedule.timeZone ?? "Tidak ditentukan"}</td>
              <td>
                <span className={schedule.isAvailable ? "text-green-600" : "text-red-600"}>
                  {schedule.isAvailable ? "Tersedia" : "Tidak Tersedia"}
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
          ))}
        </tbody>
      </table>
    </>
  );
};