import { Search } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { LogoutButton } from "@/components/LogoutButton";
import { SideMenu } from "@/components/SideMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import serverAuth from "@/libs/server-auth";
import Logo3 from "@/public/images/Logo3.png";
import { Input } from "@/components/isomorphic/input";

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
    <div className="flex h-screen flex-col">
      <header className="flex h-28 w-full items-center justify-between border-b border-slate-200 bg-white px-11 py-4">
        <div className="flex items-center space-x-2">
          <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={150} height={150} />
        </div>
        <div className="flex flex-grow justify-center">
          <div className="relative w-1/2 max-w-md">
            <Input type="text" placeholder="Cari di sini" className="py-2.5 pl-10 pr-4" />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400" size={20} />
          </div>
        </div>
        <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-[260px] flex-col justify-between border-r border-slate-200 bg-white p-4 text-slate-950">
          <div className="flex flex-col gap-6">
            <SideMenu items={platformMenuItems} title="Platform Menu" />
            {auth.role === "ADMIN" && <SideMenu items={adminMenuItems} title="Admin Menu" />}
          </div>
          <section className="mb-12 mt-auto">
            <LogoutButton />
          </section>
        </aside>
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">{children}</main>
      </div>
    </div>
  );
}
