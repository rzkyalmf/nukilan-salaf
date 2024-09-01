import { Menu as MenuIcon, Search } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { Input } from "@/components/isomorphic/input";
import { LogoutButton } from "@/components/LogoutButton";
import { SideMenu } from "@/components/SideMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  const SidebarContent = () => (
    <>
      <div className="flex flex-col gap-6">
        <SideMenu items={platformMenuItems} title="Platform Menu" />
        {auth.role === "ADMIN" && <SideMenu items={adminMenuItems} title="Admin Menu" />}
      </div>
      <section className="mb-12 mt-4 md:mt-auto">
        <LogoutButton />
      </section>
    </>
  );

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4 sm:p-6">
        <div className="mx-8 flex items-center space-x-2">
          <Image src={Logo3} alt="logo" className="w-10 sm:w-12" priority width={150} height={150} />
        </div>
        <div className="hidden flex-grow justify-center sm:flex">
          <div className="relative w-64 md:w-80 lg:w-96">
            <Input type="text" placeholder="Cari di sini" className="w-full py-2 pl-10 pr-4" />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400" size={20} />
          </div>
        </div>
        <div className="mx-8 flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] sm:w-[385px]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[260px] flex-col justify-between border-r border-slate-200 bg-white p-4 text-slate-950 md:flex">
          <SidebarContent />
        </aside>
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
