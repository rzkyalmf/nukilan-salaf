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

  const existingUser = await UserServices.findUser(userId);

  if (!existingUser?.id) {
    return {
      status: "error",
      message: "Masukan kode OTP melalui link yang kami kirimkan melalui email!",
      data: {
        code,
        userId,
      },
    };
  }

  const existingCode = await UserServices.findCodeUser(code);

  if (!existingCode?.code) {
    return {
      status: "error",
      message: "Kode OTP Salah!",
      data: {
        code,
        userId,
      },
    };
  }

  if (existingCode.code === code && existingCode.userId !== userId) {
    return {
      status: "error",
      message: "Kode OTP Salah!",
      data: {
        code,
        userId,
      },
    };
  }

  redirect(`/change-password/newpass/${code}`);
}
