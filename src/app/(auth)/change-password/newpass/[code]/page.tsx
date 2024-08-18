"use client";

import { Lock } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";

import { resetPassAction } from "./action";

interface Props {
  params: {
    code: string;
  };
}

export default function Page({ params }: Props) {
  const { code } = params;
  const [state, formAction, pending] = useActionState(resetPassAction, null);

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (state.errors?.code) return state.errors.code;
      if (state.errors?.password) return state.errors.password;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Ganti Password</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">Masukan password baru anda!</p>
      </section>

      <form action={formAction} className="space-y-2">
        <input name="code" value={code} hidden />
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
          <Input className="pl-11 text-slate-600" type="password" name="password" placeholder="Password Baru" />
        </div>

        <Button disabled={pending}>{pending ? "Sedang mereset..." : "Reset Password"}</Button>

        {errorMessage && (
          <div className="mt-4 text-red-600" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </>
  );
}
