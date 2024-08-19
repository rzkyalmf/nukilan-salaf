"use client";

import { KeyRound } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";

import { otpAction } from "./action";
import { newCodeAction } from "./newCode-action";

interface Props {
  params: {
    userId: string;
  };
}

export default function Page({ params }: Props) {
  const { userId } = params;
  const [state, formAction, pending] = useActionState(otpAction, null);
  const [_stateOtp, updateFormAction, pendingOtp] = useActionState(newCodeAction, null);

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (state.errors?.code) return state.errors.code;
      if (state.errors?.userId) return state.errors.userId;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Kode OTP</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">
          <b className="font-medium underline">Cek email</b> anda untuk kode verifikasi
        </p>
      </section>

      <form action={formAction} className="space-y-2">
        <div className="relative">
          <input name="id" value={userId} hidden />
          <KeyRound className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
          <Input className="pl-11 text-slate-600" name="code" placeholder="Kode OTP" defaultValue={state?.data?.code} />
        </div>
        <Button disabled={pending}>{pending ? "Verify..." : "Verifikasi"}</Button>

        {errorMessage && (
          <div className="mt-4 text-red-600" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>

      <form action={updateFormAction}>
        <input name="id" value={userId} hidden />
        <p className="mb-6 font-light tracking-normal text-gray-500">
          Belum menerima kode ?{" "}
          <button disabled={pendingOtp} className="font-normal hover:text-[#C2B59B]">
            {pendingOtp ? "Telah terkirim..." : "Kirim Ulang"}
          </button>
        </p>
      </form>
    </>
  );
}
