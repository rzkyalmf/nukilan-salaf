"use client";

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";

import { SocialLoginBtn } from "../comp.social-login";
import { loginAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (!state.data.email) return "Email tidak boleh kosong";
      if (!state.data.password) return "Password tidak boleh kosong";
      if (state.errors?.email) return state.errors.email;
      if (state.errors?.password) return state.errors.password;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Masuk</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">Selamat Datang Kembali!</p>
      </section>

      <form action={formAction} className="space-y-2">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
          <Input className="pl-11 text-slate-600" name="email" placeholder="Email" defaultValue={state?.data.email} />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
          <Input
            className="pl-11 text-slate-600"
            name="password"
            placeholder="Password"
            type="password"
            defaultValue={state?.data.password}
          />
        </div>
        <Button disabled={pending}>{pending ? "Sedang masuk..." : "Masuk"}</Button>

        {errorMessage && (
          <div className="mt-4 text-red-600" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-300">Atau</span>
        </div>
      </div>

      <SocialLoginBtn />

      <section>
        <p className="mb-6 font-light tracking-normal text-gray-500">
          Belum punya akun ?{" "}
          <Link href="/register" className="font-medium">
            Daftar
          </Link>
        </p>
      </section>
    </>
  );
}
