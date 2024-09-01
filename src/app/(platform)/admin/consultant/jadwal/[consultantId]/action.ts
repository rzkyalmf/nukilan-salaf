"use server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";

dayjs.extend(utc);
dayjs.extend(timezone);

const addScheduleSchema = z.object({
  consultantId: z.string(),
  date: z.string().min(1),
  time: z.string().min(1),
  timeZone: z.enum(["WIB", "WITA", "WIT"]),
});

const timeZoneMap = {
  WIB: "Asia/Jakarta",
  WITA: "Asia/Makassar",
  WIT: "Asia/Jayapura",
};

export async function addScheduleAction(_state: unknown, formData: FormData) {
  const consultantId = formData.get("id") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const timeZone = formData.get("timeZone") as "WIB" | "WITA" | "WIT";

  const validation = addScheduleSchema.safeParse({
    consultantId,
    date,
    time,
    timeZone,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      message: "Lengkapi data terlebih dahulu!",
      data: {
        consultantId,
        date,
        time,
        timeZone,
      },
    };
  }

  const tzString = timeZoneMap[timeZone];
  const localDateTime = dayjs.tz(`${date} ${time}`, tzString);
  const now = dayjs();

  // Cek apakah waktu yang diinputkan sudah berlalu
  if (localDateTime.isBefore(now)) {
    return {
      status: "error",
      message: "Tidak dapat membuat jadwal untuk waktu yang telah berlalu.",
      data: {
        consultantId,
        date,
        time,
        timeZone,
      },
    };
  }

  // // Cek apakah waktu yang diinputkan kurang dari 2 hari dari sekarang
  if (localDateTime.diff(now, "day") < 2) {
    return {
      status: "error",
      message: "Tidak dapat membuat jadwal kurang dari 2 hari dari sekarang.",
      data: {
        consultantId,
        date,
        time,
        timeZone,
      },
    };
  }

  // Hitung waktu kadaluarsa (1 hari sebelum jadwal)
  const expiryDateTime = localDateTime.subtract(1, "day");

  // Format untuk disimpan di database (dalam zona waktu lokal yang dipilih)
  const dateTimeString = localDateTime.format("YYYY-MM-DDTHH:mm:ssZ");
  const expiryDateTimeString = expiryDateTime.format("YYYY-MM-DDTHH:mm:ssZ");

  // Simpan ke database dengan waktu lokal, informasi zona waktu, dan waktu kadaluarsa
  const result = await ConsultantServices.createSchedule(consultantId, dateTimeString, expiryDateTimeString, timeZone);
  console.log("Database result:", result);

  revalidatePath("/admin/consultant/jadwal/[consultantId]", "page");

  return {
    status: "success",
    message: "Jadwal berhasil ditambahkan",
  };
}
