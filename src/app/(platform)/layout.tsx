"use client";

import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleUserRound,
  House,
  Menu as MenuIcon,
  MessagesSquare,
  SquarePen,
  UserRoundCog,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Menu } from "@/components/isomorphic/menu";
import Logo3 from "@/public/images/Logo3.png";

export default function Layout({ children }: React.PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const Sidebar = () => (
    <>
      <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={100} height={100} />
      <section>
        <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Menu Platform</h5>
        <Menu label="Dashboard" href="/dashboard/consultant" icon={<House size={18} />} />
        <Menu label="Konsultasi" href="/dashboard/consultant" icon={<MessagesSquare size={18} />} />
        <Menu label="Jadwal" href="/dashboard/jadwal" icon={<CalendarDays size={18} />} />
      </section>
      <section>
        <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Konten Medsos</h5>
        <Menu label="Konten" href="/admin/content" icon={<SquarePen size={18} />} />
      </section>
      <section>
        <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Menu Admin</h5>
        <Menu label="Edit Consultant" href="/admin/consultant/" icon={<UserRoundCog size={18} />} />
        <Menu label="Analytics" href="/admin/analytics" icon={<ChartNoAxesCombined size={18} />} />
        <Menu label="Users" href="/admin/users" icon={<CircleUserRound size={18} />} />
      </section>
    </>
  );

  return (
    <div className="relative h-screen md:flex">
      {/* Sidebar untuk layar mobile dan desktop */}
      <aside
        className={`absolute inset-y-0 left-0 z-50 w-64 transform space-y-6 bg-white p-5 text-slate-950 transition duration-200 ease-in-out md:relative md:translate-x-0 md:border-r md:border-slate-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleSidebar} className="absolute right-4 top-4 md:hidden">
          <X size={24} />
        </button>
        <Sidebar />
      </aside>

      {/* Overlay untuk menutup sidebar pada layar mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}

      {/* Konten utama */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-4">
        <button onClick={toggleSidebar} className="mb-4 md:hidden">
          <MenuIcon size={24} />
        </button>
        {children}
      </main>
    </div>
  );
}
