import { redirect } from "next/navigation";
import React from "react";

import serverAuth from "@/libs/server-auth";

export default function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-start justify-between">
      <div className="mx-auto my-72 flex flex-col items-center justify-center">
        <h1 className="font-philosopher gradient-ns mb-3 p-3 text-center">Selamat Datang &quot;{auth.name}&quot;</h1>
        <h4 className="text-center font-light tracking-normal text-gray-500">
          &ldquo;Tanyakan persoalan dunia & akhirat Anda dengan Orang tepercaya&ldquo;
        </h4>
      </div>
    </div>
  );
}
