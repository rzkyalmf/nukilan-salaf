import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { LogoutButton } from "@/components/LogoutButton";
import { SideMenu } from "@/components/SideMenu";
import serverAuth from "@/libs/server-auth";
import Logo3 from "@/public/images/Logo3.png";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  const platformMenuItems = [
    { label: "Dashboard", href: "/dashboard", iconName: "House" },
    { label: "Konsultasi", href: "/dashboard/consultant", iconName: "MessagesSquare" },
    { label: "Jadwal", href: "/dashboard/jadwal", iconName: "CalendarDays" },
  ];

  const adminMenuItems = [
    { label: "Edit Consultant", href: "/admin/consultant", iconName: "UserRoundCog" },
    { label: "Users", href: "/admin/users", iconName: "CircleUserRound" },
    { label: "Analytics", href: "/admin/analytics", iconName: "ChartNoAxesCombined" },
    { label: "Konten", href: "/admin/content", iconName: "SquarePen" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="flex w-[260px] flex-col justify-between border-r border-slate-200 bg-white p-4 text-slate-950">
        <div className="flex flex-col gap-6">
          <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={150} height={150} />

          <SideMenu items={platformMenuItems} title="Platform Menu" />
          {auth.role === "ADMIN" && <SideMenu items={adminMenuItems} title="Admin Menu" />}
        </div>

        <section className="mb-12 mt-auto">
          <LogoutButton />
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
