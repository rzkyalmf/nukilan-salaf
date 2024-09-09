import prisma from "@/utils/prisma";

import { ConsultantServices } from "./consultant.services";
import { UserServices } from "./user.services";

export const TransactionServices = {
  createTransaction: async (scheduleId: string, userId: string, consultantId: string, amount: number) => {
    const schedule = await ConsultantServices.findSchedule(scheduleId);
    const user = await UserServices.findUser(userId);
    const consultant = await ConsultantServices.findConsultant(consultantId);

    if (!schedule || !user || !consultant) {
      throw new Error("schedule not found");
    }

    // hit API dari payment Gateway.
    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        amount: Number(amount),
        description: `Pembayaran untuk konsultasi bersama ${consultant.name}, yang akan di jadwalkan pada ${new Date(schedule.dateTime).toLocaleString()}`,
        mobile: "000000000000",
      }),
    });

    // receive response
    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);

    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        scheduleId: scheduleId,
        userId: userId,
        amount,
        paymentStatus: "UNPAID",
        paymentLink: data.data.link,
        transactionId: data.data.id,
      },
    });

    return transaction;
  },

  freeTransaction: async (scheduleId: string, userId: string, amount: number) => {
    await prisma.transaction.create({
      data: {
        scheduleId: scheduleId,
        userId: userId,
        amount,
        paymentStatus: "PAID",
      },
    });
  },
};
