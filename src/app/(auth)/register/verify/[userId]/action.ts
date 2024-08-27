"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
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

  const existingVerify = await UserServices.findUser(userId);

  if (existingVerify?.isVerified) {
    return {
      status: "error",
      message: "Akun anda sudah diverifikasi, Silahkan login!",
    };
  }

  if (!existingVerify?.id) {
    return {
      status: "error",
      message: "Page Error, Masukan kode OTP melalui link yang kami kirimkan melalui email",
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

  await UserServices.updateVerificationUser(userId);

  // Generate code lagi supaya code yang sebelumnya tidak bisa digunakan lagi.
  const now = new Date().getTime();
  const newCode = generateVerificationCode();
  await UserServices.updateCode(userId, newCode, now);

  // JWT Token
  const payload = {
    id: existingVerify.id,
    name: existingVerify.name,
    email: existingVerify.email,
    role: existingVerify.role,
    avatarUrl: existingVerify.avatarUrl,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  console.log({ jwtToken });

  cookies().set("token", jwtToken, {
    httpOnly: true,
    path: "/",
  });

  redirect("/dashboard/");
}
