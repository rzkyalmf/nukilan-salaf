import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { ConsultantServices } from "@/services/consultant.services";
import prisma from "@/utils/prisma";

interface ReqBody {
  event: string;
  data: Record<string, string | number>;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ReqBody;

  if (body.event === "payment.received") {
    // update Transaction => Paid
    const updatedTransaction = await prisma.transaction.update({
      where: {
        transactionId: body.data.productId as string,
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    // update schedule
    await ConsultantServices.updateSchedule(updatedTransaction.scheduleId, updatedTransaction.userId);

    // create certificate Placeholder
    console.log("Transaction API has been hitted");
  }

  redirect("/dashboard");
}
