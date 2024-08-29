import { User } from "@prisma/client";
import React from "react";

import { UserServices } from "@/services/user.services";

import { BanUser } from "./comp.ban-user";
import { UnbanUser } from "./comp.unban-user";

const TableHeader: React.FC = () => (
  <thead className="rounded-xl border-y border-slate-200 bg-white text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
    <tr className="text-left">
      <th className="py-5 pl-4 sm:pl-12">No</th>
      <th>Nama</th>
      <th className="hidden sm:table-cell">Email</th>
      <th className="hidden md:table-cell">Terverifikasi</th>
      <th className="hidden lg:table-cell">Total Konsul</th>
      <th className="hidden xl:table-cell">Peran</th>
      <th>Aksi</th>
    </tr>
  </thead>
);

interface TableRowProps {
  user: User;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({ user, index }) => (
  <tr className="border-b border-slate-200 bg-white font-light tracking-normal text-gray-500">
    <td className="py-5 pl-4 sm:pl-12">{index + 1}</td>
    <td>{user.name}</td>
    <td className="hidden sm:table-cell">{user.email}</td>
    <td className="hidden md:table-cell">{user.isVerified ? "TERVERIFIKASI" : "BELUM TERVERIFIKASI"}</td>
    <td className="hidden lg:table-cell">0</td>
    <td className="hidden xl:table-cell">{user.role}</td>
    <td>{user.onBanned ? <UnbanUser userId={user.id} /> : <BanUser userId={user.id} />}</td>
  </tr>
);

export default async function Page() {
  const users: User[] = await UserServices.getAllUsers();

  return (
    <main className="space-y-6 py-12">
      <section className="space-y-1 px-4 sm:px-12">
        <h1 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight sm:text-4xl">Pengguna</h1>
        <h4 className="font-light tracking-normal text-gray-500">Semua pengguna dalam platform</h4>
      </section>
      <section className="overflow-x-auto">
        <table className="w-full table-auto">
          <TableHeader />
          <tbody>
            {users.map((user, index) => (
              <TableRow key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
