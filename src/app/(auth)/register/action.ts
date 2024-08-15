"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

import { generateVerificationCode } from "@/libs/generate-verification-code";
import { EmailServices } from "@/services/email.services";
import { UserServices } from "@/services/user.services";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama terlalu pendek" })
    .max(16, { message: "Nama terlalu panjang" })
    .regex(/^[a-zA-Z ]+$/),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password terlalu pendek" }).max(24, { message: "Password terlalu panjang" }),
});

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const inputValidation = registerSchema.safeParse({ name, email, password });

  if (!inputValidation.success) {
    return {
      status: "error",
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
      },
    };
  }

  const existingUser = await UserServices.findUserByEmail(email);

  if (existingUser) {
    return {
      status: "error",
      message: "Email sudah terdaftar!",
    };
  }

  // input > DB

  const hanshedPassword = await bcrypt.hash(password, 13);
  const user = await UserServices.createUser({ name, email, password: hanshedPassword });
  const verificationCode = generateVerificationCode();

  await UserServices.createVerificationCode(user.id, verificationCode);
  await EmailServices.sendVerificationCode(user.id, verificationCode);

  redirect(`/verify/${user.id}`);
}
