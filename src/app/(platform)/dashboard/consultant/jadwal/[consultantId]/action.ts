"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";

const bookingSchema = z.object({
  scheduleId: z.string(),
  userId: z.string(),
  consultantId: z.string(),
});

export async function bookingAction(_state: unknown, formData: FormData) {
  const scheduleId = formData.get("scheduleId") as string;
  const userId = formData.get("userId") as string;
  const consultantId = formData.get("consultantId") as string;

  console.log({ scheduleId, userId, consultantId });

  const validation = bookingSchema.safeParse({
    scheduleId,
    userId,
    consultantId,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        scheduleId,
        userId,
        consultantId,
      },
    };
  }

  const Schedule = await ConsultantServices.findSchedule(scheduleId);

  if (!Schedule || Schedule.userId === userId || Schedule.expiryDateTime < new Date()) {
    console.log("schedule not found or already expired");
    redirect("/dashboard/consultant/");
  }

  await ConsultantServices.updateSchedule(scheduleId, userId);

  revalidatePath(`/dashboard/consultant/jadwal/${consultantId}`, "page");
}
