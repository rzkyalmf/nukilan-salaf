"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";
import { TransactionServices } from "@/services/transaction.services";

const bookingSchema = z.object({
  scheduleId: z.string(),
  userId: z.string(),
  consultantId: z.string(),
  amount: z.string(),
});

export async function bookingAction(_state: unknown, formData: FormData) {
  const scheduleId = formData.get("scheduleId") as string;
  const userId = formData.get("userId") as string;
  const consultantId = formData.get("consultantId") as string;
  const amount = formData.get("amount") as string;

  console.log({ scheduleId, userId, consultantId, amount });

  const validation = bookingSchema.safeParse({
    scheduleId,
    userId,
    consultantId,
    amount,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        scheduleId,
        userId,
        consultantId,
        amount,
      },
    };
  }

  const Schedule = await ConsultantServices.findSchedule(scheduleId);

  if (!Schedule || Schedule.userId === userId || Schedule.expiryDateTime < new Date() || Number(amount) !== Schedule.price) {
    console.log("schedule not found or already expired");
    redirect("/dashboard/consultant/");
  }

  if (Schedule.price <= 499) {
    await TransactionServices.freeTransaction(scheduleId, userId, Number(amount));

    // update schedule
    await ConsultantServices.updateSchedule(scheduleId, userId);
    revalidatePath(`/dashboard/consultant/jadwal/${consultantId}`, "page");
    return;
  }

  const data = await TransactionServices.createTransaction(scheduleId, userId, consultantId, Number(amount));

  if (!data.paymentLink) {
    throw new Error("Payment Gateway not found");
  }

  redirect(data.paymentLink);
}
