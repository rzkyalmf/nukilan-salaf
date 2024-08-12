"use client";

import Link from "next/link";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";

export default function Page() {
  return (
    <>
      <section>
        <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Register</h2>
        <p className="mb-6 font-light tracking-normal text-gray-500">Create an account to get started</p>
      </section>
      <form action="" className="space-y-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button>Register</Button>
      </form>
      <section>
        <p className="mb-6 font-light tracking-normal text-gray-500">
          Have an account ?{" "}
          <Link className="font-semibold" href="/login">
            Login
          </Link>
        </p>
      </section>
    </>
  );
}
