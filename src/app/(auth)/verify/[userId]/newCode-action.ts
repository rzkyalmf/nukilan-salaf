"use server";

import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const contentSchema = z.object({
  userId: z.string().length(25, { message: "Masukan kode OTP melalui link yang kami kirimkan melalui email" }),
});

export async function newCodeAction(state: unknown, formData: FormData) {
  const userId = formData.get("id") as string;

  const userIdValidation = contentSchema.safeParse({ userId });

  if (!userIdValidation.success) {
    return {
      status: "error",
      errors: userIdValidation.error.flatten().fieldErrors,
      data: {
        userId,
      },
    };
  }

  const exitingVerify = await UserServices.verificationUser(userId);

  if (exitingVerify) {
    return {
      status: "error",
      message: "Akun anda sudah diverifikasi, Silahkan login!",
    };
  }

  try {
    const verificationCode = generateVerificationCode();
    await UserServices.updateCode(userId, verificationCode);
    await EmailServices.sendVerificationCode(userId, verificationCode);

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Terjadi kesalahan, Silahkan coba lagi melalui link yang kami kirim melalui email!",
    };
  }
}
