"use server";

import { redirect } from "next/navigation";
import z from "zod";

import { UserServices } from "@/services/user.services";

const resetSchema = z.object({
  code: z.string().length(6, { message: "Kode OTP harus 6 digit" }),
  userId: z.string().length(25, { message: "Masukan kode OTP melalui link yang kami kirimkan melalui email" }),
});

export async function verifyResetPassAction(state: unknown, formData: FormData) {
  const userId = formData.get("id") as string;
  const code = formData.get("code") as string;

  const otpValidation = resetSchema.safeParse({ code, userId });

  if (!otpValidation.success) {
    return {
      status: "error",
      errors: otpValidation.error.flatten().fieldErrors,
      data: {
        code,
        userId,
      },
    };
  }

  const existingCode = await UserServices.findCodeUser(code);

  if (!existingCode) {
    return {
      status: "error",
      message: "Kode OTP Salah!",
      data: {
        code,
        userId,
      },
    };
  }

  if (existingCode.userId !== userId) {
    return {
      status: "error",
      message: "Page Error, Masukan kode OTP melalui link yang kami kirimkan melalui email",
    };
  }

  redirect(`/change-password/newpas/${code}`);
}
