"use server";

import { z } from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { UserServices } from "@/services/user.services";

const contentSchema = z.object({
  userId: z.string(),
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

  const verificationCode = generateVerificationCode();
  await UserServices.updateCode(userId, verificationCode);

  return;
}
