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
      data: { consultantId, date, time, timeZone },
    };
  }

  console.log (validation.success)

  const tzString = timeZoneMap[timeZone];
  const localDateTime = dayjs.tz(`${date} ${time}`, tzString);

  // Format untuk disimpan di database (dalam zona waktu lokal yang dipilih)
  const dateTimeString = localDateTime.format("YYYY-MM-DDTHH:mm:ssZ");

  // UTC time untuk perbandingan
  const utcTime = localDateTime.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");

  console.log({
    original: `${date} ${time}`,
    timeZone,
    localTime: dateTimeString,
    utcTime,
    diffFromUTC: localDateTime.utcOffset() / 60,
  });

  // Simpan ke database dengan waktu lokal dan informasi zona waktu
  const result = await ConsultantServices.createSchedule(consultantId, dateTimeString, timeZone);

  console.log("Database result:", result);

  revalidatePath("/admin/consultant/jadwal/[consultantId]", "page");
}
