"use client";

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
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Login</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">Welcome Back!</p>
      </section>

      <form action={formAction} className="space-y-2">
        <Input name="email" placeholder="Email" defaultValue={state?.data.email} />
        <Input name="password" placeholder="Password" type="password" defaultValue={state?.data.password} />
        <Button disabled={pending}>Login</Button>

        {errorMessage && (
          <div className="mt-4 text-red-600" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>

      <SocialLoginBtn />
      <section>
        <p className="mb-6 font-light tracking-normal text-gray-500">
          Don&apos;t have an account ?{" "}
          <Link href="/register" className="font-medium">
            Register
          </Link>
        </p>
      </section>
    </>
  );
}
