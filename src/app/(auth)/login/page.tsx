"use client";

import Link from "next/link";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";

import { SocialLoginBtn } from "../comp.social-login";

export default function Page() {
  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Login</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">Welcome Back!</p>
      </section>
      <form action="" className="space-y-2">
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button>Login</Button>
      </form>
      <SocialLoginBtn />
      <section>
        <p className="mb-6 font-light tracking-normal text-gray-500">
          Don&apos;t have an account ?{" "}
          <Link href="/register" className="font-semibold">
            Register
          </Link>
        </p>
      </section>
    </>
  );
}
