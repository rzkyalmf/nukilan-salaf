"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useActionState, useState } from "react";

import { Button } from "@/components/isomorphic/button";
import { FileInput } from "@/components/isomorphic/file-input";
import { Input } from "@/components/isomorphic/input";
import { Textarea } from "@/components/isomorphic/textarea";

import { editConsultantAction } from "./action";

interface Props {
  id: string | undefined;
  name: string | undefined;
  expertise: string | undefined;
  description: string | undefined;
  image: string | undefined;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const EditConsultant: React.FC<Props> = ({ id, name, expertise, description, image }) => {
  const [preview, setPreview] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(editConsultantAction, null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Ukuran file tidak boleh lebih dari 2MB!");
      setPreview("");
      event.target.value = ""; // Reset input file
    } else {
      setFileError(null);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <>
      <div className="w-[400px] space-y-6">
        <section className="flex items-center justify-center text-center">
          <div>
            <h2 className="gradient-ns font-philosopher text-4xl font-bold tracking-tight">Edit Consultant</h2>
            <p className="font-light tracking-normal text-gray-500">Lengkapi form dibawah ini!</p>
          </div>
        </section>
        <form action={formAction} className="space-y-4">
          <input name="id" value={id} hidden />
          <div>
            <label className="font-normal text-gray-400">Nama :</label>
            <Input name="name" defaultValue={name} />
          </div>
          <div>
            <label className="font-normal text-gray-400">Keahlian :</label>
            <Input name="expertise" defaultValue={expertise} />
          </div>
          <div>
            <label className="font-normal text-gray-400">Deskripsi :</label>
            <Textarea name="description" defaultValue={description} className="h-32" />
          </div>
          <div>
            <label className="font-normal text-gray-400">Foto Profil :</label>
            <FileInput name="image" onChange={handleCreatePreview} />
            {preview ? (
              <Image src={preview} alt="preview" width={150} height={150} className="pt-3" />
            ) : image && id ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/nukilansalaf/pp-consultant/${id}/${image}`}
                alt="preview"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            ) : null}
          </div>
          <Button disabled={pending}>Submit</Button>

          {state?.status === "error" && state.message && <p className="text-red-500">{state.message}</p>}
          {fileError && <p className="text-red-500">{fileError}</p>}
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
      </div>
    </>
  );
};
