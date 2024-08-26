import { CalendarDays, ChartNoAxesCombined, CircleUserRound, House, MessagesSquare, SquarePen, UserRoundCog } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/isomorphic/button";
import { Menu } from "@/components/isomorphic/menu";
import serverAuth from "@/libs/server-auth";
import Logo3 from "@/public/images/Logo3.png";

export default function Layout({ children }: React.PropsWithChildren) {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <aside className="flex w-[260px] flex-col justify-between border-r border-slate-200 bg-white p-4 text-slate-950">
        <div className="flex flex-col gap-6">
          <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={150} height={150} />
          <section>
            <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Platform Menu</h5>
            <Menu label="Dashboard" href="/dashboard/" icon={<House size={18} />} />
            <Menu label="Konsultasi" href="/dashboard/consultant" icon={<MessagesSquare size={18} />} />
            <Menu label="Jadwal" href="/dashboard/jadwal" icon={<CalendarDays size={18} />} />
          </section>
          <section>
            <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Admin Menu</h5>
            <Menu label="Edit Consultant" href="/admin/consultant/" icon={<UserRoundCog size={18} />} />
            <Menu label="Users" href="/admin/users" icon={<CircleUserRound size={18} />} />
            <Menu label="Analytics" href="/admin/analytics" icon={<ChartNoAxesCombined size={18} />} />
            <Menu label="Konten" href="/admin/content" icon={<SquarePen size={18} />} />
          </section>
        </div>
        <section className="mb-12 mt-auto">
          <Button className="w-full">Keluar</Button>
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
