"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { UserServices } from "@/services/user.services";

const contentSchema = z.object({
  code: z.string().length(6, { message: "Kode OTP harus 6 digit" }),
  userId: z.string().length(25, { message: "Masukan kode OTP melalui link yang kami kirimkan melalui email" }),
});

export async function otpAction(state: unknown, formData: FormData) {
  const userId = formData.get("id") as string;
  const code = formData.get("code") as string;

  const otpValidation = contentSchema.safeParse({ code, userId });

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

  const exitingVerify = await UserServices.findUser(userId);

  if (exitingVerify?.isVerified) {
    return {
      status: "error",
      message: "Akun anda sudah diverifikasi, Silahkan login!",
    };
  }

  await UserServices.updateVerificationUser(userId);

  redirect("/login");
}
