"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { UserServices } from "@/services/user.services";

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string(),
});

export async function loginAction(state: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ email, password });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const user = await UserServices.findUser(email);

  if (!user) {
    return {
      status: "error",
      message: "Akun belum terdaftar!",
      data: {
        email,
        password,
      },
    };
  }

  if (!user.isVerified) {
    return {
      status: "error",
      message: "Akun anda belum diverifikasi, Silahkan cek email anda untuk verifikasi!",
      data: {
        email,
        password,
      },
    };
  }

  if (!user.password) {
    return {
      status: "error",
      message: "Silakan masuk dengan Google!",
      data: {
        email,
        password,
      },
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "Password salah!",
      data: {
        email,
        password,
      },
    };
  }

  // JWT Token
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  console.log({ jwtToken });

  cookies().set("token", jwtToken, {
    httpOnly: true,
    path: "/",
  });

  redirect("/dashboard/consultant");
}
