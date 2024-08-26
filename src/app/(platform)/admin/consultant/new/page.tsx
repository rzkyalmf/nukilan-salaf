"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useActionState, useState } from "react";

import { Button } from "@/components/isomorphic/button";
import { FileInput } from "@/components/isomorphic/file-input";
import { Input } from "@/components/isomorphic/input";
import { Textarea } from "@/components/isomorphic/textarea";

import { addConsultantAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [_state, formAction, pending] = useActionState(addConsultantAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[400px] space-y-6">
        <>
          <section className="flex items-center justify-center text-center">
            <div>
              <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Add Consultant</h2>
              <p className="font-light tracking-normal text-gray-500">Lengkapi form dibawah ini!</p>
            </div>
          </section>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="font-normal text-gray-400">Nama :</label>
              <Input name="name" />
            </div>

            <div>
              <label className="font-normal text-gray-400">Keahlian :</label>
              <Input name="expertise" />
            </div>

            <div>
              <label className="font-normal text-gray-400">Latar belakang :</label>
              <Textarea name="description" className="h-32" />
            </div>

            <div>
              <label className="font-normal text-gray-400">Biaya :</label>
              <Input name="price" />
            </div>

            <div>
              <label className="font-normal text-gray-400">Foto Profil :</label>
              <FileInput name="image" onChange={handleCreatePreview} />
              {preview ? <Image src={preview} alt="preview" width={150} height={150} className="pt-3" /> : null}
            </div>

            <Button disabled={pending}>Submit</Button>
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
      </div>
    </main>
  );
}
