import { redirect } from "next/navigation";
import React from "react";

import serverAuth from "@/libs/server-auth";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();

  if (auth) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
