"use server";

import { redirect } from "next/navigation";
import z from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const resetSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
});

export async function resetAction(state: unknown, formData: FormData) {
  const email = formData.get("email") as string;

  const validation = resetSchema.safeParse({ email });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        email,
      },
    };
  }

  const user = await UserServices.findUser(email);

  if (!user?.email) {
    return {
      status: "error",
      message: "Akun belum terdaftar!",
      data: {
        email,
      },
    };
  }

  if (!user.isVerified) {
    return {
      status: "error",
      message: "Akun anda belum diverifikasi, Silahkan cek email anda untuk verifikasi!",
      data: {
        email,
      },
    };
  }

  if (!user.password) {
    return {
      status: "error",
      message: "Akun anda dibuat melalui google, Silakan reset melalui akun Google!",
      data: {
        email,
      },
    };
  }

  const verificationCode = generateVerificationCode();
  const now = new Date().getTime();
  await UserServices.updateCode(user.id, verificationCode, now);
  await EmailServices.sendVerificationPass(user.id, verificationCode);

  redirect(`/change-password/verify/${user.id}`);
}
