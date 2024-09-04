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

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function Page() {
  const [preview, setPreview] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(addConsultantAction, null);

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

  const getErrorMessage = () => {
    if (state?.status === "error") {
      if (state.message) return state.message;
      if (state.errors?.name) return state.errors.name;
      if (state.errors?.expertise) return state.errors.expertise;
      if (state.errors?.description) return state.errors.description;
    }
    return null;
  };

  const errorMessage = getErrorMessage();

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
              <Input defaultValue={state?.data?.name} name="name" />
            </div>

            <div>
              <label className="font-normal text-gray-400">Keahlian :</label>
              <Input name="expertise" defaultValue={state?.data?.expertise} />
            </div>

            <div>
              <label className="font-normal text-gray-400">Latar belakang :</label>
              <Textarea name="description" className="h-32" defaultValue={state?.data?.description} />
            </div>

            <div>
              <label className="font-normal text-gray-400">Foto Profil :</label>
              <FileInput name="image" onChange={handleCreatePreview} defaultValue="" />
              {preview ? <Image src={preview} alt="preview" width={150} height={150} className="pt-3" /> : null}
            </div>

            <Button disabled={pending}>Submit</Button>

            {fileError && <p className="text-red-500">{fileError}</p>}

            {errorMessage && (
              <div className="mt-4 text-red-600" role="alert">
                <p>{errorMessage}</p>
              </div>
            )}
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
