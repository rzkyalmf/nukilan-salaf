"use server";

import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
// import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const contentSchema = z.object({
  userId: z.string().length(25, { message: "Page Error, Masukan kode OTP melalui link yang kami kirimkan melalui email" }),
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

  try {
    const existingVerify = await UserServices.findUser(userId);

    if (existingVerify?.isVerified) {
      return {
        status: "error",
        message: "Akun anda sudah diverifikasi, Silahkan login!",
      };
    }

    const existingCode = await UserServices.findCodeUser(userId);
    const now = new Date().getTime();

    if (existingCode?.lastSentAt) {
      const lastSentAt = new Date(existingCode.lastSentAt).getTime();
      const timeSinceLastSent = now - lastSentAt;

      if (timeSinceLastSent < 60000) {
        const remainingTime = Math.max(0, Math.ceil((60000 - timeSinceLastSent) / 1000));

        return {
          status: "error",
          message: `Tunggu selama ${remainingTime.toString()} detik lagi!`,
        };
      }
    }

    const generateCode = generateVerificationCode();

    await UserServices.updateCode(userId, generateCode, now);
    // await EmailServices.sendVerificationCode(userId, verificationCode);

    return {
      status: "success",
      message: "Kode OTP baru telah dikirim ke email anda!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Terjadi kesalahan, Silahkan coba lagi melalui link yang kami kirim melalui email!",
    };
  }
}
