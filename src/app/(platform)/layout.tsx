import { Award, BookOpen, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Menu } from "@/components/isomorphic/menu";
import Logo3 from "@/public/images/Logo3.png";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <aside className="flex w-[260px] flex-col border-r border-slate-200 bg-white p-5 text-slate-950">
        <Image src={Logo3} alt="logo" className="my-5 ml-3 w-12" priority width={100} height={100} />
        <section className="">
          <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">Platform Menu</h5>
          <Menu label="My Courses" href="/dashboard/my-courses" icon={<BookOpen size={18} />} />
          <Menu label="Buat Konten" href="/dashboard/certificates" icon={<Award size={18} />} />
          <Menu label="Orders" href="/dashboard/orders" icon={<ShoppingCart size={18} />} />
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
