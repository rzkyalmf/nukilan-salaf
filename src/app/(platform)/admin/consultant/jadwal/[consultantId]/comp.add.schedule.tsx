"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/isomorphic/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { addScheduleAction } from "./action";

interface Props {
  id: string;
}

export const AddSchedule: React.FC<Props> = ({ id }) => {
  const [_state, formAction, pending] = useActionState(addScheduleAction, null);

  return (
    <>
      <section className="pb-1 text-center">
          <h2 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight">Tambah Jadwal Baru</h2>
          <p className="font-light tracking-normal text-gray-500">Lengkapi data di bawah ini</p>
        </section>
      <form action={formAction} className="space-y-4">
        <input name="id" value={id} type="hidden" />
        <div>
          <label className="font-normal text-gray-400">Tanggal :</label>
          <Input type="date" name="date" className="flex items-center justify-start" />
        </div>
        <div>
          <label className="font-normal text-gray-400">Jam :</label>
          <Input type="time" name="time" className="flex items-center justify-start" />
        </div>
        <div>
          <label htmlFor="timeZone" className="font-normal text-gray-400">
            Zona Waktu :
          </label>
          <Select name="timeZone" defaultValue="WIB">
            <SelectTrigger className="w-full">
              <SelectValue  placeholder="Pilih zona waktu" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="WIB" >WIB - Waktu Indonesia Barat</SelectItem>
              <SelectItem value="WITA">WITA - Waktu Indonesia Tengah</SelectItem>
              <SelectItem value="WIT">WIT - Waktu Indonesia Timur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="primary" disabled={pending}>
          Submit
        </Button>
      </form>
      <div className="flex">
        <Link
          href="/admin/consultant/"
          className="inline-flex items-center font-light tracking-normal text-gray-500 hover:text-[#C2B59B]"
        >
          <ArrowLeft size={16} className="mr-2" />
          Kembali ke Menu
        </Link>
      </div>
    </>
  );
};
