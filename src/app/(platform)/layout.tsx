import { CalendarDays, ChartNoAxesCombined, House, MessagesSquare, SquarePen, UserRoundCog } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Menu } from "@/components/isomorphic/menu";
import Logo3 from "@/public/images/Logo3.png";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <aside className="flex w-[260px] flex-col gap-3 border-r border-slate-200 bg-white p-5 text-slate-950">
        <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={100} height={100} />
        <section>
          <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Menu Platform</h5>
          <Menu label="Dashboard" href="/dashboard/konsultasi" icon={<House size={18} />} />
          <Menu label="Konsultasi" href="/dashboard/konsultasi" icon={<MessagesSquare size={18} />} />
          <Menu label="Jadwal" href="/dashboard/jadwal" icon={<CalendarDays size={18} />} />
        </section>
        <section>
          <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Menu Admin</h5>
          <Menu label="Users" href="/admin/users" icon={<UserRoundCog size={18} />} />
          <Menu label="Analytics" href="/admin/analytics" icon={<ChartNoAxesCombined size={18} />} />
          <Menu label="Content" href="/admin/content" icon={<SquarePen size={18} />} />
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
