"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { UserServices } from "@/services/user.services";

const resetSchema = z.object({
  code: z.string().length(6, { message: "Page Error length" }),
  password: z.string().min(6, { message: "Password terlalu pendek" }).max(24, { message: "Password terlalu panjang" }),
});

export async function resetPassAction(state: unknown, formData: FormData) {
  const code = formData.get("code") as string;
  const password = formData.get("password") as string;

  const otpValidation = resetSchema.safeParse({ code, password });

  if (!otpValidation.success) {
    return {
      status: "error",
      errors: otpValidation.error.flatten().fieldErrors,
      data: {
        code,
        password,
      },
    };
  }

  const existingCode = await UserServices.findCodeUser(code);

  if (!existingCode?.code) {
    return {
      status: "error",
      message: "Page Error!",
      data: {
        code,
      },
    };
  }

  const userId = existingCode.userId;

  // Generate code lagi supaya code yang sebelumnya tidak bisa digunakan lagi.
  const newCode = generateVerificationCode();
  await UserServices.updateCode(userId, newCode);

  const hanshedPassword = await bcrypt.hash(password, 13);
  await UserServices.updatePassword(userId, hanshedPassword);

  redirect("/login");
}
